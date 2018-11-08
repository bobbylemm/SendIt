import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
const { expect } = chai;

chai.use(chaiHttp);

describe("post/parcels", () => {
    describe("get/parcels", () => {
        describe("get/parcels/:id", () => {
            describe("post/register", () => {
                describe("get/users", () => {
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
                })
            })
        })
    })
})