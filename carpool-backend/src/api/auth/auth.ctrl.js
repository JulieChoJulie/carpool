const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const { serialize } = require('./middlewares');

/* GET api/auth/profile */
exports.profile = (req, res) => {
    res.send(serialize(req, res));
};

/* GET  api/auth/join */
exports.join = (req, res) => {
    res.sendStatus(200);
};

/* POST api/auth/join */
exports.joinPost = async (req, res, next) => {
    const { email, nick, password, cell } = req.body;
    try {
        const exUser = await User.findOne({ where: { email }});
        if (exUser) {
            res.sendStatus(409); // conflict
        }
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({
            email,
            nick,
            cell,
            password: hash,
            provider: 'local'})
       res.sendStatus(200)
    } catch (e) {
        console.error(e);
        return next(e);
    }
}

/* POST api/auth/login */
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.error(401).send(info.message); //unauthorized err
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.sendStatus(200);
        });
    })(req, res, next);
};

/* POST api/auth/logout */
exports.logout = (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
};