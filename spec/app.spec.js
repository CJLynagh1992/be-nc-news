process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const chaiSorted = require('chai-sorted');
const { expect } = require('chai');
const connection = require('../db/connection');

chai.use(chaiSorted);

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
      it('GET for an invalid route: status 404 and return a message that the route has not been found', () => {
        return request(app)
          .get('/api/tops')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Route not found');
          });
      });
      it('INVALID METHOD status: 405', () => {
        const invalidMethods = ['patch', 'post', 'put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/topics')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('method not allowed');
            });
        });
        return Promise.all(methodPromises);
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
      it('GET for an non-existant username: status 404 and an error message stating no user has been found by that username', () => {
        return request(app)
          .get('/api/users/not-Valid-Username')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('No user found for username: not-Valid-Username');
          });
      });
      it('GET for an invalid route: status 404 and return a message that the route has not been found', () => {
        return request(app)
          .get('/api/user')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Route not found');
          });
      });
      it('INVALID METHOD status: 405', () => {
        const invalidMethods = ['patch', 'post', 'put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/users/:username')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('method not allowed');
            });
        });
        return Promise.all(methodPromises);
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
            expect(res.body.msg).to.equal('The id being passed is out of range');
          });
      });
      it('GET for an invalid article_id: status 400 and an error message', () => {
        return request(app)
          .get(`/api/articles/notanumber`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('the given syntax input is not valid');
          });
      });
      it('PATCH for updating votes property in article passed: status 201 and updates the votes property using the object passed and the updated article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(201)
          .then(res => {
            expect(res.body.article.votes).to.equal(101);
            expect(res.body.article).to.contain.keys('title', 'topic', 'author', 'body', 'created_at', 'votes');
          });
      });
      it('PATCH for updating votes property in article passed: status 400 and returns an arrow stating that inccrement value not passed', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({})
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('increment value has not been given');
          });
      });
      it('PATCH for updating votes property in article passed: status 400 and returns an error ', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 'cat' })
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('the given syntax input is not valid');
          });
      });
      it('GET for an invalid route: status 404 and return a message that the route has not been found', () => {
        return request(app)
          .get('/api/art/2')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Route not found');
          });
      });
      it('PATCH for updating votes property in article passed: status 200 returns the votes modified even if we pass in an extra property on the request body ', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1, name: 'mitch' })
          .expect(201)
          .then(res => {
            expect(res.body.article.votes).to.equal(101);
            expect(res.body.article).to.contain.keys('title', 'topic', 'author', 'body', 'created_at', 'votes');
          });
      });
      it('INVALID METHOD status: 405', () => {
        const invalidMethods = ['post', 'put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/articles/:article_id')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
    describe('/articles/:article_id/comments', () => {
      it('POST for adding a new comment to a specific article: status code 201 and adds a new comment to the article specified', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'butter_bridge', body: 'I am an angry journalist, hear me roar!' })
          .expect(201)
          .then(res => {
            expect(res.body.comment).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body');
          });
      });
      it('POST for adding a new comment to a specific article: status code 400 and returns an error stating that no user has been found by that username', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'butterbean', body: 'I am a fake user!' })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('No user found for that username');
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 200 and defaults to descending order of created_by when not passed a sort_by query or order query', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.sortedBy('created_at', { descending: true });
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 404 and returns an error stating that the article you are looking for does not exist', () => {
        return request(app)
          .get('/api/articles/489487/comments')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('No article found for article_id: 489487');
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 200 and will default to created_by when not passed a sort_by query but sorts ascending if passed order query ascending', () => {
        return request(app)
          .get('/api/articles/1/comments?order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.sortedBy('created_at', { ascending: true });
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 400 and return an error stating that the order you are passing is invalid', () => {
        return request(app)
          .get('/api/articles/1/comments?order=upsidedown')
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('the order you are trying to pass is invalid');
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 200 and will sorted by passed property is valid and order descending by dafult if not passed an order', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=comment_id')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.sortedBy('comment_id', { descending: true });
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 400 and returns an error stating that the sort_by column passed does not exist', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=notValidColumn')
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('the column you are looking for does not exist');
          });
      });
      it('GET for getting an array of comments for a given article_id: status code 200 and will sorted by passed property is valid and order ascending if passed order query ascending', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=comment_id&order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.sortedBy('comment_id', { ascending: true });
          });
      });
      it('GET for an invalid route: status 404 and return a message that the route has not been found', () => {
        return request(app)
          .get('/api/articles/1/comms')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Route not found');
          });
      });
      it('INVALID METHOD status: 405', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/articles/:article_id/comments')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
    describe('/articles', () => {
      it('GET for returning an array of the articles objects: status 200 and return the correct properties and by default sorts by date in descending order', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles).to.be.sortedBy('created_at', { descending: true });
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties and sorts by passed column and date in descending order by default', () => {
        return request(app)
          .get('/api/articles?sort_by=article_id')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles).to.be.sortedBy('article_id', { descending: true });
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties sorted by created_at if not passed a column to sort and in ascending order if passed this', () => {
        return request(app)
          .get('/api/articles?order=asc')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles).to.be.sortedBy('created_at', { ascending: true });
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties sorted by a passed column and in ascending order if passed this', () => {
        return request(app)
          .get('/api/articles?sort_by=article_id&order=asc')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles).to.be.sortedBy('article_id', { ascending: true });
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties and only the articles by that author which is passed in as a username query', () => {
        return request(app)
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles[i].author).to.equal('butter_bridge');
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties and only the articles with the topic passed as a query', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles[i].topic).to.equal('mitch');
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties and only the articles by the passed author and of the passed topic', () => {
        return request(app)
          .get('/api/articles?author=rogersop&topic=mitch')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles[i].topic).to.equal('mitch');
            }
          });
      });
      it('GET for returning an array of the articles objects: status 200 and return the correct properties and only the articles by the passed author and of the passed topic', () => {
        return request(app)
          .get('/api/articles?sort_by=article_id&order=asc&author=rogersop&topic=mitch')
          .expect(200)
          .then(res => {
            for (let i = 0; i < res.body.articles.length; i++) {
              expect(res.body.articles[i]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
              expect(res.body.articles[i].topic).to.equal('mitch');
              expect(res.body.articles).to.be.sortedBy('article_id', { ascending: true });
            }
          });
      });
    });
    describe('/api/comments/:comment_id', () => {
      it('PATCH for updating votes property in comment passed: status 201 and updates the votes property using the object passed and the updated comment', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 1 })
          .expect(201)
          .then(res => {
            expect(res.body.comment.votes).to.equal(17);
          });
      });
      it('PATCH for updating votes property in comment passed: status 400 and returns an error stating that inccrement value not passed', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({})
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('increment value has not been given');
          });
      });
      it('PATCH for updating votes property in comment passed: status 400 and returns an error ', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 'cat' })
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('the given syntax input is not valid');
          });
      });
      it('GET for an invalid route: status 404 and return a message that the route has not been found', () => {
        return request(app)
          .get('/api/comms/2')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Route not found');
          });
      });
      it('PATCH for updating votes property in comment passed: status 200 returns the votes modified even if we pass in an extra property on the request body ', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 1, name: 'jamesMoar' })
          .expect(201)
          .then(res => {
            expect(res.body.comment.votes).to.equal(17);
            expect(res.body.comment).to.contain.keys('comment_id', 'author', 'article_id', 'body', 'created_at', 'votes');
          });
      });
      it('INVALID METHOD status: 405', () => {
        const invalidMethods = ['post', 'put', 'get'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/comments/:comments_id')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
    describe('/api/comments/comment:id', () => {
      it('DELETE the relevant comment by ID passed in: Status 204 and will return a message stating that comment has successfully been deleted', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204);
      });
      it('DELETE for an non-existant comment_id: status 404 and an error message stating no comment has been found by that comment_id', () => {
        return request(app)
          .delete(`/api/comments/231242`)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('No comment found for comment_id: 231242');
          });
      });
      it('DELETE for an non-existant comment_id: status 400 and an error message stating that the comment_id passed is out of range', () => {
        return request(app)
          .delete(`/api/comments/231243985759873589738972`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('The id being passed is out of range');
          });
      });
    });
  });
});
