// posts.get('/users/:userId/save', saveCtrl.getSave);
// posts.post('/users/:userId/save/post/:postId', saveCtrl.postSave);
// posts.delete('/users/:userId/save/post/:postId', saveCtrl.deleteSave);
const { Post, User, Save } = require('../../../models');
const { postFormat } = require('./helper');

/* GET /api/posts/save */
exports.getSave = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.userId } });
    const posts = user.getPosts(postFormat());

}

/* POST /api/posts/save/post/:id */
exports.postSave = async (req, res, next) => {
    try {
        console.log('***********')
        const user = await User.findOne({ where: { id: req.user.id } });
        const post = await Post.findOne({ where: { id: req.params.id } });
        await user.addSavePost(post)
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }

}