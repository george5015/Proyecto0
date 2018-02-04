var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var path = require('path');
var util = require('./lib/util.js');
var router = express.Router();

global.__basedir = __dirname;

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.use(require('./controllers'));

app.get('/', util.sessionChecker,(req, res) => {
  res.sendFile(__dirname + '/views' + '/login.html')
});



app.listen(8080, function () {
console.log('Example app listening on port 8080!');
});
