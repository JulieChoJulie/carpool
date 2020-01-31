const express = require('express');
const posts = express.Router();
const postsCtrl = require('./posts.ctrl');
const { isLoggedIn, isNotLoggedIn, isOwner } = require('../middlewares');

posts.get('/', postsCtrl.readFeed);
posts.post('/', isLoggedIn, postsCtrl.write);
posts.get('/filter', postsCtrl.filterPost);

posts.get('/:id', postsCtrl.readPost);
posts.put('/:id', isLoggedIn, isOwner, postsCtrl.editPost);
posts.delete('/:id', isLoggedIn, isOwner, postsCtrl.deletePost);
posts.delete('/:id/ride/:rideId', isLoggedIn, isOwner, postsCtrl.deleteRide);

posts.post('/:id/comments', isLoggedIn, postsCtrl.writeComment);
posts.get('/:id/comments', postsCtrl.readComment);
posts.put('/:id/comments/:commentId', isLoggedIn, isOwner, postsCtrl.editComment);
posts.delete('/:id/comments/:commentId', isLoggedIn, isOwner, postsCtrl.deleteComment);

posts.get('/users/:userId', postsCtrl.readPostsByUser);

module.exports = posts;