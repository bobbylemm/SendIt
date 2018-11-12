'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);

describe("post/parcels", function () {
    describe("get/parcels", function () {
        describe("get/parcels/:id", function () {
            describe("post/register", function () {
                describe("get/users", function () {
                    describe("put/parcels/status/:id", function () {
                        describe("put/parcels/:id/cancel", function () {
                            describe("post/login", function () {
                                describe("get/users/:id/parcels", function () {
                                    describe("delete/parcels/:id/delete", function () {
                                        it('should create a parcel delivery order', function (done) {
                                            _chai2.default.request(_app2.default).post('/api/v1/parcels').set('content-type', 'application/json').send({
                                                packageName: "fridge",
                                                destination: "lagos",
                                                pickupLocation: "iyana ipaja",
                                                status: "enroute",
                                                price: "45000 naira"
                                            }).end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('new parcel created');
                                                done();
                                            });
                                        });
                                        // testing get all parcels
                                        it("it should get all parcel orders", function (done) {
                                            _chai2.default.request(_app2.default).get("/api/v1/parcels").end(function (req, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body.parcels).to.be.an('array');
                                                done();
                                            });
                                        });
                                        // testing get a specific parcel
                                        it('should get a specific parcel order', function (done) {
                                            var id = 1;
                                            _chai2.default.request(_app2.default).get('/api/v1/parcels/' + id).end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body.message).to.equal("the parcel was found");
                                                done();
                                            });
                                        });
                                        // testing register a new user
                                        it('should register a new user', function (done) {
                                            _chai2.default.request(_app2.default).post('/api/v1/register').set('content-type', 'application/json').send({
                                                email: 'dodo@gmail.com',
                                                username: 'dodo',
                                                password: 'dodosecret'
                                            }).end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('you have been successfully registered');
                                                done();
                                            });
                                        });
                                        // testing get all users registered
                                        it('should get all users', function (done) {
                                            _chai2.default.request(_app2.default).get('/api/v1/users').end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.allUsers).to.be.an('array');
                                                done();
                                            });
                                        });
                                        // for the put request to update parcel order status
                                        it('should update the status of a parcel order', function (done) {
                                            var id = 1;
                                            _chai2.default.request(_app2.default).put('/api/v1/parcels/status/' + id).end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                done();
                                            });
                                        });
                                        // for the put request to cancel a parcel order
                                        it('should cancel a parcel order', function (done) {
                                            var id = 1;
                                            _chai2.default.request(_app2.default).put('/api/v1/parcels/' + id + '/cancel').set('content-type', 'application/json').send({
                                                cancelled: true
                                            }).end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('this parcel order has been cancelled successfully');
                                                done();
                                            });
                                        });
                                        // testing the logging in an existing user feature
                                        it('should log in an existing user', function (done) {
                                            _chai2.default.request(_app2.default).post('/api/v1/login').set('content-type', 'application/json').send({
                                                email: 'dodo@gmail.com',
                                                password: 'dodosecret'
                                            }).end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('successfully logged in');
                                                done();
                                            });
                                        });
                                        // it should get all parcels of a specific user
                                        it('should get all parcels for a specific user', function (done) {
                                            var id = 1;
                                            _chai2.default.request(_app2.default).get('/api/v1/users/' + id + '/parcels').end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.userParcels).to.be.an('array');
                                                expect(res.body.message).to.equal("successfully fetched all of this user parcels");
                                                done();
                                            });
                                        });
                                        // this is to delete a specific parcel order
                                        it('should delete a parcel order', function (done) {
                                            var id = 1;
                                            _chai2.default.request(_app2.default).delete('/api/v1/parcels/' + id + '/delete').end(function (err, res) {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal("parcel successfully deleted");
                                                expect(res.body.allparcel).to.be.an('array');
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=route.test.js.map