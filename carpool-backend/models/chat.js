module.exports = (sequelize, DataTypes) => (
    sequelize.define('chat', {
        chat: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        gif: {
            type: DataTypes.STRING(500),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);