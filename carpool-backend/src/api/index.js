const express = require('express');
const posts = require('./posts');
const auth = require('./auth');
const action = require('./action');
const notifications = require('./notifications');

const api = express.Router();

api.use('/posts', posts);
api.use('/auth', auth);
api.use('/action', action);
api.use('/notifications', notifications);

module.exports = api;