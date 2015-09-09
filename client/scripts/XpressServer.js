var express = require("express");
var path = require("path")
var app = express();

// will match request to the root
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./client/index.html'));
});

// will match requests to /about
app.get('/about', function (req, res) {
  res.send('<h1>chatterbox</h1>');
});

// will match request to /random.text
app.get('/random.text', function (req, res) {
  res.sendFile('/Users/student/Desktop/2015-08-chatterbox-server/client');
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(server.address())

})