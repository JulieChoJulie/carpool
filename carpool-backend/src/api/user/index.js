const express = require('express');
const user = express.Router();

const { isLoggedIn } = require('../middlewares');

const userCtrl = require('./user.ctrl');

user.post('/changePassword', isLoggedIn, userCtrl.changePassword);
user.post('/changeUsername', isLoggedIn, userCtrl.changeUsername);
user.post('/changeCell', isLoggedIn, userCtrl.changeCell);
user.get('/getProfile/:username', userCtrl.getProfile);

module.exports = user;