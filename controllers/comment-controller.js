const { updatedCommentVotes, deleteComment } = require('../models/comment-model');
const { checkExists } = require('../models/article-model');

exports.updateCommentVotes = (req, res, next) => {
  const desiredUpdateTotal = req.body.inc_votes;
  const { comment_id } = req.params;

  updatedCommentVotes(comment_id, desiredUpdateTotal)
    .then(comment => {
      const commentExists = comment_id ? checkExists(comment_id, 'comments', 'comment_id') : null;
      return Promise.all([commentExists, comment]);
    })
    .then(([commentExists, comment]) => {
      if (commentExists === false)
        return Promise.reject({
          status: 404,
          msg: 'The comment_id passed does not exist'
        });
      else res.status(200).send({ comment });
    })
    .catch(next);
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
