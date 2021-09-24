const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { employeeRouter, questionsRouter } = require('./routes');
const { Option } = require('./inquirerQuestion');
const { constant } = require('./constants');
const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/questions', questionsRouter);
app.use('/employee', employeeRouter)

app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(constant.PORT, async () => {
    console.log(`app listen ${constant.PORT}`);
    Option.chooseOptionAndGetResponse();
}) 


function _mongooseConnector() {
    mongoose.connect(constant.DB_TABLE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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
      message: err.message || 'Route not found'
    });
}