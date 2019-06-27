const articlesRouter = require('express').Router();
const { sendArticle, updateArticleVotes, postComment, sendComments, sendAllArticles } = require('../controllers/articles-controller');
const { methodNotAllowed } = require('../errors/errorhandler');

articlesRouter
  .route('/')
  .get(sendAllArticles)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id')
  .get(sendArticle)
  .patch(updateArticleVotes)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(sendComments)
  .all(methodNotAllowed);

module.exports = articlesRouter;
