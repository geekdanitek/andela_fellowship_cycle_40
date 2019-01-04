const express = require('express');
const bodyParser = require('body-parser');
const meetupRoutes = require('./routes/meetupRt');
const questionRoutes = require('./routes/questionRt');

let port = process.env.PORT || (process.argv[2] || 5000);
port = (typeof port === 'number') ? port : 5000;


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1', questionRoutes);
app.use('/api/v1', meetupRoutes);

if (process.env.NODE_ENV === 'test') {
  port = 4000;
}

app.listen(port);

module.exports = app;
