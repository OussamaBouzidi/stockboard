var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Twit = require('twit'),
    speak = require('speakeasy-nlp');
    trackArray = ['@google'];

// var unirest = require('unirest');

// unirest.get("https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=att+steals+from+their+customers")
//   .header("X-Mashape-Key", "tais7594TAtaisTA")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     console.log(result.status, result.headers, result.body);
//   });

// unirest.get("https://jamiembrown-tweet-sentiment-analysis.p.mashape.com/api/?key=91746f2e959bbe85bb1900adc45aa7746fadd0b8&text=I+love+Mashape")
//   .header("X-Mashape-Key", "fFCxe7CAaMmsh9LOBd1myXTyN2xOp1qJkmyjsnkRC2NbUKBlia")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     console.log(result.status, result.headers, result.body);
//   });


var T = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = T.stream('statuses/filter', {
  track: trackArray
});
stream.on('tweet', function(tweet){
 console.log(tweet.text);
});

// router.post('/:toTrack', function(req, res, next){
//   console.log(req.params.toTrack);
//   var toTrack = req.params.toTrack;
//   trackArray.push(req.params.toTrack);
//   res.end();
// });

router.get('/', function(req, res){
  console.log("I exist!")
});

module.exports = router;
