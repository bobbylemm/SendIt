/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

let userToken = '';

chai.use(chaiHttp);
describe("all the test", () => {
    describe("all about the user", () => {
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
                    expect(res.body.resp).to.be.an('object');
                    done();
                })
            })
        })
        describe("get/parcels/user", () => {
            it('should get all the user parcels', (done) => {
                chai.request(app)
                .get('/api/v1/parcels/user')
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
    })
});