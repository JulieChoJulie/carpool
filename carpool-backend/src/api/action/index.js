const express = require('express');
const action = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const actionCtrl = require('./action.ctrl');

action.post('/ride/:rideId/add', isLoggedIn, actionCtrl.joinRide);
action.post('/ride/:rideId/cancel', isLoggedIn, actionCtrl.cancelRide);
action.get('/trip', isLoggedIn, actionCtrl.getTrip);
action.get('/save', isLoggedIn, actionCtrl.getSave);
action.post('/save/post/:id', isLoggedIn, actionCtrl.postSave);
action.delete('/save/post/:id', isLoggedIn, actionCtrl.deleteSave);

module.exports = action;