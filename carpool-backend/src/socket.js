const SocketIO = require('socket.io');
const { Post, Comment, User, Ride, Notification } = require('../models');


module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const notification = io.of('/notification');
    let id = null;
    notification.on('connection', async (socket) => {
        console.log('notification socket connected**********');
        let id = null;
        if (id !== null) {
            const user = await User.update({ online: new Date() }, { where: { id: id }});
        }
        socket.on('message', async (message) => {
            const data = JSON.parse(message);
            switch (data.type) {
                case 'socket/LOGIN':
                    id = data.payload;
                    socket.join(id);
                    console.log(id);
                    console.log('***************')
                    const user = await User.update({ online: new Date() }, { where: { id: id }});
                    socket.to(id).emit('offline', {});
                    console.log('***************')

                    break;
                default:
                    break;
            }
        });
        const rooms = socket.rooms;
        socket.on('disconnect', async () => {
            console.log('notification socket disconnected ************');

            await User.update({ offline: new Date() }, { where: { id: id }});
        })
    })
};