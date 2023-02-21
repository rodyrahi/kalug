var express = require('express')
var app = express()
var con = require("./database.js")
// const PaytmChecksum = require('./Paytmchecksum.js');
const request = require('request');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('home')
})
app.get('/register', function (req, res) {
  res.render('resgister')

})


app.post('/', function (req, res) {
  let data = req.body;

  
  console.log(data);
  var payment = "no"
  var sql =
  "INSERT INTO particepents (name , gender , age ,category , mail , number , city ,payment ) VALUES ?";
var values = [
  [
    data.name,
    data.gender,
    data.age,
    String(data.c4),
    data.mail,
    data.number,
    data.city,
    payment,
  ],
];
con.query(sql, [values], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});

})

app.get('/register', function (req, res) {
  res.render('resgister')

})



app.listen(3030)
