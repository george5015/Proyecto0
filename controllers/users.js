var util = require('../lib/util.js');

module.exports = (app, db) => {

  app.post('/users/login',  util.sessionChecker,(req, res) => {
    var username = req.body.username,
    password = req.body.password;
    console.log(req.body);
    db.users.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        res.redirect('/');
      } else if (!user.validPassword(password)) {
        res.redirect('/');
      } else {
        req.session.user = user.dataValues.username;
        req.session.userId = user.dataValues.id;
        return res.redirect("/events");
      }
    });
  })

  app.get('/users/register', util.sessionChecker, (req, res) => {
    res.render('register');
  })

  app.post('/users/register', (req, res) => {
    db.users.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    })
    .then(user => {
      req.session.user = user.dataValues.username;
      res.redirect('/login');
    })
    .catch(error => {
      console.log("error", error)
    });
  })

  app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    }
});
}
