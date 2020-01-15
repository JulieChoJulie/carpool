const { Post, Comment, User, Ride } = require('../../../models');

/* post format */
const postFormat = (key, value) => {
    const format = {
        include: [
            {
                model: Comment,
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
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    };
    format[key] = value;
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
    try {
        const { rides } = req.body;
        if (!rides) {
            res.redirect('/');
        }
        const post = await Post.create({ userId: req.user.id });
        const postId = post.id;
        const result = await Promise.all(rides.map(ride => {
            const { from, to, seats, when } = ride;
            return Ride.create({
                when,
                from,
                to,
                seats,
                available: seats,
                postId: postId
            });
        }));
        res.json({ id: postId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/* GET api/posts/:id */
exports.readPost = async (req, res, next) => {
    try {
        const post = await Post.findOne(postFormat('where', { id: req.params.id }))
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
                    if (exRide.available > field.seats) {
                        return res.sendStatus(409); // conflict
                    }
                }
                return Ride.update(field, {where: {id: id}});
            });
        }));

        const post = await Post.findOne(postFormat('where', { id: req.params.id }));
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
}


/* DELETE api/posts/:id */
exports.deletePost = async (req, res, next) => {
    try {
        await Post.update({ status: false }, { where: { id: req.params.id } })
        res.sendStatus(200);
    } catch (err) {

    }
}


/* GET api/posts/:id/comments */


/* POST api/posts/:id/comments */


/* PATCH api/posts/:id/comments/:commentId */


/* DELETE api/posts/:id/comments/:commentId */
