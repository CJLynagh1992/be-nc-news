exports.formatDate = list => {
  if (list.length === 0) return [];
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
  return comments.map(commentsCheck => {
    if (!articleRef) {
      return commentsCheck;
    } else {
      const key = commentsCheck.created_by;
      commentsCheck.author = articleRef[key];
      delete commentsCheck.created_by;
      return commentsCheck;
    }
  });
};
