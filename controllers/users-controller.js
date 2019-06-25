const { fetchUser } = require('../models/user-model');

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then(user => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `No user found for username: ${username}`
        });
      }
      res.status(200).send({ user });
    })
    .catch(err => {
      next(err);
    });
};
