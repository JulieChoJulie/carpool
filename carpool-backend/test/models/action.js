const chai = require('chai');
const server = require('../../src');
const should = chai.should();
const request = require('supertest');
const truncate = require('../truncate');
const postArray = require('../factories/ride');
const createUser = require('../createUser');

const testUser = {
    "email": "h32cho@gmail.com",
    "password": "h32cho",
    "username": "Julie",
    "cell": "647-819-7106"
};

let posts;
const id = 1;

const authenticatedUser = request.agent(server);

describe('Action-Logged In', function() {
    before(async () => {
        await truncate();
        posts = await postArray();
        await createUser(testUser);
        await authenticatedUser
            .post('/api/auth/login')
            .send(testUser)
            .expect(200)
    });

    /* POST api/action/ride/:rideId/add */
    it('should return partner on /api/action/ride/:rideId/add POST', function(done){
        authenticatedUser
            .post('/api/action/ride/' + id + '/add')
            .send({})
            .end(function(err, res) {
                console.log("error:" +  err)
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body[0].should.have.property('userId');
                res.body[0].should.have.property('rideId');
                res.body[0].rideId.should.equal(id);
                done();
            })
    })
});