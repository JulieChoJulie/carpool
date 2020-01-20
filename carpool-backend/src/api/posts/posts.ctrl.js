const { Post, Comment, User, Ride } = require('../../../models');
const { sequelize } = require('../../../models');
const { Op, transaction } = require('sequelize');

/* post format */
const postFormat = (id) => {
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
    if(!!id) {
        format.where = {[Op.and]: [{ id: id }, { status: true }] }
    }
    return format;
};

/* GET /api/posts */
exports.readFeed = async (req, res, next) => {
    try {
        const posts = await Post.findAll(postFormat());
        res.send(posts)
    } catch (err) {
        console.error(err);
        next(err);
    }
};

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
};

/* GET api/posts/:id */
exports.readPost = async (req, res, next) => {
    try {
        const post = await Post.findOne(postFormat(parseInt(req.params.id)));
        if (post === null) {
            console.log('here')
            res.status(404); // Not Found
        }
        res.send(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

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
            return fields.forEach(async (field) => {
                if (!!field.seats) {
                    const exRide = await Ride.findOne({ where: { id: id } });
                    if (exRide === null) {
                        return res.status(404); // Not Found
                    } else if (exRide.available > field.seats) {
                        return res.status(409); // conflict
                    }
                }
                return Ride.update(field, { where: { id: id } });
            });
        }));
        const post = await Post.findOne(postFormat(parseInt(req.params.id)));
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

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
        const id = req.params.id;
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
        console.error(err);
        next(err);
    }
};

/* GET api/posts/filter */
exports.filterPost = async (req, res, next) => {
    const query = req.query;
    const arr = [];
    const newest = parseInt(query.newest);
    delete query.newest

    for ( key in query) {
        const obj = {};
        if (key === 'price' || key === 'when') {
            const range = query[key].split('_');
            if (key === 'when') {
                range[0] = new Date(range[0]);
                range[1] = new Date(range[1]);
            };
            obj[key] = {[Op.lte]: range[1], [Op.gte]: range[0]};
            arr.push(obj);
        } else if (key === 'available') {
            arr.push({ available: { [Op.gte]: query[key] } });
        } else {
            obj[key] = query[key];
            arr.push(obj);
        }
    }

    const rides = await Ride.findAll({
        where: {
            [Op.and]: [...arr, { status: true }]
        },
        include: {
            model: Post,
            attributes: ['updatedAt', 'createdAt'],
        },
        order: !!newest ? [[Post, 'createdAt', 'DESC']] : [[Post, 'updateAt', 'ASC']]

    // order: !!newest ? ['createdAt', 'DESC'] : [['createdAt', 'ASC']]
    });


    res.send(rides);
};