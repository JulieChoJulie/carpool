module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },{
        timestamps: true,
    })
);