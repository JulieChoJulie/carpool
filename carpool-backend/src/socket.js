const SocketIO = require('socket.io');
const { Op } = require('sequelize');
const { User, Notification, Ride, Room } = require('../models');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const notification = io.of('/notification');
    const chat = io.of('/chat');

    let id = undefined;

    notification.on('connection', (socket) => {
        console.log('notification socket connected**********');

        socket.on('message', async (message) => {
            const data = JSON.parse(message);
            id = data.payload;
            switch (data.type) {
                case 'socket/LOGIN':
                    socket.join(id);
                    const user = await User.findOne({ where: { id } });
                    await user.update({ online: new Date() });
                    const notifications = await user.getReceiveNotifications({
                        where: {
                            createdAt: { [Op.gte]: user.offline }
                        },
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
                    io.of('/notification').to(user.id).emit('offline',
                        JSON.stringify(notifications)
                    );
                    break;
                default:
                    break;
            }
        });

        socket.on('disconnect', async () => {
            console.log('notification socket disconnected ************');
            if(id) {
                await User.update({ offline: new Date() }, { where: { id } });
                socket.leave(id);
            }

        })
    });

    chat.on('connect', async (socket) => {
        console.log('chat namespace connected----------');
        const req = socket.request;
        const { headers: { referer } } = req;
        // const roomId = referer
        //     .split('/')[referer.split('/').length - 1]
        //     .replace(/\?.+/, '');
        const user = await User.findOne({ where: { id }});
        const rooms = await user.getMessageRooms();
        rooms.forEach(room => socket.join(room.id));

        // socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat namespace disconencted--------');
            rooms.forEach(room => socket.leave(room.id));
        })
    })
};