var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var path = require('path');
var util = require('./lib/util.js');
var router = require('./controllers/index');
var db = require('./config/db.js');
var morgan = require('morgan');

global.__basedir = __dirname;

app.set('views', __dirname + '\\views');
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(morgan('dev'));

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 100000000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

router(app, db);

app.get('/', util.sessionChecker,(req, res) => {
  res.render('login')
});

db.sequelize.authenticate().then(() => {
  db.sequelize.sync().then(() => {
    app.listen(8080, () => {
      console.log('Express listening on port:', 8080);
    });
  })
}).catch((err) => {
  console.log(err);
});
