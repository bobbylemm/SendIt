import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { expect } = chai;

chai.use(chaiHttp);

describe('post/parcels', () => {
describe('get/parcels', () => {
    describe('get/parcels/:id', () => {
            describe('post/register', () => {
                describe('get/users', () => {
                    describe("put/parcels/status/:id", () => {
                        describe("put/parcels/:id/cancel", () => {
                            describe("post/login", () => {
                                describe("get/users/:id/parcels", () => {
                                    describe("delete/parcels/:id/delete", () => {
                                        it('should create a parcel delivery order', (done) => {
                                            chai.request(app)
                                            .post('/api/v1/parcels')
                                            .set('content-type','application/json')
                                            .send({
                                                packageName: "fridge",
                                                destination: "lagos",
                                                pickupLocation: "iyana ipaja",
                                                status: "enroute",
                                                price: "45000 naira"
                                            })
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('new parcel created')
                                                done();
                                            })
                                        })
                                        // testing get all parcels
                                        it("it should get all parcel orders", (done) => {
                                            chai.request(app).get("/api/v1/parcels").end((req, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body.parcels).to.be.an('array');
                                                done();
                                            })
                                        })
                                        // testing get a specific parcel
                                        it('should get a specific parcel order', (done) => {
                                            const id = 1;
                                            chai.request(app).get(`/api/v1/parcels/${id}`).end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body.message).to.equal("the parcel was found");
                                                done();
                                            })
                                        })
                                        // testing register a new user
                                        it('should register a new user', (done) => {
                                            chai.request(app)
                                            .post('/api/v1/register')
                                            .set('content-type', 'application/json')
                                            .send({
                                                email: 'dodo@gmail.com',
                                                username: 'dodo',
                                                password: 'dodosecret'
                                            })
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('you have been successfully registered');
                                                done();
                                            })
                                        })
                                        // testing get all users registered
                                        it('should get all users', (done) => {
                                            chai.request(app)
                                            .get('/api/v1/users')
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.allUsers).to.be.an('array');
                                                done();
                                            })
                                        })
                                        // for the put request to update parcel order status
                                        it('should update the status of a parcel order', (done) => {
                                            const id = 1;
                                            chai.request(app)
                                            .put(`/api/v1/parcels/status/${id}`)
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                done();
                                            })
                                        })
                                        // for the put request to cancel a parcel order
                                        it('should cancel a parcel order', (done) => {
                                            const id = 1;
                                            chai.request(app)
                                            .put(`/api/v1/parcels/${id}/cancel`)
                                            .set('content-type', 'application/json')
                                            .send({
                                                cancelled: true
                                            })
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('this parcel order has been cancelled successfully')
                                                done();
                                            })
                                        })
                                        // testing the logging in an existing user feature
                                        it('should log in an existing user', (done) => {
                                            chai.request(app)
                                            .post('/api/v1/login')
                                            .set('content-type', 'application/json')
                                            .send({
                                                email: 'dodo@gmail.com',
                                                password: 'dodosecret'
                                            })
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal('successfully logged in');
                                                done();
                                            })
                                        })
                                        // it should get all parcels of a specific user
                                        it('should get all parcels for a specific user', (done) => {
                                            const id = 1;
                                            chai.request(app)
                                            .get(`/api/v1/users/${id}/parcels`)
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.userParcels).to.be.an('array');
                                                expect(res.body.message).to.equal("successfully fetched all of this user parcels");
                                                done();
                                            })
                                        })
                                        // this is to delete a specific parcel order
                                        it('should delete a parcel order', (done) => {
                                            const id = 1;
                                            chai.request(app)
                                            .delete(`/api/v1/parcels/${id}/delete`)
                                            .end((err, res) => {
                                                expect(res.status).to.equal(200);
                                                expect(res.body.message).to.equal("parcel successfully deleted");
                                                expect(res.body.allparcel).to.be.an('array');
                                                done();
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})