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

// 1:N relationship
const oneToN = (one, N) => {
    db[one].hasMany(db[N]);
    db[N].belongsTo(db[one]);
};

oneToN('User', 'Post');
oneToN('Post', 'Ride')
oneToN('Post', 'Comment');
oneToN('User', 'Comment');

// N:M relationship
const NtoM = (N, M, through) => {
    db[N].belongsToMany(db[M], { through: through, as: through + M });
    db[M].belongsToMany(db[N], { through: through, as: through + N });

};

// make tables for trip and save;
NtoM('User', 'Post', 'Trip');
NtoM('User', 'Post', 'Save');

module.exports = db;

