let postId = 1; // the initial value of post Id

// the initial data for posts arr
const rides = [
    {
        id: 1,
        where: 'toronto',
        to: 'waterloo',
        when: '2020-01-8',
        seats: 3,
    }
];

const { Post, Comment, User, Ride } = require('../../../models');



/* POST /api/posts */
exports.write = async (req, res, next) => {
    try {
        const { rides } = req.body;
        if (!rides) {
            res.redirect('/');
        }
        // const post = await Post.create({ writer: });
        // const result = await Promise.all(rides.map(ride => {
        //     const { where, to, seats, when } = ride;
        //     return Ride.create({
        //         where,
        //         to,
        //         seats,
        //         available: seats,
        //     });
        // }));
        // await post.addRides(result.map(r => r[0]));
        // res.send(post);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

