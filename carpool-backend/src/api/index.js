const express = require('express');
const posts = require('./posts');
const auth = require('./auth');
const action = require('./action');
const notifications = require('./notifications');
const user = require('./user');
const message =require('./message');

const api = express.Router();

api.use('/posts', posts);
api.use('/auth', auth);
api.use('/action', action);
api.use('/notifications', notifications);
api.use('/user', user);
api.use('/message', message);


const router = express.Router()


module.exports = api;