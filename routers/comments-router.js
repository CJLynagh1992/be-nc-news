const commentsRouter = require('express').Router();
const { updateCommentVotes, removeComment } = require('../controllers/comment-controller');
const { methodNotAllowed } = require('../errors/errorhandler');

commentsRouter
  .route('/:comment_id')
  .patch(updateCommentVotes)
  .delete(removeComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
