var express = require('express')
var app = express()
var con = require("./database.js")
var nodemailer = require('nodemailer');
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
res.render('payment')
})

app.get('/mail', function (req, res) {



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rodyrahi126@gmail.com',
    pass: 'etqopjtrifhcplkr'
  }
});

var mailOptions = {
  from: 'rodyrahi126@gmail.com',
  to: 'rajvendrarahi126@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 

  

})

app.get('/payment', function (req, res) {
  res.render('payment')
  })

app.listen(3030)
