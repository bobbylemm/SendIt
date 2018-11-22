/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

let userToken = '';

chai.use(chaiHttp);
describe("handle all unregistered routes", () => {
    it("should give an error when the route entered is an unregistered one", (done) => {
        chai.request(app)
        .get('/*')
        .end((err, res) => {
            expect(res.body.error.message).to.equal('sorry this page was not found');
            done();
        })
    })
})
describe("all the test", () => {
    describe("all about the user", () => {
        describe("post/register", () => {
            it('should not register if all the required fields are not filled', (done) => {
                chai.request(app)
                .post('/api/v1/auth/register')
                .set('content-type', 'application/json')
                .send({
                    Email: '',
                    userName: 'loll',
                    password: 'lollsecret'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.error.message).to.equal('this email is not valid');
                    done();
                })
            })
        })
        describe("post/register", () => {
            it('should register a new user', (done) => {
                chai.request(app)
                .post('/api/v1/auth/register')
                .set('content-type', 'application/json')
                .send({
                    Email: 'loll@gmail.com',
                    userName: 'loll',
                    password: 'lollsecret'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('successfully registered user');
                    done();
                })
            })
        })
        describe("post/register", () => {
            it('should not register a new user when the user already exists', (done) => {
                chai.request(app)
                .post('/api/v1/auth/register')
                .set('content-type', 'application/json')
                .send({
                    Email: 'loll@gmail.com',
                    userName: 'loll',
                    password: 'lollsecret'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.message).to.equal('unable to create user');
                    done();
                })
            })
        })
        describe("post/login", () => {
            it('should login an existing user', (done) => {
                chai.request(app)
                .post('/api/v1/auth/login')
                .set('content-type', 'application/json')
                .send({
                    Email: 'loll@gmail.com',
                    password: 'lollsecret'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('successfully logged in');
                    userToken = res.header['x-auth-token'];
                    done();
                })
            })
        })
    });
    describe("all about the parcels", () => {
        describe("post/parcels", () => {
            it('should authenticate the token provided and create a parcel', (done) => {
                chai.request(app)
                .post('/api/v1/parcels')
                .set('x-auth-token', userToken)
                .set('content-type', 'application/json')
                .send({
                    packageName: 'moi moi',
                    pickupLocation: 'yaba',
                    dropOfflocation: 'berger',
                    presentLocation: 'yaba',
                    weight: 300,
                    price: 10000
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('new parcel created');
                    expect(res.body.resp).to.be.an('Array');
                    done();
                })
            })
        })
        describe("get/parcels/user", () => {
            it('should get all the user parcels', (done) => {
                chai.request(app)
                .get('/api/v1/users/1/parcels')
                .set('x-auth-token', userToken)
                .set('content-type', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('got all this users parcels');
                    expect(res.body).to.be.have.property('parcels');
                    done();
                })
            })
        })
        describe("get/parcels", () => {
            it('should get all parcels in the application, admin only', (done) => {
                chai.request(app)
                .get('/api/v1/parcels')
                .set('x-auth-token', userToken)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.error.message).to.equal('you are not authorized to perform this action, admin only');
                    expect(res.body).to.be.have.property('error');
                    done();
                })
            })
        })
        describe("put/parcels/newdropoff", () => {
            it('should update a parcel dropoff location', (done) => {
                chai.request(app)
                .put('/api/v1/parcels/1/destination')
                .set('x-auth-token', userToken)
                .set('content-type', 'application/json')
                .send({
                    newdropOff: 'asaba'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('parcel destination was updated successfully');
                    done();
                })
            })
        })
        describe("put/parcels/:pid/cancel", () => {
            it('should cancel a parcel order of a user', (done) => {
                chai.request(app)
                .put('/api/v1/parcels/1/cancel')
                .set('x-auth-token', userToken)
                .set('content-type', 'application/json')
                .send({
                    cancelled: true
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('this parcel delivery has been cancelled successfully');
                    done();
                })
            })
        })
        describe("put/parcels/status", () => {
            it('should update a parcel status, admin only', (done) => {
                chai.request(app)
                .put('/api/v1/parcels/1/status')
                .set('x-auth-token', userToken)
                .set('content-type', 'application/json')
                .send({
                    newStatus: 'delivered'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.error.message).to.equal('you are not authorized to perform this action, admin only');
                    expect(res.body).to.be.have.property('error');
                    done();
                })
            })
        })
        describe("put/parcels/1/presentLocation", () => {
            it('should update a parcel current location', (done) => {
                chai.request(app)
                .put('/api/v1/parcels/1/currentlocation')
                .set('x-auth-token', userToken)
                .set('content-type', 'application/json')
                .send({
                    newLocation: 'lokoja'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.error.message).to.equal('you are not authorized to perform this action, admin only');
                    done();
                })
            })
        })
    })
});