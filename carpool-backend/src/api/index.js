const express = require('express');
const posts = require('./posts');
const auth = require('./auth');
const action = require('./action');

const api = express.Router();

api.use('/posts', posts);
api.use('/auth', auth);
api.use('/action', action);

module.exports = api;