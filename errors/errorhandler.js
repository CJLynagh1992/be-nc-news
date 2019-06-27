exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlCodes = ['22003'];
  const psqlCodes1 = ['22P02'];
  const psqlCodes2 = ['42703'];
  const psqlCodes3 = ['23503'];
  if (psqlCodes.includes(err.code)) res.status(400).send({ msg: 'The id being passed is out of range' });
  if (psqlCodes1.includes(err.code)) res.status(400).send({ msg: 'the given syntax input is not valid' });
  if (psqlCodes2.includes(err.code)) res.status(400).send({ msg: 'the column you are looking for does not exist' });
  if (psqlCodes3.includes(err.code)) res.status(404).send({ msg: 'No user found for that username' });
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'method not allowed' });
};
