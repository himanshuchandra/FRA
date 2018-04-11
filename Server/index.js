'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mfavicon=require("express-favicon");
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');

const app = express();

app.use(function(request,response,next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Accept-Ranges", "bytes");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Ranges, Content-Length, Content-Range");
    next();
});



const analyzer = require('./analyzer');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(busboy());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(busboyBodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mfavicon(__dirname + '/public/favicon.icon'));


app.use('/analyzer',analyzer);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
//   res.render('error');
});

module.exports = app;

app.listen(1234,function(){
    console.log("Server listening at port 1234..");
})

