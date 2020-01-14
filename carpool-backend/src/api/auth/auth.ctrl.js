const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const { serialize } = require('./middlewares');

/* GET api/auth/profile */
exports.profile = (req, res) => {
    res.send(serialize(req, res));
};

/* POST  api/auth/join/uniqueCheck */
exports.uniqueCheck = async (req, res, next) => {
    try {
        // check the uniqueness of username/email before submit the signup form
        const { type, value } = req.body;
        const obj = {};
        obj[type] = value;
        const exUser = await User.findOne({ where: obj });
        if (exUser) {
            res.sendStatus(409);
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        next(err)
    }
}

/* GET  api/auth/join */
exports.join = (req, res) => {
    res.sendStatus(200);
};

/* POST api/auth/join */
exports.joinPost = async (req, res, next) => {
    try {
        const { email, username, password, cell } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({
            email,
            username,
            cell,
            password: hash,
            provider: 'local'});
        res.send(user);
    } catch (err) {
        next(err);
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