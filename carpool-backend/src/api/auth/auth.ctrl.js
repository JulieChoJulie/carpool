const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const { serialize } = require('../middlewares');
const { sendEmail } = require('../../lib/email');
const schedule = require('node-schedule');

/* GET api/auth/profile */
exports.profile = (req, res) => {
    return serialize(req, res);
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
        console.log(err);
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
        const { email, username, password, cell, isStudentEmail } = req.body;
        const hash = await bcrypt.hash(password, 12);
        console.log('isStudentEmjail: ' + isStudentEmail);
        console.log('*****************************************')
        const user = await User.create({
            email,
            username,
            cell,
            isStudentEmail,
            password: hash,
            provider: 'local'});
        loginFunction(req, res, next);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.sendStatus(409);
        }
        next(err);
    }
};


/* POST api/auth/login */
const loginFunction = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (info && info.message) {
            if (info.message === 'notMatch'){
                return res.sendStatus(401); // unauthorized err
            }
        }
        if (!user) {
            return res.sendStatus(404); // not found
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
exports.login = loginFunction;

/* POST api/auth/logout */
exports.logout = (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
};

/* POST api/auth/verifyStudentEmail */
exports.verifyStudentEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const studentEmails = [
            '@edu.uwaterloo.ca',
            '@mail.utoronto.ca',
            '@yorku.ca',
            '@mcmaster.ca',
            '@mylaurier.ca',
            '@uwo.ca',
            '@ryerson.ca',
        ];
        const isStudentEmail = studentEmails.filter(i => email.includes(i));
        if (isStudentEmail === -1) {
            // the entered email is not student email address;
            res.sendStatus(400); // bad request
            return;
        } else {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                res.sendStatus(409); // Conflict
                return;
            } else {
                res.sendStatus(200);
            }
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* GET api/auth/sendVerificationCodes */
exports.sendVerificationCodes = async (req, res, next) => {
    try {
        let verificationCodes = 0;
        for (let i = 0; i < 6; i++) {
            verificationCodes += Math.floor(Math.random() * 10) * (10 ** i);
        }
        const user = await User.findOne({ where: { id: req.user.id }});
        sendEmail({ verificationCodes, email: user.email });
        await user.update({ verificationCodes });
        const end = new Date();
        end.setMinutes(end.getMinutes() + 5);
        schedule.scheduleJob(end, async() => {
            await user.update({ verificationCodes: null });
        });
        res.status(200).send(end);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* POST /api/auth/compareVerificationCodes */
exports.compareVerificationCodes = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        const codes = user.verificationCodes;
        const { verificationCodes } = req.body;
        if (verificationCodes === '' ) {
            res.sendStatus(400); // BadRequest
        } else if (codes === verificationCodes) {
            res.sendStatus(200);
            await user.update({ isStudent: true });
            return;
        } else {
            res.sendStatus(404); // Not Found
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}
