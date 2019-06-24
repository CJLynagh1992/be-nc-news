exports.formatDate = list => {
  return list.map(time => {
    time.created_at = new Date(time.created_at);
    return time;
  });
};

exports.makeRefObj = list => {
  return list.reduce((acc, cur) => {
    acc[cur.title] = cur.article_id;
    return acc;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    comment.article_id = articleRef[comment.belongs_to];
    delete comment.belongs_to;
    comment.created_at = new Date(comment.created_at);
    return comment;
  });
};
