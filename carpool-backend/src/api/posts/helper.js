const { Comment, User, Ride } = require('../../../models');
const { Op } = require('sequelize');

/* post format */
exports.postFormat = (id) => {
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
        if(!!id) {
            format.where = {[Op.and]: [{ id: id }, { status: true }] }
        }
        return format;
    };