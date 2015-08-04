var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = require('../models/user');
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(req.user);
//   if (req.user){
//     var user = new User({
//       displayName: req.user.displayName,
//       email: req.user.emails[0].value
//     });
//     User.findOneAndUpdate({email: req.user.emails }, user, {upsert: true, new: true}, 
//       function(err, savedEntry){
//         if (err) {
//           console.log(err);
//         }
//       console.log("success savedEntry", savedEntry);
//       }
//     );
//   }
//   res.render('index', { thisUserData: req.user });
// });

// router.get('/users/:id', function(req, res) {
//   User.findOne({ displayName: req.params.id }).exec(function(err, user) {
//     if (err) {
//       console.log(err);
//       res.status(400).json({ error: "Could not read user data" });
//     }
//     if (!user) {
//       res.status(404);
//     }
//     res.json(user);
//   });
// })

router.get('/users', function(req, res, next) {
  User.find().exec(function(err, users) {
    console.log('running');
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Could not retrieve users!"});
    }
    res.json(users);
  })
})

router.get('/users/:id', function(req, res, next) {
  User.findOneById({ _id: req.paras.id }).exec(function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Could not retrieve user!"});
    }
    res.json(user);
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
