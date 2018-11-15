/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);
describe('parcels route', () => {
  describe('post/parcels', () => {
    it('should create a parcel delivery order', done => {
      chai
        .request(app)
        .post('/api/v1/parcels')
        .set('content-type', 'application/json')
        .send({
          packageName: 'fridge',
          destination: 'lagos',
          pickupLocation: 'iyana ipaja',
          status: 'enroute',
          price: '45000 naira'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('new parcel created');
          done();
        });
    });
  });
  describe('get/parcels', () => {
    it('it should get all parcel orders', done => {
      chai
        .request(app)
        .get('/api/v1/parcels')
        .end((req, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.parcels).to.be.an('array');
          done();
        });
    });
  });
  describe('get/parcels/:id', () => {
    it('should get a specific parcel order', done => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('the parcel was found');
          done();
        });
    });
  });
  describe('put/parcels/status/:id', () => {
    it('should update the status of a parcel order', done => {
      const id = 1;
      chai
        .request(app)
        .put(`/api/v1/parcels/status/${id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('put/parcels/:id/cancel', () => {
    it('should cancel a parcel order', done => {
      const id = 1;
      chai
        .request(app)
        .put(`/api/v1/parcels/${id}/cancel`)
        .set('content-type', 'application/json')
        .send({
          cancelled: true
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('this parcel order has been cancelled successfully');
          done();
        });
    });
  });
  describe('delete/parcels/:id', () => {
    it('should delete a parcel order', done => {
      const id = 1;
      chai
        .request(app)
        .delete(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('parcel successfully deleted');
          expect(res.body.allparcel).to.be.an('array');
          done();
        });
    });
  });
});

describe('users route', () => {
  describe('post/register', () => {
    it('should register a new user', done => {
      chai
        .request(app)
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
        });
    });
  });
  describe('get/users', () => {
    it('should get all users', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.allUsers).to.be.an('array');
          done();
        });
    });
  });
  describe('post/login', () => {
    it('should log in an existing user', done => {
      chai
        .request(app)
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
        });
    });
  });
  describe('get/users/:id/parcels', () => {
    it('should get all parcels for a specific user', done => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/users/${id}/parcels`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.userParcels).to.be.an('array');
          expect(res.body.message).to.equal('successfully fetched all of this user parcels');
          done();
        });
    });
  });
});
