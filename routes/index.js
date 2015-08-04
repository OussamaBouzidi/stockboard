var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = require('../models/user');
// /* GET home page. */

router.get('/users', function(req, res, next) {
  User.find().exec(function(err, users) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Could not retrieve users!"});
    }
    res.json(users);
  })
})

router.get('/users/:id', function(req, res, next) {
  User.findById(req.params.id).exec(function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Could not retrieve user!"});
    }
    res.json(user);
  })
})

// router.patch('/users/:id', function(req, res, next) {
//   User.findById(req.params.id, function(err, user) {
//     user.stockWatch.push(req.body);
//     user.save();
//   })
// })

var StockWatch = mongoose.model("StockWatch", {
  symbol: { type: String }
})

router.post('/users/:id/watches', function() {
  var newWatch = new StockWatch(req.body);
  newWatch.save(function(err, savedWatch) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Validation Failed!" });
    }
    res.json(savedWatch);
  })
})

var StockPurchase = mongoose.model("StockPurchase", {
  name: { type: String },
  symbol: { type: String },
  shares: { type: Number },
  price: { type: Number }
})

router.post('/users/:id/purchases', function(req, res, next) {
  var newPurchase = new StockPurchase(req.body);
  newPurchase.save(function(err, savedPurchase) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Validation Failed!" });
    }
    res.json(savedPurchase);
  })
})

router.get('/currentuser', function(req, res) {
  console.log(req.user);
  res.json(req.user);
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
