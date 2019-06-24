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
  describe('/users/:username', () => {
    it('GET status: 200 and returns an object of the user passed in the url along with the correct properties present', () => {
      return request(app)
        .get(`/api/users/tickle122`)
        .expect(200)
        .then(res => {
          // console.log(res.body.user, '<--');
          expect(res.body.user.username).to.equal('tickle122');
          expect(res.body.user).to.contain.keys('username', 'avatar_url', 'name');
        });
    });
    // it('GET: 400 bad request when requesting an invalid user', () => {
    //   return request(app)
    //     .get('/api/users/rjifberie123')
    //     .expect(400)
    //     .then(res => {
    // //       expect(res.body.msg).to.equal('bad request');
    //     });
    // });
  });
});
