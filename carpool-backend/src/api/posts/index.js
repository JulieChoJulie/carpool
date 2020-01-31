const express = require('express');
const posts = express.Router();
const postsCtrl = require('./posts.ctrl');
const saveCtrl = require('./save.ctrl');
const tripCtrl = require('./trip.ctrl');
const { isLoggedIn, isNotLoggedIn, isOwner } = require('../auth/middlewares');

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

posts.get('/save', isLoggedIn, saveCtrl.getSave);
posts.post('/save/post/:id', isLoggedIn, saveCtrl.postSave);
posts.delete('/save/post/:id', isLoggedIn, saveCtrl.deleteSave);

posts.get('/:id', postsCtrl.readPost);
posts.put('/:id', isLoggedIn, isOwner, postsCtrl.editPost);
posts.delete('/:id', isLoggedIn, isOwner, postsCtrl.deletePost);
posts.delete('/:id/ride/:rideId', isLoggedIn, isOwner, postsCtrl.deleteRide);

posts.post('/:id/comments', isLoggedIn, postsCtrl.writeComment);
posts.get('/:id/comments', postsCtrl.readComment);
posts.put('/:id/comments/:commentId', isLoggedIn, isOwner, postsCtrl.editComment);
posts.delete('/:id/comments/:commentId', isLoggedIn, isOwner, postsCtrl.deleteComment);

posts.get('/users/:userId', postsCtrl.readPostsByUser);

posts.get('/trip', isLoggedIn, tripCtrl.getTrip);

module.exports = posts;