module.exports = (sequelize, DataTypes) => (
    sequelize.define('comment', {
        content: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    }, {
        timestamps: true,
    })
)