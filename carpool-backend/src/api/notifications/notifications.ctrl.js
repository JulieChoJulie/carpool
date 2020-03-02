const { Post, Comment, User, Ride, Notification } = require('../../../models');
const { sequelize } = require('../../../models');
const { Op, transaction } = require('sequelize');

/* GET /api/posts */
exports.readNotifications = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        const notifications = await user.getReceiveNotifications({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                    as: 'SendUsers',
                },
                {
                    model: User,
                    attributes: ['username', 'id'],
                    as: 'ReceiveUsers',
                },
                {
                    model: Ride,
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