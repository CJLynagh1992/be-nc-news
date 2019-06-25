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

exports.updatedVotes = (article_id, desiredUpdateTotal) => {
  console.log(article_id, desiredUpdateTotal);
  return connection
    .select('*')
    .from('articles')
    .where('article_id', '=', article_id)
    .increment({ votes: { desiredUpdateTotal } })
    .returning('*');
};

// exports.updateTreasure = (cost_at_auction, treasure_id) => {
//   return (
//     connection
//       // .select('*')
//       // .from('treasures')
//       .where('treasure_id', '=', treasure_id)
//       .into('treasures')
//       .update('cost_at_auction', cost_at_auction)
//       .returning('*')

//       })
//   );
// };
