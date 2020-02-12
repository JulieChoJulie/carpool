const express = require('express');
const action = express.Router();

const { isLoggedIn, isNotLoggedIn, isOwner } = require('../middlewares');

const actionCtrl = require('./action.ctrl');

action.post('/ride/:rideId/request', isLoggedIn, actionCtrl.requestRide);
action.post('/ride/:rideId/user/:userId/add', isLoggedIn, isOwner, actionCtrl.joinRide);
action.post('/ride/:rideId/cancel', isLoggedIn, actionCtrl.cancelRide);
action.get('/trip', isLoggedIn, actionCtrl.getTrip);
action.get('/save', isLoggedIn, actionCtrl.getSave);
action.post('/save/post/:id', isLoggedIn, actionCtrl.postSave);
action.delete('/save/post/:id', isLoggedIn, actionCtrl.deleteSave);
action.get('/ride/:rideId/partners', isLoggedIn, actionCtrl.getUserPartners);
action.get('/ridePartners', isLoggedIn, actionCtrl.getRidePartners);

module.exports = action;