const articlesRouter = require('express').Router();
const { sendArticle, updateArticleVotes, postComment } = require('../controllers/articles-controller');

articlesRouter
  .route('/:article_id')
  .get(sendArticle)
  .patch(updateArticleVotes);

articlesRouter.route('/:article_id/comments').post(postComment);

module.exports = articlesRouter;
