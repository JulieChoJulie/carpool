const express = require('express');
const auth = express.Router();
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn, isOwner } = require('../middlewares');

const authCtrl = require('./auth.ctrl');

auth.get('/profile', isLoggedIn, authCtrl.profile);
auth.get('/join', isNotLoggedIn, authCtrl.join);
auth.post('/join', isNotLoggedIn, authCtrl.joinPost);
auth.post('/login', isNotLoggedIn, authCtrl.login);
auth.post('/logout', isLoggedIn, authCtrl.logout);
auth.post('/join/uniqueCheck', isNotLoggedIn, authCtrl.uniqueCheck);

auth.post('/verifyStudentEmail', isNotLoggedIn, authCtrl.verifyStudentEmail);
auth.get('/sendVerificationCodes', isLoggedIn, authCtrl.sendVerificationCodes);
auth.post('/compareVerificationCodes', isLoggedIn, authCtrl.compareVerificationCodes);

auth.get('/isOwner', isOwner);





module.exports = auth;