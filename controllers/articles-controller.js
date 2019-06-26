const { fetchArticle, updatedVotes, addComment, fetchComments } = require('../models/article-model');

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
  const desiredUpdateTotal = req.body.inc_votes;
  const { article_id } = req.params;
  if (!desiredUpdateTotal) {
    return Promise.reject({
      status: 400,
      msg: 'increment value has not been given'
    }).catch(err => next(err));
  }
  updatedVotes(article_id, desiredUpdateTotal)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(err => next(err));
};

exports.postComment = (req, res, next) => {
  const commentToAdd = req.body;
  const { article_id } = req.params;
  const { username, ...restOfComment } = commentToAdd;
  const newComment = { ...restOfComment };
  newComment.author = username;
  newComment.article_id = article_id;
  addComment(newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => next(err));
};

exports.sendComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchComments(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => next(err));
};
