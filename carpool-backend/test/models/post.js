const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src');
const should = chai.should();
const request = require('supertest');
const bcrypt = require('bcrypt');
const truncate = require('../truncate');
const postArray = require('../factories/ride');

chai.use(require('chai-datetime'));
chai.use(chaiHttp);

const testUser = {
    "email": "h32cho@gmail.com",
    "password": "h32cho",
    "username": "Julie",
    "cell": "647-819-7106"
};

let posts;

describe('Post-Not Logged In', function() {
    before(async () => {
        await truncate();
        posts = await postArray();
    });

    /*
        time in res = str
        time in posts = obj(Time)
        function timeToString
                     input = obj(Time)
                     output = string
    */
    const timeToString = (time) => {
        const str = JSON.stringify(time); // '"string"'
        return str.replace(/\"/g, ""); // remove double quotes
    };

    const postTimeToString = (post) => {
        const keys = Object.keys(post);
        keys.forEach(key => {
            if (key === 'createdAt' || key === 'updatedAt') {
                // 'when' in res = str while 'when' in posts = obj(Time)
                post[key] = timeToString(post[key]);
            } else {
                if (key === 'rides') {
                    // change time to string in posts[i].rides.when
                    const length = post[key].length;
                    for (let j = 0; j < length; j++) {
                        post[key][j].when = timeToString(post[key][j].when)
                    }
                }
            }
        });
        return post;
    };

    /* GET api/posts/ */
    it('should get post feed on /api/posts GET', function(done) {
        chai.request(server)
            .get('/api/posts')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('array');
                res.body.should.have.lengthOf(20);

                const arr = posts.map(post => {
                    return postTimeToString(post);
                });
                res.body.should.deep.equal(arr);
                done();
            })
    });

    /* POST api/posts/ */
    it('should return 403 error on /api/posts POST', function(done) {
        chai.request(server)
            .post('/api/posts')
            .end(function(err, res) {
                res.should.have.status(403);
                done();
            })
    });

    /* GET api/posts/filter  + query */

    /* GET api/posts/:id */
    const id = 1;
    it('should return the post with postId = id on /api/posts/:id GET', function(done) {
        chai.request(server)
            .get('/api/posts/' + id)
            .end(async function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');

                let post;
                for (let el of posts) {
                    if (el.id === id) {
                        post = el;
                        break;
                    }
                }
                res.body.should.deep.equal(postTimeToString(post));
                done();
            });
    });

    /* GET api/posts/:id */
    it('should return status code 404 with postId is invalid on /api/posts/:id GET', function(done) {
        chai.request(server)
            .get('/api/posts/' + -2)
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });

    /* GET api/posts/user/:userId */
    it('should return posts written by user on /api/posts/user/:userId GET', function(done) {
        chai.request(server)
            .get('/api/posts/user/' + id)
            .end(function (err, res) {
                res.should.have.status(200);

                const arr = posts.reduce((acc, post) => {
                    if (post.userId === id) {
                        acc.push(postTimeToString(post))
                    }
                    return acc;
                }, []);

                res.body.should.deep.equal(arr);
                done();
            })
    })

    /* PUT api/posts/:id */
    // it('should return the edited post on /api/posts/:id PUT', function(done) {
    //     const newDate = posts[2].rides[1].when; // grab the diff date;
    //     chai.request(server)
    //         .put('/api/posts/0')
    //         .send({
    //             "rides": [
    //                 { "id": 0 },
    //                 { "available": 0 },
    //                 { "when": newDate }
    //             ]
    //         })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.an('object');
    //             done()
    //         })
    // })

    /* DELETE api/posts/:id */
    /* DELETE api/posts/:id/rides/:rideId */
    /* POST api/posts/:id/comments */
    /* GET api/posts/:id/comments */
    /* PUT api/posts/:id/comments/:commentId */
    /* DELETE api/posts/:id/comments/:commentId */

});

describe('POST-Logged In', function() {
    /* GET api/posts/filter  + query */
    /* GET api/posts/:id */
    /* PUT api/posts/:id */
    /* DELETE api/posts/:id */
    /* DELETE api/posts/:id/rides/:rideId */
    /* POST api/posts/:id/comments */
    /* GET api/posts/:id/comments */
    /* PUT api/posts/:id/comments/:commentId */
    /* DELETE api/posts/:id/comments/:commentId */
})