const { User, Ride, Post } = require('../../../models');
const { Op } = require('sequelize');

const changeField = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        let value = req.body[req.body.field];
        if (req.body.field === 'password') {
            if (user.password === value) {
                res.sendStatus(400); // Bad Request
                return;
            } else {
                value = req.body['newPassword'];
            }
        }
        await user.update({ [req.body.field]: value });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        req.body.field = 'password';
        await changeField(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.changeEmail = async (req, res, next) => {
    try {
        req.body.field = 'email';
        await changeField(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.changeCell = async (req, res, next) => {
    try {
        req.body.field = 'cell';
        await changeField(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.changeUsername = async (req, res, next) => {
    try {
        req.body.field = 'username';
        await changeField(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if (!user) {
            res.sendStatus(404);
            return;
        }
        const { username, email, isStudent, cell, createdAt, id } = user;
        const now = new Date();
        const offeringRides = await Ride.findAll({
            where: {
                [Op.and]: [
                    { when: {[Op.lt]: now }},
                    { offering: true }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'PartnerUsers',
                    attributes: ['id', 'username', 'isStudent'],
                },
                {
                    model: Post,
                    where: { userId: user.id }
                }
            ]

        });

        const lookingForRides = await Ride.findAll({
            where: {
                [Op.and]: [
                    { when: {[Op.lt]: now }},
                    { offering: false }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'PartnerUsers',
                    attributes: ['id', 'username', 'isStudent'],
                },
                {
                    model: Post,
                    where: { userId: user.id }
                }
            ]
        });

        const passengerRides = await user.getPartnerRides({
            where: {
                [Op.and]: [
                    { when: {[Op.lt]: now }},
                    { offering: true }
                ]
            }
        });

        const driverRides = await user.getPartnerRides({
            where: {
                [Op.and]: [
                    { when: {[Op.lt]: now }},
                    { offering: false }
                ]
            }
        });

        res.status(200).json({
            username, email, isStudent, cell, createdAt, id,
            driverRides, passengerRides, lookingForRides, offeringRides,
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}