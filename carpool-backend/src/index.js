const express = require('express');
const { sequelize } = require('../models');
const app = express();
sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const api = require('./api');

app.use('/api', api);


app.listen(4000, () => {
    console.log('Listening on port 4000');
});

