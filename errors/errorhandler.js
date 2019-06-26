exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'method not allowed' });
};
