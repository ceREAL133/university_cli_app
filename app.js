const express = require('express');
const path = require('path');
const { questions } = require('./constants');
const mongoose = require('mongoose');

const { questionsRouter } = require('./routes')

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', questionsRouter);
app.use('/employee', questionsRouter)
// app.use('/headOfDept/:dept', );

app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(3000, () => {
    console.log('app listen 3000');
}) 

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/university', { useNewUrlParser: true, useUnifiedTopology: true });
}

function _handleErrors(err, req, res, next) {
    res
      .status(err.status)
      .json({
        message: err.message || 'Unknown error',
        customCode: err.code || '0'
      });
}
  
function _notFoundHandler(err, req, res, next) {
    next({
      status: err.status || 404,
      message: err.message || 'route not found'
    });
}