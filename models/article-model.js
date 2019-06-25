const connection = require('../db/connection');

exports.fetchArticle = article_id => {
  return connection
    .first('articles.*')
    .from('articles')
    .join('comments', 'articles.article_id', '=', 'comments.article_id')
    .where({
      'articles.article_id': article_id
    })
    .count('comments.comment_id as comment_count')
    .groupBy('articles.article_id', 'comments.article_id');
};
