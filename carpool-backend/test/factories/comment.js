const faker = require('faker');
const models = require('../../models');
const createUser = require('./user');

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */

const data = async (postId) => {
    const user = await createUser();
    const defaultProps = {
        status: true,
        userId: user.id,
        content: faker.lorem.sentence(),
        postId: postId
    };
    return defaultProps
};
/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
module.exports = async (postId) =>
    models.Comment.create(await data(postId));