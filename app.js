var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayout = require("express-ejs-layouts");
//import koneksi database
const database = require('./config/database');
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');

var app = express();

// config password
require("./config/passport")(passport);
// cek koneksi 
database.connection.on("error",
 console.error.bind(console,"Mongodb Connection Error"));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.use(expressLayout);
app.set('view engine', 'ejs');

// express body parser
app.use(express.urlencoded({extended:true}));


// expess session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

//password midleware
app.use(passport.initialize());
app.use(passport.session());

  //conccec flash
  app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//global var
app.use(function(req,res,next){
  res.locals.error = req.flash("error");
  next();
})
app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
// });

module.exports = app;
