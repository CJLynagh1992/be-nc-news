const commentsRouter = require('express').Router();
const { updateCommentVotes } = require('../controllers/comment-controller');
const { methodNotAllowed } = require('../errors/errorhandler');

commentsRouter
  .route('/:comment_id')
  .patch(updateCommentVotes)
  .all(methodNotAllowed);

module.exports = commentsRouter;
