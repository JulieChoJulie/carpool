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