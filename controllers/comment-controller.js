const { updatedCommentVotes } = require('../models/comment-model');

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
