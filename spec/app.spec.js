process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
// const chai = require('chai');
// const chaiSorted = require('chai-sorted');
const { expect } = require('chai');
const connection = require('../db/connection');

// chai.use(chaiSorted);

describe('/', () => {
  after(() => connection.destroy());
  beforeEach(() => connection.seed.run());
});
describe('/api', () => {
  describe('/topics', () => {
    it('GET status:200 and returns an array of topic objects, each topic having the correct properties and the correct length', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics[0]).to.contain.keys('description', 'slug');
          expect(res.body.topics.length).to.equal(3);
        });
    });
  });
  describe('/users/:username', () => {
    it('GET for a valid username: status 200 and returns an object of the user passed in the url along with the correct properties present', () => {
      return request(app)
        .get(`/api/users/butter_bridge`)
        .expect(200)
        .then(res => {
          expect(res.body.user[0].username).to.equal('butter_bridge');
          expect(res.body.user[0]).to.contain.keys('username', 'avatar_url', 'name');
        });
    });
    it('GET for an invalid username: status 404 and an error message stating no user has been found by that username', () => {
      return request(app)
        .get('/api/users/notValidUsername')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('No user found for username: notValidUsername');
        });
    });
  });
});
