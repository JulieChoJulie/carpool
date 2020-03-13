const express = require('express');
const message = express.Router();
const passport = require('passport');

const { isLoggedIn, isParticipatedInRoom } = require('../middlewares');

const messageCtrl = require('./message.ctrl.js');

message.get('/room/:roomId', isLoggedIn, isParticipatedInRoom, messageCtrl.getRoom);
message.get('/rooms', isLoggedIn, messageCtrl.getRooms);
message.post('/room/:roomId/chat', isLoggedIn, isParticipatedInRoom, messageCtrl.postChat);
message.get('/room/:roomId/join', isLoggedIn, messageCtrl.joinRoom);
message.get('/room/:roomId/exit', isLoggedIn, isParticipatedInRoom, messageCtrl.exitRoom);
message.get('/offline', isLoggedIn, messageCtrl.offlineMessage);
message.get('/user/:userId', isLoggedIn, messageCtrl.getUser);
message.post('/room', isLoggedIn, messageCtrl.createRoom);




module.exports = message;