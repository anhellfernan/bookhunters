var express = require("express");
var pg   = require("pg");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name	= (url[6]||null);
var user	= (url[2]||null);
var pwd		= (url[3]||null);
var protocol	= (url[1]||null);
var dialect	= (url[1]||null);
var port	= (url[5]||null);
var host	= (url[4]||null);
var storage	= process.env.DATABASE_STORAGE;

function REST(){
    var self = this;
    self.connectPg();
};

REST.prototype.connectPg = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : host,
        user     : user,
        password : pwd,
        database : DB_name,
        debug    :  true
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("¡Todo correcto! Estoy saliendo por el Puerto 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();
