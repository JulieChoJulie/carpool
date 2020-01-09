let postId = 1; // the initial value of post Id

// the initial data for posts arr
const posts = [
    {
        id: 1,
        where: 'toronto',
        to: 'waterloo',
        date: '2020-01-8',
        seats: 3,

    }
];




/* POST /api/posts */
exports.write = function(req, res, next) {
    const { where, to, date, seats } = req.body;
    postId += 1;
    posts.push({ id: postId, where: where, to: to, date: date, seats: seats });
    res.send(posts);
}