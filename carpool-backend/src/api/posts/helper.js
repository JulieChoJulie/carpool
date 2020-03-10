const { Comment, User, Ride, Post } = require('../../../models');
const { Op } = require('sequelize');

/* post format */
exports.postFormat = (field, value) => {
    const format = {
        where: { status: true },
        include: [
            {
                model: Comment,
                where: { status: true },
                attributes: ['content', 'createdAt', 'userId', 'id'],
                include: {
                    model: User,
                    attributes: ['id', 'username', 'isStudent']
                },
                order: [['createdAt', 'ASC']],
                limit: 500,
            },
            {
                model: Ride,
                where: { status: true },
            },
            {
                model: User,
                attributes: ['id', 'username', 'isStudent']
            },
            {
                model: User,
                as: 'SaveUsers',
                attributes: ['id'],
            }
        ],
        order: [['updatedAt', 'DESC']]
    };
    const obj = {};
    obj[field] = value;
    if(!!field && !!value) {
        format.where = {[Op.and]: [obj, { status: true }] }
    }
    return format;
};


exports.myPostFormat = (userId, field, value) => {
    const format = {
        where: { status: true, userId },
        include: [
            {
                model: Ride,
                where: { status: true },
                include: [
                    {
                        model: User,
                        as: 'RequestUsers',
                        attributes: ['id', 'username', 'isStudent'],
                    },
                    {
                        model: User,
                        as: 'PartnerUsers',
                        attributes: ['id', 'username', 'isStudent'],
                    }
                ]
            }
        ]
    }
    const obj = {};
    obj[field] = value;
    if(!!field && !!value) {
        format.include[0].where = {[Op.and]: [obj, { status: true }] }
    }
    return format;
}