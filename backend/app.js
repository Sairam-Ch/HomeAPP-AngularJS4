//Dependencies
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongo_store = require("connect-mongo");
var conf =  require('./conf.js');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');


//connect to MongoDB
var MongoClient = require('mongodb').MongoClient;
var url =conf.database.url;
console.log("url", url);
MongoClient.connect(url, function(err, db) {
    if(db){
      app.db = db;
    }
    else{
      console.log("error in connecting MongoDB", err)
    }
});



// mongoose.connect('mongodb://localhost/homewebapp');
// var db = mongoose.connection;

//handle mongo error
// app.db.on('error', console.error.bind(console, 'connection error:'));
// app.db.once('open', function() {
//     // we're connected!
// });

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// allow-cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});



// app.use('/', require('./routes/api'));

// app.get('/', function(req, res) {
//     res.send('Its Working');
// });

// app.get('/', (req,res) => {
//   return res.end('Api working');
// })

// listen on port 3000
var hostPort=Number(conf.web.port);

http.createServer(app).listen(hostPort);

console.log("Server Running port:"+hostPort);


// route
var WebRoutes = require("./routes/ui-routes.js");
var webRoutes = new WebRoutes(app);
webRoutes.init();
