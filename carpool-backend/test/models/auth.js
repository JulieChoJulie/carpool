const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src');
const should = chai.should();
const request = require('supertest');
const truncate = require('../truncate');
const createUser = require('../createUser');

chai.use(chaiHttp);

const testUser = {
    "email": "h32cho@gmail.com",
    "password": "h32cho",
    "username": "Julie",
    "cell": "647-819-7106"
};

describe('Auth-Not Logged In', function() {
    before(async () => {
        await truncate();
    });

    /* GET api/auth/join */
    it('should get the join page on /api/auth/join GET', function(done) {
        chai.request(server)
            .get('/api/auth/join')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    /* GET api/auth/profile */
    it('should get 403 error on /api/auth/profile GET', function(done) {
        chai.request(server)
            .get('/api/auth/profile')
            .end(function(err, res){
                res.should.have.status(403);
                done();
            })
    });

    /* POST api/auth/join */
    it('should get a registered User on /api/auth/join POST', function(done) {
        chai.request(server)
            .post('/api/auth/join')
            .send(testUser)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('username');
                res.body.username.should.equal('Julie');
                done();
            })
    });

    /* POST api/auth/join */
    it('should return 409 for unique constraint error on /api/auth/join POST', function(done) {
        chai.request(server)
            .post('/api/auth/join')
            .send({
                "email": "h32cho@gmail.com",
                "password": "h32cho",
                "username": "Julie",
                "cell": "647-819-7106"
            })
            .end(function(err, res) {
                res.should.have.status(409);
                done();
            })
    });

    /* POST api/auth/logout */
    it('should return 403 error when the user is not logged in on /api/auth/logout POST', function(done) {
        chai.request(server)
            .post('/api/auth/logout')
            .end(function(err, res) {
                res.should.have.status(403);
                done();
            })
    });

    /* POST api/join/uniqueCheck */
    it('should return 200 when email/usernmae are unique on /api/join/uniqueCheck POST', function(done) {
        chai.request(server)
            .post('/api/auth/join/uniqueCheck')
            .send({
                "type": "email",
                "value": "uniqueAddress@gmail.com"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    /* POST api/join/uniqueCheck */
    it('should return 409 when constraint error has occured on /api/join/uniqueCheck POST', function(done) {
        chai.request(server)
            .post('/api/auth/join/uniqueCheck')
            .send({
                "type": "username",
                "value": "Julie"
            })
            .end(function(err, res) {
                res.should.have.status(409);
                done();
            });
    });

    /* POST api/auth/login */
    it('should send 200 when the login is successful on /api/auth/login POST', function(done) {
        chai.request(server)
            .post('/api/auth/login')
            .send({
                "email": "h32cho@gmail.com",
                "password": "h32cho"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    /* POST api/auth/login */
    it('should send 401 when the email is not in the system on /api/auth/login POST', function(done) {
        chai.request(server)
            .post('/api/auth/login')
            .send({
                "email": "uniqueAddress@gmail.com",
                "password": "h32cho"
            })
            .end(function(err, res) {
                res.should.have.status(404);
                done();
            });
    });

    /* POST api/auth/login */
    it('should send 401 when the password is wrong on /api/auth/login POST', function(done) {
        chai.request(server)
            .post('/api/auth/login')
            .send({
                "email": "h32cho@gmail.com",
                "password": "wrongPassword"
            })
            .end(function(err, res) {
                res.should.have.status(401);
                done();
            });
    });

});


const authenticatedUser = request.agent(server);

describe('Auth-Logged In', function() {
    before(async () => {
        await truncate();
        await createUser(testUser);
        await authenticatedUser
            .post('/api/auth/login')
            .send(testUser)
            .expect(200)
    });

    /* GET /api/auth/profile */
    it('should get a user info on /api/auth/profile GET', function(done) {
        authenticatedUser
            .get('/api/auth/profile')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                done();
            });
    });

    /* GET  api/auth/join */
    it('should redirect to home page on /api/auth/join GET', function(done) {
        authenticatedUser
            .get('/api/auth/join')
            .end(function(err, res) {
                res.should.have.status(302);
                res.should.to.redirectTo('/');
                done();
            })
    });

    /* POST api/auth/join */
    it('should redirect to home page on /api/auth/join POST', function(done) {
        authenticatedUser
            .post('/api/auth/join')
            .send({})
            .end(function(err, res) {
                res.should.have.status(302);
                res.should.to.redirectTo('/');
                done();
            });
    });

    /* POST api/auth/join/uniqueCheck */
    it('should redirect to home page on /api/auth/join/uniqueCheck POST', function(done) {
        authenticatedUser
            .post('/api/auth/join/uniqueCheck')
            .send({})
            .end(function(err, res) {
                res.should.have.status(302);
                res.should.to.redirectTo('/');
                done();
            });
    });

    /* POST api/auth/login */
    it('should redirect to home page on /api/auth/login POST', function(done) {
        authenticatedUser
            .post('/api/auth/login')
            .send({})
            .end(function(err, res) {
                res.should.have.status(302);
                res.should.to.redirectTo('/');
                done();
            });
    });

    /* POST api/auth/logout */
    it('should redirect to home page after log out on /api/auth/logout POST', function(done) {
        authenticatedUser
            .post('/api/auth/logout')
            .send({})
            .end(function(err, res) {
                res.should.have.status(302);
                res.should.to.redirectTo('/');
                done();
            });
    });
});

