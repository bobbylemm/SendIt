import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
const { expect } = chai;

chai.use(chaiHttp);

describe("post/parcels", () => {
    describe("get/parcels", () => {
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
    })
})