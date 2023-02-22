var express = require('express')
var app = express()
var con = require("./database.js")
var nodemailer = require('nodemailer');
// const PaytmChecksum = require('./Paytmchecksum.js');
const request = require('request');

let number = 1

const random_number = Math.floor(Math.random() * 1000) + 1;

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
  to: 'rodyrahi126@gmail.com  , rprishavpal1234@gmail.com',
  subject: 'Someone registred' ,
  text: 
  `'${data.name}' has registred
    link : https://kalyugkakurukshetra.hellosugar.io/${random_number}
  
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    number+=1
  }
}); 
console.log(data.category);
if (data.c4 === 'Audiance') {
  res.render('paymentaudi')
}
else{
  res.render('paymentpart')

}

})

app.get(`/${random_number}`, function (req, res) {

  con.query(
    `SELECT * FROM particepents`,
    function (err, result, fields) {
      console.log(result[0]['name']);
  res.render('dashboard' , {
    data : result,
  
  })
});
})

app.post('/payed', function (req, res) {
   let data = req.body
   console.log(data);
   con.query(
    `UPDATE particepents
    SET payment = 'ok'
    WHERE name = '${data.name}' AND number = '${data.number}' AND mail ='${data.mail}'`
    ,
    function (err, result, ) {
      if (err) {
        console.log(err);
      }
      else{
        con.query(
          `SELECT * FROM particepents WHERE number=${data.number}`,
          function (err, result, fields) {
            console.log(result[0]['name']);
    
        sendmail(data , result[0]['id']  )
          })
      }
});
   res.redirect('/' + random_number)
  })

app.get('/payment', function (req, res) {



  res.render('payment')
  })





  function sendmail(user , num) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kalyugkakurukshetra@gmail.com',
        pass: 'iatbmdzbmzwjfbcg'
      }
    });
    
    var mailOptions = {
      from: 'kalyugkakurukshetra@gmail.com',
      to: user.mail,
      subject: 'Hello there ' + user.name + ', Thank You for Registering for "Kalyug Ka Kurukshetra" Event on 2nd April',
      text: 
      
      `
      Dear '${user.name}',

      we would like to extend my sincere thanks 
      for registering for our upcoming event 
      "Kalyug Ka Kurukshetra" on 2nd April 
      on our website. 
      
      We appreciate your participation and look 
      forward to welcoming you to the event.
      
      As per your registration details, we have 
      received your phone number, which will 
      help us keep you informed about the event's 
      latest updates and necessary details. 
      We will also be requiring the 
      
      screenshot of your payment to 
      confirm your registration. 

      
      Your registration number is --  000${num}, 

      Thank you again for registering, 
      and please do not hesitate to contact us 
      if you have any questions or concerns.
      
      Best regards,
      
      D-GANG
      `
    };



    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {



        console.log('Email sent: ' + info.response);
        var sql =
        `UPDATE particepents
        SET registrationno = 000${num} 
        WHERE  number= '${user.number}' AND mail= '${user.mail}'`

    
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });


        number+=1
      }
    }); 
  }
app.listen(3030)
