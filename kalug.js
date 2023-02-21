var express = require('express')
var app = express()
var con = require("./database.js")
var nodemailer = require('nodemailer');
// const PaytmChecksum = require('./Paytmchecksum.js');
const request = require('request');

let number = 0000

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

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kalyugkakurukshetra@gmail.com',
    pass: 'iatbmdzbmzwjfbcg'
  }
});

var mailOptions = {
  from: 'kalyugkakurukshetra@gmail.com',
  to: data.mail,
  subject: 'Hello there' + data.name ,
  text: 'Thanks for registring in kalyugkakuruksehtra Your id is '+number
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    number+=1
  }
}); 

res.render('payment')
})

app.get('/mail', function (req, res) {




  

})

app.get('/payment', function (req, res) {
  res.render('payment')
  })

app.listen(3030)
