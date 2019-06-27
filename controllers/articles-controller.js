const { fetchArticle, updatedVotes, addComment, fetchComments, fetchArticles } = require('../models/article-model');

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
    next({
      status: 400,
      msg: 'increment value has not been given'
    });
  } else {
    updatedVotes(article_id, desiredUpdateTotal)
      .then(article => {
        res.status(201).send({ article });
      })
      .catch(err => next(err));
  }
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
  if (req.query.order !== 'asc' && req.query.order !== 'desc' && req.query.order !== undefined) {
    next({ status: 400, msg: 'the order you are trying to pass is invalid' });
  } else {
    fetchComments(article_id, req.query)
      .then(comments => {
        if (!comments.length) {
          return fetchArticle(article_id);
        } else {
          res.status(200).send({ comments });
        }
      })
      .then(article => {
        if (!article) {
          return Promise.reject({
            status: 404,
            msg: `No article found for article_id: ${article_id}`
          });
        } else res.status(200).send({ comment: [] });
      })
      .catch(err => next(err));
  }
};

exports.sendAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => next(err));
};
