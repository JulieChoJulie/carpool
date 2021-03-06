const express = require('express');
const action = express.Router();

const { isLoggedIn, isNotLoggedIn, isOwner } = require('../middlewares');

const actionCtrl = require('./action.ctrl');

/* A passenger requests */
action.post('/ride/:rideId/request/add', isLoggedIn, actionCtrl.addRequest);
action.post('/ride/:rideId/request/cancel', isLoggedIn, actionCtrl.cancelRequest);
action.post('/ride/:rideId/cancel', isLoggedIn, actionCtrl.cancelRide);
action.get('/rides/status', isLoggedIn, actionCtrl.getRideStatus);

/* A driver requests */
action.post('/ride/:rideId/user/:userId/add', isLoggedIn, isOwner, actionCtrl.addPassenger);
action.post('/ride/:rideId/user/:userId/cancel', isLoggedIn, isOwner, actionCtrl.cancelPassenger);
action.post('/ride/:rideId/user/:userId/cancel/request', isLoggedIn, isOwner, actionCtrl.cancelPassengerRequest);
action.get('/ride/:rideId/passengers', isLoggedIn, actionCtrl.getPassengers);
action.get('ride/:rideId/requests', isLoggedIn, isOwner, actionCtrl.getRequests);
action.get('/posts/manage', isLoggedIn, actionCtrl.getMyPost);

action.get('/reservations', isLoggedIn, actionCtrl.getReservations);
action.get('/save', isLoggedIn, actionCtrl.getSave);
action.post('/save/post/:id', isLoggedIn, actionCtrl.postSave);
action.delete('/save/post/:id', isLoggedIn, actionCtrl.deleteSave);
action.get('/save/post/:id', isLoggedIn, actionCtrl.getSaveStatus);

module.exports = action;