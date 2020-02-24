const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const webSocket = require('./socket');

const { sequelize } = require('../models');
const passportConfig = require('../passport');

const app = express();
sequelize.sync();
passportConfig(passport);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.set('port', process.env.PORT || 8001);


const api = require('./api');

app.use('/api', api);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err.message) {
        res.status(err.status || 500).send(err.message);
    } else {
        res.status(err.status || 500);
    }
});


const server = app.listen(app.get('port'), () => {
    console.log('Listening on port', + app.get('port'));
});

webSocket(server, app);

module.exports = app;