const faker = require('faker');
const models = require('../../models');
const createPost = require('./post');
const { postFormat } = require('../../src/api/posts/helper');
const { Post, User } = require('../../models');

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (postId) => {
    // seats range between 8 to 1
    const randomSeats = Math.floor(Math.random() * Math.floor(8)) + 1
    // price range between 5 dollars to 25
    const randomPrice = 5 + Math.floor(Math.random() * Math.floor(21));
    const defaultProps = {
        seats: randomSeats,
        available: randomSeats,
        to: faker.address.city(),
        from: faker.address.city(),
        when: faker.date.future(),
        offering: faker.random.boolean(),
        status: true,
        price: randomPrice,
        postId: postId
    };
    return Object.assign({}, defaultProps, postId);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */

module.exports = async () => {
    const arr = [];
    for (let i = 0 ; i < 20 ; i++) {
        const post = await createPost();
        await models.Ride.create(await data(post.id));
        await models.Ride.create(await data(post.id));
        const postFormated = await Post.findOne(postFormat(post.id));
        arr.push(postFormated.toJSON());
    }
    // return an array of posts
    return arr;
};
