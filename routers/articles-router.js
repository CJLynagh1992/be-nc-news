const articlesRouter = require('express').Router();
const { sendArticle } = require('../controllers/articles-controller');

articlesRouter.route('/:article_id').get(sendArticle);

module.exports = articlesRouter;
