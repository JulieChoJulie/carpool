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

const data = async (props = {}) => {
    const user = await createUser();
    const defaultProps = {
        status: true,
        userId: user.id
    };
    return Object.assign({}, defaultProps, props);
};
/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
module.exports = async (props = {}) =>
    models.Post.create(await data(props));