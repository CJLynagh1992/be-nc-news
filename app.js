const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
});

app.use((err, req, res, next) => {
  const psqlCodes = ['22003'];
  if (psqlCodes.includes(err.code)) res.status(400).send({ msg: 'The article_id is out of range' });
});

module.exports = app;
