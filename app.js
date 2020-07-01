var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);


var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todos');

const mongoose = require('mongoose');


const url = 'mongodb://localhost/TodoDB';
const connect = mongoose.connect( process.env.MONGODB_URI || url, {useNewUrlParser:true, useUnifiedTopology: true});
var cors = require('cors')

connect.then((db) => {

    console.log('Connected correctly to server');
}, (err) => { console.log(err); });


var app = express();
app.use(cors({origin:"http://localhost:3000"}))

// view engine setup

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

// passport configuration
require("./config/passport")(passport);
// passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', usersRouter);
app.use('/api/todos', todoRouter);



// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
