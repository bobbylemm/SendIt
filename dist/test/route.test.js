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
        });
    });
});
//# sourceMappingURL=route.test.js.map