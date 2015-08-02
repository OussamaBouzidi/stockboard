'use strict';
var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Twitter profile is serialized
//   and deserialized.
module.exports = function() {

  // Use the TwitterStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a token, tokenSecret, and Twitter profile), and
  //   invoke a callback with a user object.
  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log(profile);
        var user = {};
        user.displayName = profile.displayName;
        user.image = profile._json.profile_image_url;
        
        user.twitter = {};
        user.twitter.id = profile.id;
        user.twitter.token = token;
        // To keep the example simple, the user's Twitter profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Twitter account with a user record in your database,
        // and return that user instead.
        return done(null, user);
      });
    }
  ));
};
