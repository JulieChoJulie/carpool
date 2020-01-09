module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {},{
        timestamps: true,
    })
);