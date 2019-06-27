const { fetchArticle, updatedVotes, addComment, fetchComments, fetchArticles, checkExists } = require('../models/article-model');

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
  updatedVotes(article_id, desiredUpdateTotal)
    .then(article => {
      res.status(200).send({ article });
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
      if (!newComment.author || !newComment.body)
        return Promise.reject({
          status: 400,
          msg: 'Missing property in sent object'
        });
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
        const articleExists = article_id ? checkExists(article_id, 'articles', 'article_id') : null;
        return Promise.all([articleExists, comments]);
      })
      .then(([articleExists, comments]) => {
        if (articleExists === false) return Promise.reject({ status: 404, msg: 'The article passed does not exist' });
        else res.status(200).send({ comments });
      })
      .catch(err => next(err));
  }
};

exports.sendAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(sort_by, order, author, topic)
    .then(articles => {
      const authorExists = author ? checkExists(author, 'users', 'username') : null;
      const topicExists = topic ? checkExists(topic, 'topics', 'slug') : null;
      return Promise.all([authorExists, topicExists, articles]);
    })
    .then(([authorExists, topicExists, articles]) => {
      if (authorExists === false) return Promise.reject({ status: 404, msg: 'the passed author does not exist' });
      else if (topicExists === false) return Promise.reject({ status: 404, msg: 'the passed topic does not exist' });
      else res.status(200).send({ articles });
    })
    .catch(err => next(err));
};
