const { User } = require('../models');
const bcrypt = require('bcrypt');


module.exports = async (testUser) => {
    const { email, password, username, cell } = testUser;
    const hash = await bcrypt.hash(password, 12);
    return await User.create({
        email,
        username,
        cell,
        provider: 'local',
        password: hash
    });
}
