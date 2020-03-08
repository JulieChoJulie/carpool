const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const { User } = require('../models');

module.exports = (passport) => {
    console.log('facebookStrategy');
    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "/api/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({}, function(err, user) {
                if (err) { return done(err); }
                done(null, user);
            });
        }
    ));
}