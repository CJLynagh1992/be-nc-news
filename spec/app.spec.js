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
            expect(res.body.user.username).to.equal('butter_bridge');
            expect(res.body.user).to.contain.keys('username', 'avatar_url', 'name');
          });
      });
      it('GET for an non-existant username: status 400 and an error message stating no user has been found by that username', () => {
        return request(app)
          .get('/api/users/not-Valid-Username')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('No user found for username: not-Valid-Username');
          });
      });
    });
    describe('/articles/:article_id', () => {
      it('GET for an article request: status 200 and returns an article object with all of the required properties', () => {
        return request(app)
          .get(`/api/articles/1`)
          .expect(200)
          .then(res => {
            expect(res.body.article.article_id).to.equal(1);
            expect(res.body.article).to.contain.keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count');
          });
      });
      it('GET for an non-existant article_id: status 404 and an error message stating no article has been found by that article_id', () => {
        return request(app)
          .get(`/api/articles/231242`)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('No article found for article_id: 231242');
          });
      });
      it('GET for an invalid article_id: status 400 and an error message', () => {
        return request(app)
          .get(`/api/articles/2354975394753409571242`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('The article_id is out of range');
          });
      });
      it('PATCH for updating votes property in article passed: status 201 and updates the votes property using the object passed and the updated article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(201)
          .then(res => {
            expect(res.body.article).to.eql({
              title: 'Living in the shadow of a great man',
              topic: 'mitch',
              author: 'butter_bridge',
              body: 'I find this existence challenging',
              created_at: 1542284514171,
              votes: 101
            });
          });
      });
    });
  });
});
