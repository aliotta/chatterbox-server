/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/

//curl -X POST http://127.0.0.1:3000
var returnObject = {
 '/':[],
 'results':[]
};

var UrlParser = require("url");


//returnObject.results = [];
var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  

  // The outgoing status.

  var headers = defaultCorsHeaders;
  if(request.method === "GET"){
  var parsed = UrlParser.parse(request.url).pathname;
    //console.log("Serving request type " + request.method + " for url " + request.url);

    if(!returnObject.hasOwnProperty(parsed)){
  
      statusCode=404;
    } else {
      statusCode = 200;
    }
  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
    
    headers['Content-Type'] = "application/JSON";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(returnObject));
    
  } else if (request.method === "POST"){
    returnObject[request.url]=true;
    headers['Content-Type'] = "text/plain";
    statusCode = 201;
    var body = ''
   
    request.on("data", function(data){
      body += data.toString();
    });
    request.on("end", function(){
      
      returnObject.results.push(JSON.parse(body));
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(returnObject));
    })

  } else if (request.method === 'OPTIONS'){
      //var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
     
     
      response.writeHead(200, defaultCorsHeaders);
      response.end();
  
   

   }

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  
  
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
    
  
  };


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;