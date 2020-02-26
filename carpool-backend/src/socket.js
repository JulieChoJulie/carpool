const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const notification = io.of('/notification');
    notification.on('connection', (socket) => {
        console.log('notification socket connected**********');
        socket.on('message', (message) => {
            const data = JSON.parse(message);
            switch (data.type) {
                case 'socket/LOGIN':
                    socket.join(data.payload);
                default:
                    break;
            }
        });
        socket.on('disconnect', () => {
            console.log('notification socket disconnected ************');
        })
    })
};