const { User, Ride, Post, Notification } = require('../../../models');
const { postFormat, myPostFormat } = require('../posts/helper');
const { socket } = require('../createSocket');
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
    const t = await sequelize.transaction();
    try {
        // no user/ride => 404 error
        req.userId = req.user.id;
        const {user, ride} = await isUserRideValid(req, res, next);
        const post = await Post.findOne({
            where: { id: ride.postId },
            include: [
                {
                    model: User,
                    attribute: ['username', 'id']
                }
            ]
        });
        const writer = post.user;

        // the writer cannot add herself.
        if (user.id !== writer.id) {
            // forbidden: no seats available
            if (ride.available === 0) {
                res.status(403).end(); //forbidden
            }
            const partner = await user.getPartnerRides({ where: { id: req.params.rideId }});
            if (partner.length > 0) {
                res.status(400).end(); // the user already added in passenger
                return;
            }
            const request = await user.addRequestRides(ride);
            if (request === undefined) {
                res.status(409).end(); // conflict: request already exists
                next();
            }

            req.variables = {
                send: user,
                receive: writer,
                title: 'request_add',
                from: 'requester',
                ride,
            }
            await socket(req, res, next);

            await t.commit();

            const status = await getStatus(req, next);

            res.status(200).send(status);
        } else {
            await t.rollback();
            res.status(400).end(); // Bad request: request by the driver
        }

    } catch (err) {
        await t.rollback();
        console.log(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/request/cancel */
exports.cancelRequest = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // no user/ride => 404 error
        req.userId = req.user.id;
        const { user, ride } = await isUserRideValid(req, res, next);
        const post = await Post.findOne({
            where: { id: ride.postId },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ]
        });
        const writer = post.user;

        const request = await user.removeRequestRide(ride, { transaction: t });
        if (request === 1) {
            //notification
            req.variables = {
                send: user,
                receive: writer,
                title: 'request_cancel',
                from: 'requester',
                ride,
            }
            await socket(req, res, next);

            await t.commit();

            const status = await getStatus(req, next);

            res.status(200).send(status);
        } else {
            await t.rollback();
            res.status(400).end() ; // Bad Request ( no request to be removed)
        }
    } catch (err) {
        await t.rollback();
        console.log(err);
        next(err);
    }
};

const getStatus = async (req, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        const partners = await user.getPartnerRides();
        const obj = {}; // key: ride.id, value: 1(booked), -1(request sent)
        if (partners.length !== 0) {
            partners.map(partner => {
                obj[partner.id] = 1;
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
        return obj;
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.getStatus = getStatus;
/* GET /action/rides/status */
exports.getRideStatus = async (req, res, next) => {
    try {
        const obj = await getStatus(req, next);
        res.status(200).send(obj);

    } catch (err) {
        console.log(err);
        next(err);
    }
}


/*
Cancellation from passenger end
POST /action/ride/:rideId/cancel
*/
exports.cancelRide = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // no user/ride => 404 error
        req.userId = req.user.id;
        const {user, ride} = await isUserRideValid(req, res, next);
        const post = await Post.findOne({ where: { id: ride.postId }});
        const writer = await User.find({ where: { id: post.userId }});
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

        req.variables = {
            send: user,
            receive: writer,
            title: 'passenger_cancel',
            from: 'requester',
            ride,
        }
        await socket(req, res, next);

        const status = await getStatus(req, next);

        await t.commit();
        res.status(200).send(status);
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
        const post = await Post.findOne({
            where: { id: ride.postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        const writer = post.user;

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

        //notification
        req.variables = {
            send: writer,
            receive: user,
            title: 'passenger_add',
            from: 'writer',
            ride,
        };
        await socket(req, res, next);

        const userPartner = await ride.getPartnerUsers({ where: { id: user.id }}, { transaction: t });
        const serializedPartner = serializeUser(userPartner[0], 'Partner');

        await t.commit();

        // array of obj { ...user, Parter: {userId, rideId}}
        res.status(200).send(serializedPartner);
    } catch (err) {
        await t.rollback();
        console.error(err);
        next(err);
    }
}


/* POST /action/ride/:rideId/users/:userId/cancel/request */
exports.cancelPassengerRequest = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        // no user/ride => 404 error
        req.userId = req.params.userId;
        const {user, ride} = await isUserRideValid(req, res, next);
        const post = await Post.findOne({
            where: { id: ride.postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        const writer = post.user;

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

        // remove the request
        const removeRequest = await user.removeRequestRide(ride, { transaction: t });

        if (removeRequest === 0) {
            res.status(400).end(); // Bad Request
            return;
        }

        //notification
        req.variables = {
            send: writer,
            receive: user,
            title: 'passenger_cancel_request',
            from: 'writer',
            ride,
        };
        await socket(req, res, next);

        await t.commit();

        res.status(200).end();
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

        const post = await Post.findOne({
            where: { id: ride.postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        const writer = post.user;

        const partner = await user.removePartnerRide(ride, { transaction: t});

        if (partner === 0) {
            await t.rollback();
            res.status(400).end(); // Bad Request
            return;
        }

        // update available seats in the ride
        const available = ride.available + 1;
        await ride.update({ available: available }, { transaction: t });

        // notification
        req.variables = {
            send: writer,
            receive: user,
            title: 'passenger_cancel',
            from: 'writer',
            ride,
        };
        await socket(req, res, next);

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

/* GET /api/action/reservations */
exports.getReservations = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const trips = await user.getPartnerRides({
            include: [
                Object.assign({ model: Post }, postFormat()),
            ],
        });
        const requests = await user.getRequestRides({
            include: [
                Object.assign({ model: Post }, postFormat()),
            ],

        });

        const status = await getStatus(req, next);

        res.status(200).send({
            posts: { confirmed: trips, requests: requests },
            status: status
        });
    } catch (err) {
        next(err);
    }
}

/* GET /api/action/save */
exports.getSave = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const posts = await user.getSavePosts(postFormat());
        const status = await getStatus(req, next);
        res.send({ posts, status });
    } catch (err) {
        next(err);
    }
}

/* GET  /api/action/save/post/:id */
exports.getSaveStatus = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const save = await user.getSavePosts({ where: { id: req.params.id } });
        if (save.length > 0) {
            res.status(200).json({ status: true });
        } else {
            res.status(200).json({ status: false });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* POST /api/action/save/post/:id */
exports.postSave = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const post = await Post.findOne({ where: { id: req.params.id } });
        const save = await user.getSavePosts({ where: { id: req.params.id } });
        if (save.length > 0) {
            // if the user already saved the post
            res.status(409).end();
            return;
        }
        await user.addSavePosts(post)
        res.status(200).json({ status: true });
    } catch (err) {
        next(err);
    }
}

/* DELETE /api/action/save/post/:id */
exports.deleteSave = async (req, res, next) => {
    try{
        const post = await Post.findOne({ where: { id: req.params.id } });
        const user = await User.findOne({ where: { id: req.user.id } });
        const save = await user.removeSavePosts(post);
        if (save === 1) {
            res.status(200).json({ status: false });
            return;
        } else {
            res.status(400).end(); // the post was not saved; nothing to be removed
        }
    } catch (err) {
        next(err);
    }
}