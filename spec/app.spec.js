// process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
// const chai = require('chai');
// const chaiSorted = require('chai-sorted');
const { expect } = require('chai');
const connection = require('../db/connection');

// chai.use(chaiSorted);

describe('/api', () => {
  after(() => connection.destroy());
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
});
