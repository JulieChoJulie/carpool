exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
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
    const { email, nick, cell, provider, snsId, id } = req.user;
    res.json({
        email,
        nick,
        cell,
        provider,
        snsId,
        id
    });
}

exports.isOwner = (req, res) => {
    let user;
    if (!!req.params.userId) {
        user = req.params.userId;
    } else if (!!req.params.commentId) {
        user = req.params.commentId;
    } else {
        user = req.params.id;
    }

    if (user.id === req.user.id) {
        next();
    } else {
        res.sendStatus(403);
    }
}