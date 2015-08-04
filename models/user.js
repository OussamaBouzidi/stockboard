'use strict';
var mongoose = require('mongoose');

var User = mongoose.model("User", {
  displayName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true, dropDups: true } },
  pictureUrl: { type: String }
});

module.exports = mongoose.model('User', User);
