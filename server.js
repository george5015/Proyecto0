var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views' + '/index.html')
});

app.use(require('./controllers'));

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
