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
posts.get('/filter', postsCtrl.filterPost);
posts.get('/:id', postsCtrl.readPost);
posts.put('/:id', isLoggedIn, postsCtrl.editPost);
posts.delete('/:id', isLoggedIn, postsCtrl.deletePost);

posts.post('/:id/comments', isLoggedIn, postsCtrl.writeComment);
posts.get('/:id/comments', postsCtrl.readComment);
posts.put('/:id/comments/:commentId', isLoggedIn, postsCtrl.editComment);
posts.delete('/:id/comments/:commentId', isLoggedIn, postsCtrl.deleteComment);

module.exports = posts;