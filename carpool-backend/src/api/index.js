const express = require('express');
const posts = require('./posts');


const api = express.Router();

api.use('/posts', posts);


module.exports = api;