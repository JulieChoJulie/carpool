const faker = require('faker');
const models = require('../../models');
/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
    const defaultProps = {
        email: faker.internet.email(),
        cell: faker.phone.phoneNumber(),
        username: faker.internet.userName().slice(0,14),
        password: faker.name.firstName(),
        status: false,
        provider: 'local',
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
    models.User.create(await data(props));