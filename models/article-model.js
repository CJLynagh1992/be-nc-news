const connection = require('../db/connection');

exports.fetchArticle = article_id => {
  return connection
    .first('*')
    .from('articles')
    .where('article_id', article_id);
};
