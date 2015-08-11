var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var auth = require('./routes/auth');
var sentiment = require('./routes/sentimentAnalysis');

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/stockboard');

var User = require('./models/user');
// var google = require('./config/googleStrategy')();

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: 'http://stockboard-stanley.herokuapp.com/auth/google/callback',
  callbackURL: (process.env.CALLBACK || 'http://localhost:3000/auth/google/callback'),
  passReqToCallback: true},
  function(req, accessToken, refreshToken, profile, done){
    User.findOne({ email: profile.emails[0].value }, function(error, user) {
      if (!user) {
        User.create({
          displayName: profile.displayName,
          pictureUrl: profile.photos[0].value,
          email: profile.emails[0].value
        }, function(error, newUser) {
          done(null, newUser);
        })
      } else {
        done(null, user);
      }
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(id, done) {
  done(null, id);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: process.env.STOCKBOARD_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
