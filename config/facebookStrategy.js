'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

module.exports = function() {
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email','photos', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log(profile);
        var user = {};
        user.email = profile.emails[0].value;
        user.image = profile.photos[0].value;
        user.displayName = profile.displayName;

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;
        // To keep the example simple, the user's Facebook profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Facebook account with a user record in your database,
        // and return that user instead.
        return done(null, user);
      });
    }
  ));
};
