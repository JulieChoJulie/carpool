const { User, Ride } = require('../../../models');


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
