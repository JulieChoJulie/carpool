const express = require('express');
const posts = express.Router();

const printInfo = function(req, res, next) {
    res.json({
        method: req.method,
        path: req.path,
        params: req.params
    });
};

posts.get('/', printInfo);
posts.post('/', printInfo);
posts.get('/:id', printInfo);
posts.delete('/:id', printInfo);
posts.patch('/:id', printInfo);
posts.post('/:id/comments', printInfo);
posts.get('/:id/comments', printInfo);
posts.delete('/:id/comments', printInfo);

module.exports = posts;