const apiRouter = require('express').Router();
const topicsRouter = require('./topics-router');
const articlesRouter = require('./articles-router');
const usersRouter = require('./users-router');
const commentsRouter = require('./comments-router');
const { methodNotAllowed } = require('../errors/errorhandler');
const endpoints = require('../endpoints.json');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter
  .route('/')
  .get((req, res) => res.status(200).send(endpoints))
  .all(methodNotAllowed);

module.exports = apiRouter;
