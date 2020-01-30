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
    one.hasMany(N);
    N.belongsTo(one);
};

oneToN(db.User, db.Post);
oneToN(db.Post, db.Ride)
oneToN(db.Post, db.Comment);
oneToN(db.User, db.Comment);

// N:M relationship
const NtoM = (N, M, through) => {
    N.belongsToMany(M, { through: through });
    M.belongsToMany(N, { through: through });

};

// make tables for trip and save;
NtoM(db.User, db.Post, 'trip');
NtoM(db.User, db.Post, 'save');

module.exports = db;

