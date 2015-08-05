'use strict';
var mongoose = require('mongoose');

var User = mongoose.model("User", {
  displayName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true, dropDups: true } },
  pictureUrl: { type: String },
  stocksWatched: [{
    name: { type: String, required: true },
    symbol: { type: String, required: true }
  }],
  stocksPurchased: [{
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    shares: { type: Number, required: true },
    priceBought: { type: Number, required: true },
    status: { type: Boolean, required: true }
  }]
});

module.exports = mongoose.model('User', User);
