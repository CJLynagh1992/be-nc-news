const topicsRouter = require('express').Router();
const { sendTopics } = require('../controllers/topics-controller');
const { methodNotAllowed } = require('../errors/errorhandler');

topicsRouter
  .route('/')
  .get(sendTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
