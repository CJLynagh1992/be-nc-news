const connection = require('../db/connection');

exports.updatedCommentVotes = (comment_id, desiredUpdateTotal) => {
  return connection
    .first('*')
    .from('comments')
    .where('comment_id', '=', comment_id)
    .increment({ votes: desiredUpdateTotal })
    .returning('*')
    .then(([comment]) => comment);
};
