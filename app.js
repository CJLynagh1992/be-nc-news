const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

// handleSQLErrors
app.use((err, req, res, next) => {
  res.status(404).send({ msg: 'No user found for username: notValidUsername' });
});

module.exports = app;
