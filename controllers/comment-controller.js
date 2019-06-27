const { updatedCommentVotes, deleteComment } = require('../models/comment-model');

exports.updateCommentVotes = (req, res, next) => {
  const desiredUpdateTotal = req.body.inc_votes;
  const { comment_id } = req.params;
  if (!desiredUpdateTotal) {
    next({
      status: 400,
      msg: 'increment value has not been given'
    });
  } else {
    updatedCommentVotes(comment_id, desiredUpdateTotal)
      .then(comment => {
        res.status(201).send({ comment });
      })
      .catch(err => next(err));
  }
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(deleted => {
      if (!deleted) next({ status: 404, msg: `No comment found for comment_id: ${comment_id}` });
      if (deleted) res.sendStatus(204);
    })
    .catch(err => next(err));
};
