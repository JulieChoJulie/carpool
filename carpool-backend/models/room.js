module.exports = (sequelize, DataTypes) => (
    sequelize.define('room', {
        rideId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);