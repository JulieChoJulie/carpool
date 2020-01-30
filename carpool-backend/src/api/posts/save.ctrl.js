// posts.get('/users/:userId/save', saveCtrl.getSave);
// posts.post('/users/:userId/save/post/:postId', saveCtrl.postSave);
// posts.delete('/users/:userId/save/post/:postId', saveCtrl.deleteSave);
const { Post, User, Save } = require('../../../models');
const { postFormat } = require('./helper');

/* GET /api/posts/users/:userId/save */
exports.getSave = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.userId } });
    const posts = user.getPosts(postFormat());

}

/* POST /api/posts/users/:userId/save/post/:postId */
exports.postSave = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.userId } });

}