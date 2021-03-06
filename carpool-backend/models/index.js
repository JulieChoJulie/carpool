const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Ride = require('./ride')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Chat = require('./chat')(sequelize, Sequelize);

// 1:N relationship
const oneToN = (one, N, isOption) => {
    const opt = !isOption ? {} : { onDelete: 'cascade', hooks: true };
    db[one].hasMany(db[N], opt);
    db[N].belongsTo(db[one]);
};

oneToN('User', 'Post');
oneToN('Post', 'Ride')
oneToN('Post', 'Comment');
oneToN('User', 'Comment');
oneToN('Ride', 'Notification', false);
oneToN('Room', 'Chat');
oneToN('User', 'Chat');
oneToN('Post', 'Room');

// N:M relationship
const NtoM = (N, M, through) => {
    // ex. as: SavePosts
    db[N].belongsToMany(db[M], { through: through, as: through + M + 's' });
    db[M].belongsToMany(db[N], { through: through, as: through + N + 's' });
};

// make tables for trip and save;
NtoM('User', 'Post', 'Save');
NtoM('User', 'Ride', 'Partner');
NtoM('User', 'Ride', 'Request');
NtoM('User', 'Notification', 'Send');
NtoM('User', 'Notification', 'Receive');
NtoM('User', 'Room', 'Message');

module.exports = db;

