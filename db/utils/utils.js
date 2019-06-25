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
    const { created_by, created_at, belongs_to, ...restOfComment } = comment;
    const newObj = { ...restOfComment };
    newObj.author = created_by;
    newObj.article_id = articleRef[belongs_to];
    newObj.created_at = new Date(created_at);
    return newObj;
  });
};
