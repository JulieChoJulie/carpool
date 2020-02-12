const { User, Ride, Post } = require('../../../models');
const { postFormat } = require('../posts/helper');
const { Op } = require('sequelize');
const { serializeUser } = require('../middlewares');

/* GET /api/action/ride/:rideId/requests */
const getRequestsFunc = async (req, res) => {
    try {
        const ride = await Ride.findOne({ where: { id: req.params.rideId }});
        if (ride === null) {
            res.sendStatus(404); // not found
        }
        const requests = await ride.getRequestUsers();
        return requests;
    } catch (err){
        console.log(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/request */
exports.requestRide = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        const ride = await Ride.findOne({
            where: { id: req.params.rideId }
        });
        if (ride === null) {
            res.sendStatus(404); // not found
        }
        const post = await Post.findOne({ where: { id: ride.postId }});
        const driverId = post.userId;
        if (user.id !== driverId) {
            const request = await user.addRequestRides(ride);
            res.status(200).send(request);
        } else {
            res.sendStatus(400); // Bad request: request by the driver
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/users/:userId/add */
exports.joinRide = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        const ride = await Ride.findOne({ where: { id: req.params.rideId } });
        if (user === null || ride === null) {
            res.sendStatus(404); // not found
        }

        const requests = await getRequestsFunc(req, res);
        if (requests.length === 0) {
            // no requests under this ride
            res.sendStatus(400); // not found
        }


        let match = false;
        for (const i in requests) {
               if (requests[i].id === user.id) {
                match = true;
                break;
            }
        }
        if (!match) {
            res.sendStatus(403); //forbidden; userId did not request
        }

        if (ride.available > 0) {
            const partner = await user.addPartnerRides(ride);
            console.log(JSON.stringify(partner))
            if (partner === undefined) {
                // the user already added the ride
                res.sendStatus(409); // conflict
            }
            const seats = ride.seats;
            if (partner.length === 0) {
                // the user already added the ride
                res.sendStatus(409); // conflict
            }
            const available = seats - partner.length;
            await ride.update({ available: available } );
            res.status(200).send(partner);
        } else {
            res.sendStatus(400); // Bad Request
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* POST /action/ride/:rideId/cancel */
exports.cancelRide = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const ride = await Ride.findOne({ where: { id: req.params.rideId } });
        const partner = await user.removePartnerRides(ride);
        if (partner === 0) {
            // the user already cancelled the ride
            res.sendStatus(409); // conflict
        }
        const available = ride.available + 1;
        await ride.update({ available: available } );
        res.sendStatus(200);
    } catch (err) {
        next(err);
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
        res.sendStatus(200);
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
        res.sendStatus(200)
    } catch (err) {
        next(err);
    }
}

/* GET /api/action/ride/:rideId/partners */
exports.getUserPartners = async (req, res, next) => {
    try {
        const ride = await Ride.findOne({ where : { id : req.params.rideId }});
        const partners = await ride.getPartnerUsers();
        const serializedPartners = partners.map(partner => serializeUser(partner));
        res.status(200).send(serializedPartners);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* GET /api/action/userPartners */
exports.getRidePartners = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        const partners = await user.getPartnerRides();
        res.status(200).send(partners);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/* GET /api/action/ride/:rideId/requests */
exports.getRequests = async (req, res, next) => {
    try {
        const requests = getRequestsFunc(req, res);
        res.status(200).send(requests);
    } catch (err) {
        console.log(err);
        next(err);
    }
}