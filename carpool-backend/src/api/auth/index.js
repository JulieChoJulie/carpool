const express = require('express');
const auth = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const authCtrl = require('./auth.ctrl');

auth.get('/profile', isLoggedIn, authCtrl.profile);
auth.get('/join', isNotLoggedIn, authCtrl.join);
auth.post('/join', isNotLoggedIn, authCtrl.joinPost);
auth.post('/login', isNotLoggedIn, authCtrl.login);
auth.post('/logout', isLoggedIn, authCtrl.logout);
auth.post('/join/uniqueCheck', isNotLoggedIn, authCtrl.uniqueCheck);
module.exports = auth;