module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },
        cell: {
            type:DataTypes.STRING(25),
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        profile: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        online: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        offline: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        verificationCodes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        isStudent : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isStudentEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);