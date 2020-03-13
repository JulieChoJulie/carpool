const { Post, Comment, User, Ride } = require('../../models');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(302);
        res.redirect('/');
    }
};

exports.isRoom = async (res, req, next) => {
    try {
        const room = await Room.findOne({ where: { id: req.params.roomId } });
        if (!room) {
            res.status(400).end(); // Bad Request
            return;
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.isParticipatedInRoom = async (req, res, next) => {
    try {
        const room = await Room.findOne({ where: { id: req.params.roomId } });
        const users = await room.getMessageUsers({
            where: { id: req.user.id }
        });
        if (users.length === 0) {
            res.status(403).end(); // forbidden
            return;
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}


// excluding password
exports.serialize = (req, res) => {
    if (req.user) {
        const {
            email,
            username,
            cell,
            provider,
            snsId,
            id,
            isStudent,
            isStudentEmail
        } = req.user;
        res.json({
            email,
            username,
            cell,
            provider,
            snsId,
            id,
            isStudent,
            isStudentEmail
        });
    } else {
        res.sendStatus(404);
    }
};

exports.serializeUser = (user, type) => {
    const { username, id, isStudent, isStudentEmail } = user;
    return {
        username,
        id,
        isStudent,
        isStudentEmail,
        [type]: user[type]
    }
};

exports.isOwner = async (req, res, next) => {
    let userId = -1;
    if (!!req.params.rideId) {
        const ride = await Ride.findOne({
            where: { id: req.params.rideId },
            include: [
                {
                    model: Post,
                    attributes: ['userId']
                }
            ]
        });
        if (ride === null) {
            res.sendStatus(404); // not found
        }
        userId = ride.post.userId;
    } else if (!!req.params.userId) {
        userId = parseInt(req.params.userId);
    } else if (!!req.params.commentId) {
        const comment = await Comment.findOne({ where: { id: req.params.commentId }});
        userId = comment.userId;
    } else if (!!req.params.id) {
        const post = await Post.findOne({ where: { id: req.params.id }});
        userId = post.userId;
    }
    if (userId === req.user.id) {
        next();
    } else {
        res.sendStatus(403); // Forbidden
    }
}
