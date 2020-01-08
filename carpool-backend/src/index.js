const express = require('express');

const app = express();


const api = require('./api');

app.use('/api', api);



app.listen(4000, () => {
    console.log('Listening on port 4000');
});

