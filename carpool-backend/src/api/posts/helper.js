const { Comment, User, Ride } = require('../../../models');
const { Op } = require('sequelize');

/* post format */
exports.postFormat = (field, value) => {
        const format = {
            where: { status: true },
            include: [
                {
                    model: Comment,
                    where: { status: true },
                    attributes: ['content', 'createdAt', 'userId'],
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 2
                },
                {
                    model: Ride,
                    where: { status: true }
                },
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        };
        const obj = {};
        obj[field] = value;
        if(!!field && !!value) {
            format.where = {[Op.and]: [obj, { status: true }] }
        }
        return format;
    };