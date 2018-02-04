var express = require('express')
  , router = express.Router()
var util = require('../lib/util.js');
var User = require('../models/user');

router.post('/login',  util.sessionChecker,(req, res) => {
  console.log("lo que llega", req.body)
  var username = req.body.username,
      password = req.body.password;

  User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
          console.log("no encuentra usuario")
      } else if (!user.validPassword(password)) {
          console.log("password no valido")
      } else {
        console.log("llega donde es")
          req.session.user = user.dataValues;
          res.redirect('/dashboard');
      }
  });
})

router.get('/register', util.sessionChecker, (req, res) => {
  console.log("llega")
  res.sendFile(__basedir + '/views/register.html');
})

router.post('/register', (req, res) => {
  User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        })
        .then(user => {
          console.log("llega al then")
            req.session.user = user.dataValues;
            res.sendStatus(200);
        })
        .catch(error => {
            console.log("error", error)
        });
})

module.exports = router
