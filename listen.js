const app = require('./app.js');

// const PORT = process.env.NODE_ENV || 9090;

// app.listen(PORT, () => {
//   console.log(`listening on the designated port, namely ${PORT}`);
// });

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
