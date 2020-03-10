const { Post, Comment, User, Ride } = require('../../../models');
const { sequelize } = require('../../../models');
const { Op, transaction } = require('sequelize');
const { postFormat } = require('./helper');
const { getStatus } = require('../action/action.ctrl');
const schedule = require('node-schedule');
const { socket } = require('../createSocket');

/* GET /api/posts */
exports.readFeed = async (req, res, next) => {
    try {
        const count = await Post.count({ where: { status: true }});
        if (count === 0) {
            res.status(402).end();
            return;
        }
        const posts = await Post.findAll(postFormat());
        if (req.user) {
            const status = await getStatus(req, next);
            res.status(200).send({ posts: posts, status: status });
        } else {
            res.status(200).send({ posts });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* POST /api/posts */
exports.write = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { rides, notes } = req.body;
        const writer = await User.findOne({ where: { id: req.user.id }});
        if (!rides) {
            res.redirect('/');
        }
        const post = await Post.create({
                userId: req.user.id,
                notes: notes,
            },
            { transaction: t });
        const postId = post.id;
        const rideArr = await Promise.all(rides.map(r => {
            const { from, to, seats, when, price, offering } = r;
            return  Ride.create({
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

        // cancel all requests on the time of ride departure
        rideArr.forEach(ride => {
            const end = new Date(ride.when);
            schedule.scheduleJob(end, async() => {
                const requestedUsers = await ride.getRequestUsers();
                await Promise.all(requestedUsers.forEach(async u => {
                    const user = await User.findOne({where: { id: u.id }});
                    await ride.removeRequestUser(user);
                    //notification
                    req.variables = {
                        send: writer,
                        receive: user,
                        title: 'passenger_cancel_request',
                        from: 'writer',
                        ride,
                    };
                    await socket(req, res, next);
                }));
            });
        })

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
        const post = await Post.findOne(postFormat('id', parseInt(req.params.id)));
        if (post === null) {
            res.status(404).end(); // Not Found
            return;
        }
        res.status(200).send(post);
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
                        return res.sendStatus(404); // Not Found
                    } else if (exRide.available > field.seats) {
                        return res.sendStatus(409); // conflict
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
};

/* DELEE api/posts/:id */
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.update(
            { status: false },
            { where: {
                    [Op.and]: [
                        { status: true },
                        { id: req.params.id }
                    ]
                }
            },
        );
        /*
        post = [ affected row]
        returns the array of the number of affected rows
        when nothing is updated === post = [0]
        */
        if (post[0] === 0) {
            res.sendStatus(404);
        } else {
            const rides = await Ride.update(
                { status: 0 },
                { where: { postId: req.params.id } }
            );
            res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deleteRide = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const ride = await Ride.update(
            { status: false },
            {
                where: {
                    [Op.and]: [
                        { status: true },
                        { id: req.params.rideId }
                    ]
                },
                transaction: t
            }
        );
        if (ride[0] === 0) {
            res.sendStatus(404); // Not Found
        } else {
            // delete the post if rides are all deleted.
            const rides = await Ride.findAll({
                where: {
                    [Op.and]: [
                        { status: true },
                        { postId: req.params.id }
                    ]
                }
            });
            if (rides.length === 0) {
                const post = await Post.update(
                    { status: false },
                    { where: { id: req.params.id } },
                    { transaction: t }
                );
            }
            await t.commit();
            res.sendStatus(200);
        }
    } catch (err) {
        await t.rollback();
        console.error(err);
        next(err);
    }
}

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
            res.status(200).send(comments);
        } else {
            res.sendStatus(404); // Not Found
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

        const user = await User.findOne({ where: { id: req.user.id } });
        const post = await Post.findOne({ where: { id: req.params.id } });
        const rides = await Ride.findAll({ where: { postId: post.id } });
        const writer = await User.findOne({ where: { id: post.userId } });

        // notification
        req.variables = {
            send: user,
            receive: writer,
            title: 'comment',
            from: 'commenter',
            ride: post,
        };

        await socket(req, res, next);

        res.status(200).send(comment);
    } catch (err) {
        console.error(err);
        next(err)
    }
};

/* PATCH api/posts/:id/comments/:commentId */
exports.editComment = async (req, res, next) => {
    try {
        const comment = await Comment.update(
            { content: req.body.content },
            { where: { id: req.params.commentId } }
        );
        if (comment[0] !== 0) {
            const commentUpdated = await Comment.findOne(
                {
                    where: { id: req.params.commentId },
                    attributes: ['content', 'updatedAt', 'userId', 'id'],
                    include: {
                        model: User,
                        attributes: ['id', 'username', 'isStudent']
                    },
                }
            );
            res.status(200).send(commentUpdated);
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
            res.sendStatus(200);
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
                range[0] = new Date(parseInt(range[0]));
                range[1] = new Date(parseInt(range[1]));
            };
            obj[key] = {[Op.lte]: range[1], [Op.gte]: range[0]};
            arr.push(obj);
        } else if (key === 'available') {
            arr.push({ available: { [Op.gte]: query[key] } });
        } else {
            if(query[key] !== 'Anywhere' && query[key] !== ''){
                obj[key] = query[key];
                arr.push(obj);
            }
        }
    }
    const rides = await Ride.findAll({
        where: {
            [Op.and]: [...arr, { status: true }]
        },
        include: {
            model: Post,
            attributes: ['updatedAt', 'createdAt', 'id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        order: [[Post, 'updatedAt', 'DESC']]
    });
    res.status(200).send(rides);
};

/* GET api/posts/users/:userId */
exports.readPostsByUser = async (req, res, next) => {
    try {
        const posts = await Post.findAll(postFormat('userId', parseInt(req.params.userId)));
        if (posts.length > 0) {
            res.status(200).send(posts);
        } else {
            res.sendStatus(404); // Not Found
        }
    } catch (err) {
        next(err);
    }
}


/* GET api/posts/:id/getOwner */
// with isLoggedIn, isOwner middlewares before this.
exports.getOwner = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findOne(postFormat('id', parseInt(req.params.id)));
        if (post === null) {
            res.sendStatus(404); // Not Found
        }
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
        next(err);
    }
}