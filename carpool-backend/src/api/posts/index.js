const express = require('express');
const posts = express.Router();
const postsCtrl = require('./posts.ctrl');
const { isLoggedIn, isNotLoggedIn } = require('../auth/middlewares');

const printInfo = function(req, res, next) {
    res.json({
        method: req.method,
        path: req.path,
        params: req.params
    });
};

posts.get('/', postsCtrl.readFeed);
posts.post('/', isLoggedIn, postsCtrl.write);
posts.get('/:id', postsCtrl.readPost);
posts.put('/:id', isLoggedIn, postsCtrl.editPost);
posts.delete('/:id', isLoggedIn, postsCtrl.deletePost);

posts.post('/:id/comments', isLoggedIn, printInfo);
posts.get('/:id/comments', printInfo);
posts.put('/:id/comments/:commentId', isLoggedIn, printInfo);
posts.delete('api/posts/:id/comments/:commentId', isLoggedIn, printInfo);

module.exports = posts;