module.exports = (sequelize, DataTypes) => (
    sequelize.define('ride', {
        seats: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 4,
        },
        available: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        from: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        to : {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        when: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
    })
);