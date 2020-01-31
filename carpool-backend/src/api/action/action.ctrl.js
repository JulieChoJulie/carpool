const { User, Ride, Post } = require('../../../models');
const { postFormat } = require('../posts/helper');
const { Op } = require('sequelize');

/* POST /action/ride/:rideId/add */
exports.joinRide = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const ride = await Ride.findOne({ where: { id: req.params.rideId } });
        const partner = await user.addPartnerRides(ride);
        console.log(partner);
        if (partner === undefined) {
            // the user already added the ride
            res.sendStatus(409); // conflict
        }
        const seats = ride.seats;
        const available = seats - partner.length;
        await ride.update({ available: available } );
        res.status(200).send(partner);
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
        console.log(partner)
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
