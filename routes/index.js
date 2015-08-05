var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = require('../models/user');
// /* GET home page. */

router.get('/users', function(req, res, next) {
  console.log('/users');
  User.find().exec(function(err, users) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Could not retrieve users!"});
    }
    res.json(users);
  })
})

router.get('/users/:id', function(req, res, next) {
  console.log('/users/:id');
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
//     if (req.body.shares) {
//       user.stocksPurchased.push(req.body);
//     } else {
//       user.stockWatch.push(req.body);
//     }
//     user.save();
//   })
// })

var StockToWatch = mongoose.model("StockWatch", {
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  user: { type: String, required: true }
})

router.get('/watches', function(req, res, next) {
  StockToWatch.find().exec(function(err, userStocksToWatch) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve user stocks to watch." })
    }
    res.json(userStocksToWatch)
  })
})

router.post('/watches', function(req, res, next) {
  var newWatch = new StockToWatch(req.body);
  newWatch.save(function(err, savedStockToWatch) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Validation Failed!" });
    }
    res.json(savedStockToWatch);
  })
})

var StockPurchase = mongoose.model("StockPurchase", {
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  priceBought: { type: Number, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true }
})

router.get('/purchases', function(req, res, next) {
  StockPurchase.find().exec(function(err, purchases) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve user stocks to purchase." })
    }
    res.json(purchases)
  })
})

router.post('/purchases', function(req, res, next) {
  var newPurchase = new StockPurchase(req.body);
  newPurchase.save(function(err, savedPurchase) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Validation Failed!" });
    }
    res.json(savedPurchase);
  })
})

router.get('/purchases/:id', function(req, res, next) {
  StockPurchase.findById(req.params.id, function(err, purchase) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not read purchase data" });
    }
    if (!purchase) {
      res.status(404);
    }
    res.json(purchase);
  })
})

router.delete('/purchases/:id', function(req, res) {
  StockPurchase.findOneAndRemove({ _id: req.params.id }).exec(function(err, purchase) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not read purchased data" });
    }
    if (!purchase) {
      res.status(404);
    }
    res.json({message: 'purchase deleted'});
  });
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
