const { Notification, User, Ride } = require('../../models');
const { sequelize } = require('../../models');

exports.socket = async (req) => {
    const { ride, send, receive, from, title } = req.variables;
    //notification
    const notification = await Notification.create({
        rideId: ride.id,
        title,
        from,
    });

    await notification.addSendUsers(send);
    await notification.addReceiveUsers(receive);

    const notificationData = await Notification.findOne({
        where: { id: notification.id },
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
        ]
    });

    // socket
    const io = req.app.get('io');
    const { rooms } = io.of('/notification').adapter;

    // if the alarm receiver is online, send a socket
    if (rooms[receive.id]) {
        io.of('/notification').to(receive.id).emit('receive', {
            type: 'socket/GET_NOTIFICATION',
            data: notificationData
        });
    }
}