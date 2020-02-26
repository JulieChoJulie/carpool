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


// excluding password
exports.serialize = (req, res) => {
    if (req.user) {
        const { email, username, cell, provider, snsId, id } = req.user;
        res.json({
            email,
            username,
            cell,
            provider,
            snsId,
            id
        });
    } else {
        res.sendStatus(404);
    }
};

exports.serializeUser = (user, type) => {
    const { username, id } = user;
    return {
        username,
        id,
        [type]: user[type]
    }
}

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
        console.log(JSON.stringify(comment))
        userId = comment.userId;
    } else if (!!req.params.id) {
        const post = await Post.findOne({ where: { id: req.params.id }});
        userId = post.userId;
    }
    if (userId === req.user.id) {
        console.log(userId);
        console.log(req.user);
        next();
    } else {
        res.sendStatus(403); // Forbidden
    }
}
