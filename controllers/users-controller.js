const { fetchUser } = require('../models/user-model');

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(err => next(err));
};
