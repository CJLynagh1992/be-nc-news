const { fetchArticle, updatedVotes } = require('../models/article-model');

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`
        });
      }
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};

exports.updateArticleVotes = (req, res, next) => {
  const desiredUpdateTotal = req.body;
  const { article_id } = req.params;
  updatedVotes(article_id, desiredUpdateTotal)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(err => next(err));
};
