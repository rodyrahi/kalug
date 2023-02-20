var express = require('express')
var app = express()


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('home')
})
app.get('/register', function (req, res) {
  res.render('resgister')
})
app.listen(3000)
