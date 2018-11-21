/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);
    describe("post/register", () => {
        it('should register a new user', (done) => {
            chai.request(app)
            .post('/api/v1/register')
            .set('content-type', 'application/json')
            .send({
                Email: 'hada@gmail.com',
                userName: 'hada',
                password: 'hadasecret'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('successfully registered user');
                done();
            })
        })
    })