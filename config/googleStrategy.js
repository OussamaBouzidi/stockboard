'use strict';
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

module.exports = function(passport) {
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true},
    function(req, accessToken, refreshToken, profile, done){
      User.findOne({ email: profile.emails[0].value }, function(error, user) {
        if (!user) {
          User.create({
            displayName: profile.displayName,
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
};
