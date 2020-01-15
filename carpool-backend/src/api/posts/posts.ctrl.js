const { Post, Comment, User, Ride } = require('../../../models');
const { Op } = require('sequelize');

/* post format */
const postFormat = (key, value) => {
    const format = {
        where: { status: true },
        include: [
            {
                model: Comment,
                where: { status: true },
                attributes: ['content', 'createdAt', 'userId'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                },
                order: [['createdAt', 'DESC']],
                limit: 2
            },
            {
                model: Ride,
                where: { status: true }
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    };
    if(!!value & !!key) {
        const obj = {};
        obj[key] = value;
        format.where = {[Op.and]: [obj, { status: true }] }
    }
    return format;
};

/* GET /api/posts */
exports.readFeed = async (req, res, next) => {
    try {
        // const posts = await Post.findAll({ limit: 2 });
        // const result = await Promise.all(posts.map(
        //     post => {
        //          const postId = post.id
        //          return Post.findOne(postFormat('where', {id: postId}))
        //     }
        // ));
        // res.send(result)
        const posts = await Post.findAll(postFormat());
        res.send(posts)
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* POST /api/posts */
exports.write = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { rides } = req.body;
        if (!rides) {
            res.redirect('/');
        }
        const post = await Post.create({ userId: req.user.id }, { transaction: t });
        const postId = post.id;
        const result = await Promise.all(rides.map(ride => {
            const { from, to, seats, when, price, offering } = ride;
            return Ride.create({
                when,
                from,
                to,
                seats,
                price,
                offering,
                available: seats,
                postId: postId,
            }, { transaction: t });
        }));
        await t.commit();
        res.json({ id: postId });
    } catch (error) {
        await t.rollback();
        console.error(error);
        next(error);
    }
}

/* GET api/posts/:id */
exports.readPost = async (req, res, next) => {
    try {
        console.log('------------------here')

        const id = parseInt(req.params.id);
        const post = await Post.findOne(postFormat('id', id));
        if (post === null) {
            console.log('here')
            res.status(404); // Not Found
        }
        res.send(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* PUT api/posts/:id */
exports.editPost = async (req, res, next) => {
    try {
        /*
        example of req.body
            req.body.rides = [
                [
                    {id: rideId},
                    {field: editedContent}
                ],
                Array, ....
            ]
        */
        const { rides } = req.body;
        const result = await Promise.all(rides.map(ride => {
            const id = ride[0].id;
            const fields = ride.slice(1);
            return fields.reduce(async (acc, field) => {
                if (!!field.seats) {
                    const exRide = await Ride.findOne({where: {id: id}});
                    if (exRide === null) {
                        return res.status(404); // Not Found
                    } else if (exRide.available > field.seats) {
                        return res.status(409); // conflict
                    }
                }
                return Ride.update(field, { where: { id: id } });
            });
        }));

        const post = await Post.findOne(postFormat('id', parseInt(req.params.id)));
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/* DELETE api/posts/:id */
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.update(
            { status: false },
            { where: {
                    [Op.and]: [
                        {status: true},
                        {id: req.params.id}
                    ]
                }
            }
        );
        /*
        post = [ affected row]
        returns the array of the number of affected rows
        when nothing is updated === post = [0]
        */
        if (post[0] === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* GET api/posts/:id/comments */
exports.readComment = async (req, res, next) => {
    try {
        const id = req.params.id
        const comments = await Comment.findAll({
            where: {
                [Op.and]: [
                    { postId: id},
                    { status: true }
                    ]
            }
        });
        if (comments.length > 0) {
            res.send(comments);
        } else {
            res.status(404); // Not Found
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};


/* POST api/posts/:id/comments */
exports.writeComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({
            userId: req.user.id,
            postId: req.params.id,
            content: req.body.content
        });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        next(err)
    }
};

/* PATCH api/posts/:id/comments/:commentId */
exports.editComment = async (req, res, next) => {
    try {
        const comment = await Comment.update({ content: req.body.content },{ where: { id: req.params.commentId } });
        if (comment[0] !== 0) {
            res.send(200);
        } else {
            res.status(404).send(); // Not Found
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};


/* DELETE api/posts/:id/comments/:commentId */
exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.update({ status: false },
            { where: { [Op.and]: [
                        { id: req.params.commentId },
                        { status: true }
                    ]}
            }
        );
        if (comment[0] === 0) {
            res.status(404).send(); // Not Found
        } else {
            res.send(200);
        }
    } catch (err) {

    }
};
