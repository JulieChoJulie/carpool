const { User, Ride, Post } = require('../../../models');
const { postFormat, myPostFormat } = require('../posts/helper');
const { sequelize } = require('../../../models');
const { Op, transaction } = require('sequelize');
const { serializeUser } = require('../middlewares');

const getUserRequestsFunc = async (req, res, next) => {
    try {
        if (!req.condition) {
            req.condition = null;
        }
        const ride = await Ride.findOne({ where: { id: req.params.rideId }});
        if (ride === null) {
            res.status(404).end(); // not found
            return;
        }

        const requests = await ride.getRequestUsers(req.condition);
        /* [{
        /     user,
        /     "Request": {
        /         "userId": 1,
        /         "rideId": 1,
        /         timestamps
        /     }
        / }]
        */
        return requests;
    } catch (err){
        console.log(err);
        next(err);
    }
}

const isUserRideValid = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.userId }});
        const ride = await Ride.findOne({
            where: { id: req.params.rideId }
        });
        if (ride === null || user === null) {
            res.status(404).end(); // not found
            return;
        } else {
            return {user, ride};
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/request/add */
exports.addRequest = async (req, res, next) => {
    try {
        // no user/ride => 404 error
        req.userId = req.user.id;
        const {user, ride} = await isUserRideValid(req, res, next);
        const post = await Post.findOne({ where: { id: ride.postId }});
        const driverId = post.userId;
        // the driver cannot add herself.
        if (user.id !== driverId) {
            // forbidden: no seats available
            if (ride.available === 0) {
                res.status(403).end(); //forbidden
            }
            const partner = await user.getPartnerRides({ where: { id: req.params.rideId }});
            console.log(JSON.stringify(partner))
            if (partner.length > 0) {
                res.status(400).end(); // the user already added in passenger
                return;
            }
            const request = await user.addRequestRides(ride);
            if (request === undefined) {
                res.status(409).end(); // conflict: request already exists
                next();
            }
            res.status(200).send(request);
        } else {
            res.status(400).end(); // Bad request: request by the driver
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/request/cancel */
exports.cancelRequest = async (req, res, next) => {
    try {
        // no user/ride => 404 error
        req.userId = req.user.id;
        const { user, ride } = await isUserRideValid(req, res, next);
        const request = await user.removeRequestRide(ride);
        if (request === 1) {
            res.status(200).end(); // successfully removed
        } else {
            res.status(400).end() ; // Bad Request ( no request to be removed)
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* GET /action/rides/status */
exports.getRideStatus = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        const partners = await user.getPartnerRides();
        const obj = {}; // key: ride.id, value: 1(booked), -1(request sent)
        if (partners.length !== 0 ) {
            partners.map(partner => {
                obj[partner.id]  = 1;
            })
        }
        const requests = await user.getRequestRides();
        if (requests.length !== 0) {
            requests.map(request => {
                if (obj[request.id] === undefined) {
                    obj[request.id] = -1;
                }
            })
        }

        res.status(200).send(obj);

    } catch (err) {
        console.log(err);
        next(err);
    }
}


/* POST /action/ride/:rideId/cancel */
exports.cancelRide = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // no user/ride => 404 error
        req.userId = req.user.id;
        const {user, ride} = await isUserRideValid(req, res, next);

        /* remove partner
        / partner = 0 (nothing is removed)
        / partner = 1 (one partner is removed
        */
        const partner = await user.removePartnerRide(ride,{ transaction: t });

        if (partner === 0) {
            // the user already cancelled the ride
            await t.rollback();
            res.status(400).end(); // bad request
            return;
        } else {
            // remove request
            const request = await user.removeRequestRide(ride, { transaction: t })
        }

        // update the available in the ride
        const available = ride.available + 1;

        await ride.update({ available: available }, { transaction: t } );
        await t.commit();
        res.status(200).send(ride);
    } catch (err) {
        await t.rollback();
        console.log(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/users/:userId/add */
exports.addPassenger = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // no user/ride => 404 error
        req.userId = req.params.userId;
        const {user, ride} = await isUserRideValid(req, res, next);

        req.condition = {
            where: { id: user.id },
            include: [{
                model: Ride,
                as: 'RequestRides',
                through : {
                    where: {
                        rideId: ride.id
                    }
                },
            }]
        };
        const requests = await getUserRequestsFunc(req, res, next);
        if (requests.length === 0) {
            // no requests under this ride
            res.status(403).end(); //forbidden; userId did not request
            return;
        }

        // add the passenger in the ride.
        const partner = await user.addPartnerRides(ride, { transaction: t });

        if(partner === undefined) {
            // the passenger already added;
            res.status(409).end(); // conflict
            return;
        }

        // remove the request
        const removeRequest = await user.removeRequestRide(ride, { transaction: t });

        // update available seats in the ride
        const available = ride.seats - 1;
        await ride.update({ available: available }, { transaction: t });

        await t.commit();

        const userPartner = await ride.getPartnerUsers({ where: { id: user.id }});
        console.log(JSON.stringify(userPartner));
        const serializedPartner = serializeUser(userPartner[0], 'Partner');
        console.log(JSON.stringify(serializedPartner));
        // array of obj { ...user, Parter: {userId, rideId}}
        res.status(200).send(serializedPartner);
    } catch (err) {
        await t.rollback();
        console.error(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/user/:userId/cancel */
exports.cancelPassenger = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // no user/ride => 404 error
        req.userId = req.params.userId;
        const {user, ride} = await isUserRideValid(req, res, next);
        console.log(JSON.stringify(user));
        const partner = await user.removePartnerRide(ride, { transaction: t});

        if (partner === 0) {
            await t.rollback();
            res.status(400).end(); // Bad Request
            return;
        }

        // update available seats in the ride
        const available = ride.available + 1;
        await ride.update({ available: available }, { transaction: t });
        await t.commit();

        res.status(200).send(ride);

    } catch (err) {
        await t.rollback();
        console.log(err);
        next(err);
    }
}

/* GET /api/action/ride/:rideId/passengers */
exports.getPassengers = async (req, res, next) => {
    try {
        const ride = await Ride.findOne({ where : { id : req.params.rideId }});
        if (ride === null) {
            res.status(404).end();
            return;
        }
        const partners = await ride.getPartnerUsers();
        const serializedPartners = partners.map(partner => serializeUser(partner, "Partner"));
        res.status(200).send(serializedPartners);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* GET /api/action/ride/:rideId/requests */
exports.getRequests = async (req, res, next) => {
    try {
        const requests = getUserRequestsFunc(req, res);
        const serializedRequests = requests.map(request => serializeUser(request, "Request"));
        res.status(200).send(serializedRequests);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* GET /api/action/posts/manage */
exports.getMyPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll(myPostFormat(req.user.id));
        res.send(posts);

    } catch (err) {
        console.log(err);
    }
}

/* GET /api/action/trip */
exports.getTrip = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const trips = await User.getPartnerRides({ include: [{ model: Post }, { attributes: userId }] });
        res.send(trips);
    } catch (err) {
        next(err);
    }
}

/* GET /api/action/save */
exports.getSave = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const posts = await user.getSavePosts();
        res.send(posts);
    } catch (err) {
        next(err);
    }
}

/* POST /api/action/save/post/:id */
exports.postSave = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const post = await Post.findOne({ where: { id: req.params.id } });
        await user.addSavePosts(post)
        res.send(200).end();
    } catch (err) {
        next(err);
    }
}

/* DELETE /api/action/save/post/:id */
exports.deleteSave = async (req, res, next) => {
    try{
        const post = await Post.findOne({ where: { id: req.params.id } });
        const user = await User.findOne({ where: { id: req.user.id } });
        await user.removeSavePosts(post);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
}