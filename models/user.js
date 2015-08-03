'use strict';

module.exports = function() {
  var User = mongoose.model("User", {
    displayName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true, dropDups: true } },
    stockPurchases: Array,
    stockWatch: Array
  });
}
