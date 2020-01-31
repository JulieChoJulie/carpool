const { User, Ride, Post } = require('../../../models');
const { postFormat } = require('../posts/helper');
const { Op } = require('sequelize');

/* POST /action/ride/:rideId/add */
exports.joinRide = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const ride = await Ride.findOne({ where: { id: req.params.rideId } });
        const partner = await user.addPartnerRides(ride);
        res.status(200);
        res.send(partner);
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
