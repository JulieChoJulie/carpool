module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        timestamps: true,
        paranoid: true,
    })
);