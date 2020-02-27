const { Post, Comment, User, Ride, Notification } = require('../../../models');
const { sequelize } = require('../../../models');
const { Op, transaction } = require('sequelize');

/* GET /api/posts */
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