var express = require('express')
var app = express()
var con = require("./database.js")
const PaytmChecksum = require('./Paytmchecksum.js');
const request = require('request');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('home')
})
app.get('/register', function (req, res) {
  res.render('resgister')

})


app.post('/', function (req, res) {
  let data = req.body;

})



app.post('/payment-link', (req, res) => {
  const https = require('https');

  /*
  * import checksum generation utility
  * You can get this utility from https://developer.paytm.com/docs/checksum/
  */
  
  
  var paytmParams = {};
  
  paytmParams.body = {
      "mid"             : "ljGymk34155480256277",
      "linkType"        : "GENERIC",
      "linkDescription" : "Test Payment",
      "linkName"        : "Test",
  };
  
  /*
  * Generate checksum by parameters we have in body
  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
  */
  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "66").then(function(checksum){
  
      paytmParams.head = {
          "tokenType"   : "AES",
          "signature"   : checksum
      };
  
      var post_data = JSON.stringify(paytmParams);
  
      var options = {
  
          /* for Staging */
          hostname: 'securegw.paytm.in',
  
          /* for Production */
          // hostname: 'securegw.paytm.in',
  
          port: 443,
          path: '/link/create',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
          }
      };
  
      var response = "";
      var post_req = https.request(options, function(post_res) {
          post_res.on('data', function (chunk) {
              response += chunk;
          });
  
          post_res.on('end', function(){
              console.log('Response: ', response);
          });
      });
  
      post_req.write(post_data);
      post_req.end();
  });
  
  
});


app.listen(3030)
