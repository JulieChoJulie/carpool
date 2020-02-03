const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) =>  {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, async (username, password, done) => {
        try {
            const exUser = await User.findOne({ where: { username } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: 'notMatch' });
                }
            } else {
                done(null, false, { message: 'The email you entered does not exist.' });
            }
        } catch (e) {
            console.error(e);
            done(e);
        }
    }));
};