const articlesRouter = require('express').Router();
const { sendArticle, updateArticleVotes } = require('../controllers/articles-controller');

articlesRouter
  .route('/:article_id')
  .get(sendArticle)
  .patch(updateArticleVotes);

module.exports = articlesRouter;
