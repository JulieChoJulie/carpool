const { Post, Comment, User, Ride, Notification } = require('../../../models');
const { sequelize } = require('../../../models');
const { Op, transaction } = require('sequelize');

/* GET /api/notifications/user/userId */
exports.readNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            include: [
                {
                    model: User,
                    where: { id: req.user.id },
                    attributes: ['username']
                },
                {
                    model: Ride,
                    attributes: ['from', 'to', 'offering', 'postId'],
                    where: { status: true }
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).send(notifications);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* GET /api/notifications/offline */
exports.getNotificationsOffline = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        const notifications = await Notification.findAll({
            where: { createdAt: {[Op.gte]: user.offline }},
            include: [
                {
                    model: User,
                    where: { id: req.user.id },
                    attributes: ['username']
                },
                {
                    model: Ride,
                    attributes: ['from', 'to', 'offering', 'postId'],
                    where: { status: true }
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).send(notifications);
    } catch (err) {
        console.error(err);
        next(err);
    }
}