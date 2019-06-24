exports.formatDate = list => {
  if (list.length === 0) return [];
  return list.map(time => {
    time.created_at = new Date(time.created_at);
    return time;
  });
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
