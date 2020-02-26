module.exports = (sequelize, DataTypes) => (
    sequelize.define('notification', {
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        from: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    }, {
        timestamps: true,
    })
)