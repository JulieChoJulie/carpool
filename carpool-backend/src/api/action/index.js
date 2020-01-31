const express = require('express');
const action = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const actionCtrl = require('./action.ctrl');

action.post('/ride/:rideId/add', isLoggedIn, actionCtrl.joinRide);
action.post('/ride/:rideId/cancel', isLoggedIn, actionCtrl.cancelRide);

module.exports = action;