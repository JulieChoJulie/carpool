const { User, Ride, Post } = require('../../../models');
const { postFormat } = require('../posts/helper');
const { Op } = require('sequelize');
const { serializeUser } = require('../middlewares');

/* POST /action/ride/:rideId/add */
exports.joinRide = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const ride = await Ride.findOne({ where: { id: req.params.rideId } });
        if (ride.available > 0 ) {
            const partner = await user.addPartnerRides(ride);
            if (partner === undefined) {
                // the user already added the ride
                res.sendStatus(409); // conflict
            }
            const seats = ride.seats;
            if (partner === 0) {
                // the user already added the ride
                res.sendStatus(409); // conflict
            }
            const available = seats - partner.length;
            await ride.update({ available: available } );
            res.status(200).send(partner);
        } else {
            res.sendStatus(403); //Forbidden
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