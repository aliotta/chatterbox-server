// var express = require('express');
// var app = express().createServer();

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log(port)
//   console.log(host)
//   console.log('Example app listening at http://%s:%s', host, port);
// });
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));


var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World yeah');
})

app.post('/',function(req,res){
  var simon = "I like millions of dollars"
  console.log(simon);
  res.end("yes");
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(server.address())

})

// // accept POST request on the homepage
// app.post('/', function (req, res) {
//   res.send('Got a POST request');
// });

// // accept PUT request at /user
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user');
// });

// // accept DELETE request at /user
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user');
// });