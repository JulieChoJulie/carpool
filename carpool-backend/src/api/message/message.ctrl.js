const passport = require('passport');
const bcrypt = require('bcrypt');
const { User, Chat, Room, Ride } = require('../../../models');
const schedule = require('node-schedule');
const { Op } = require('sequelize');
const { sequelize } = require('../../../models');

/* GET api/message/user/:userId */
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (user) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* POST api/message/room */
exports.createRoom = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { userId, rideId } = req.body;

        const allRooms = await user.getMessageRooms({
            attributes: ['id', 'rideId'],
            include: [
                {
                    model: User,
                    as: 'MessageUsers',
                    attributes: ['id']
                }
            ]

        });
        const allRoomsArr = JSON.parse(JSON.stringify(allRooms));

        // find if there is existing room;
        let exRoomId = null;

        if (userId) {
            for (let i = 0; i < allRoomsArr.length; i++) {
                const room = allRoomsArr[i];
                const users = room.MessageUsers;
                if (users.length === 2) {
                    if (users[0].id === user.id || users[0].id === parseInt(userId)) {
                        if (users[1].id === user.id || users[1].id === parseInt(userId)) {
                            exRoomId = room.id;
                            break;
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < allRoomsArr.length; i++) {
                const room = allRoomsArr[i];
                if (room.rideId === rideId) {
                    exRoomId = rideId;
                    break;
                }
            }
        }

        if (exRoomId !== null) {
            await t.rollback();
            res.status(200).send({ roomId: exRoomId });
            return;
        }

        // if there was no existing room;
        const room = await Room.create({ transaction: t });
        await room.addMessageUser(user, { transaction: t });

        if (userId) {
            const userInvited = await User.findOne({ where: { id: parseInt(userId) } });
            await room.addMessageUser(userInvited, { transaction: t });
        } else if (rideId) {
            const ride = await Ride.findOne({ where: { id: parseInt(rideId) }});
            const users = await ride.getPartnerUsers();
            await Promise.all(usersArr.forEach(async (user) => {
                const member = await User.findOne({ where: { id: user.id }});
                if (!member) {
                    res.sendStatus(400); // Bad Request
                    return;
                }
                await Room.addMessageUser(member, { transaction: t });
                await room.update({ rideId: ride.id }, { transaction: t });
            }));
        }
        await t.commit();
        res.status(200).send({ roomId: room.id });

    } catch (err) {
        await t.rollback();
        console.error(err);
        next(err);
    }
}

/*
isParticipatedInRoom middleware
GET api/message/room/:roomId
*/
exports.getRoom = async (req, res, next) => {
    try {
        const chats = await Chat.findAll({
            where: { roomId: parseInt(req.params.roomId) },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'isStudent']
                }
            ]
        });
        const room = await Room.findOne({ where: { id: parseInt(req.params.roomId) }});
        const users = await room.getMessageUsers({
            attributes: ['id', 'username', 'isStudent']
        });
        res.status(200).send({ chats, users });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* GET api/message/rooms */
exports.getRooms = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const rooms = await user.getMessageRooms({
            include: [
                {
                    model: Chat,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'username', 'isStudent']
                        }
                    ]
                }
            ]
        });
        res.status(200).send(rooms);

    } catch (err) {
        console.error(err);
        next(err);
    }
};

/*
isParticipatedInRoom middleware
POST api/message/room/:roomId/chat
*/
exports.postChat = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const { chat } = req.body;
        const chatAdded = await Chat.create({
            userId: req.user.id,
            roomId: req.params.roomId,
            chat,
        });
        req.app.get('io').of('/chat').to(req.params.roomId).emit('chat', chatAdded);
        res.status(200).send(chatAdded);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/*
GET api/message/room/:roomId/join
*/
exports.joinRoom = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const room = await Room.findOne({ where: { id: req.params.roomId } });
        const userAdded = await room.addMessageUser(user);
        if (Array.isArray(userAdded)) {
            req.app.get('io').of('/chat').to(req.params.roomId).emit('join', userAdded);
            res.sendStatus(200);
        } else if (userAdded === undefined) {
            res.sendStatus(409);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* DELETE api/message/room/:roomId/exit */
exports.exitRoom = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const room = await Room.findOne({ where: { id: req.params.roomId } });
        const userRemoved = await room.removeMessageUser(user);
        if (userRemoved === 0) {
            res.sendStatus(400); // nothing has been removed
        } else if (userRemoved === 1) {
            const users = await room.getMessageUsers();
            if (users.length === 0) {
                await room.destroy();
            }
            res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* GET /api/message/offline */
exports.offlineMessage = async (req, res, next) => {
    try {
        const user = await USer.findOne({ where: { id: req.user.id } });
        const offline = user.offline;
        const rooms = await user.getMessageRooms({
            include: [
                {
                    model: Chat,
                    where: {
                        createdAt: { [Op.gte]: user.offline }

                    },
                    attributes: ['createdAt'],
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: User,
                            attributes: ['username', 'isStudent', 'id']
                        }
                    ]
                }
            ]
        });

        res.status(200).send(rooms);
    } catch (err) {
        console.error(err);
        next(err);
    }
}