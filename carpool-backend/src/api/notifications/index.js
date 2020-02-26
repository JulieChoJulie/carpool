const express = require('express');
const notifications = express.Router();
const notificationsCtrl = require('./notifications.ctrl');
const { isLoggedIn, isOwner } = require('../middlewares');

notifications.get('/users/:userId',isLoggedIn, isOwner, notificationsCtrl.readNotifications);

module.exports = notifications;