const express = require('express');
const notifications = express.Router();
const notificationsCtrl = require('./notifications.ctrl');
const { isLoggedIn } = require('../middlewares');


notifications.get('/users/:userId',isLoggedIn, notificationsCtrl.readNotifications);
notifications.get('/offline', isLoggedIn, notificationsCtrl.getNotificationsOffline);
module.exports = notifications;