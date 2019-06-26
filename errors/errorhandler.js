exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlCodes = ['22003'];
  if (psqlCodes.includes(err.code)) res.status(400).send({ msg: 'The article_id is out of range' });
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'method not allowed' });
};
