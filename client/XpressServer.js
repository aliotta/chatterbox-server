var express = require("express");
var path = require("path")
var app = express();
var cors = require('cors')
var returnObject={};
var UrlParser = require('url');
returnObject.results=[];

app.use(cors());

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use("/styles", express.static(__dirname + '/styles/'));
// will match request to the root
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
  


  // console.log("answer!!!"+returnObject);
  // var parsed = UrlParser.parse(req.url).pathname;
  //   //console.log("Serving request type " + request.method + " for url " + request.url);

  //   if(!returnObject.hasOwnProperty(parsed)){
  
  //     statusCode=404;
  //   } else {
  //     statusCode = 200;
  //   }
  //   res.contentType('application/json');
 
  //   res.send(JSON.stringify(returnObject));


});


// will match requests to /about
app.get('/bower_components/jquery/dist/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/bower_components/jquery/dist/jquery.js'));
});

app.get('/bower_components/underscore/underscore.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/bower_components/underscore/underscore.js'));
});

app.get('/scripts/app.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/scripts/app.js'));
});

// will match request to /random.text
app.get('/classes/messages/', function (req, res) {

    console.log("answer!!!"+returnObject);
  var parsed = UrlParser.parse(req.url).pathname;
    //console.log("Serving request type " + request.method + " for url " + request.url);

    if(!returnObject.hasOwnProperty(parsed)){
  
      statusCode=404;
    } else {
      statusCode = 200;
    }
    res.contentType('application/json');
 
    res.send(JSON.stringify(returnObject));
  
});

app.post('/classes/messages', function (req, res) {
  var body = '';
   
  req.on("data", function(data){
    body += data.toString();
  });
  req.on("end", function(){
    console.log(body)
    returnObject.results.push(JSON.parse(body));

    res.send(JSON.stringify(returnObject));
  });
  //res.send('Got a POST request');
});

app.get("/*", function(req, res){

  res.send("Sorry that route is not implemented yet.");
  
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(server.address())

})