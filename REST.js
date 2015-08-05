var express = require("express");
var pg   = require("pg");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })

    router.post("/newusu",function(req,res){
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.one("INSERT INTO usuarios (usuario,password,nombre)
                VALUES ('"+req.body.usuario+"','"+md5(req.body.password)+"','"+req.body.nombre+"')",
                function(err, result) {
            done();
            if (err)
                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query"});
            });
        });
    });

    router.post("/newofe",function(req,res){
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.one("INSERT INTO ofertas (email,isbn,titulo,editorial,curso,Ciclo,estado,latitud,longitud)
         VALUES ('"+req.body.email+"','"+req.body.isbn+"','"+req.body.titulo+"','"+req.body.editorial+"',"+
            req.body.curso+",'"+req.body.ciclo+"','"+req.body.estado+"',"+req.body.latitud+","+req.body.longitud+")",
            function(err, result) {
            done();
            if (err) 
                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query"});
            });
        });
    });

    router.get("/getusu/:usuario/:password",function(req,res){
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query("SELECT * FROM usuarios WHERE usuario='"+req.params.usuario+"' AND password='"+
            md5(req.params.password+"'", function(err, result) {
            done();
            if(err) {
                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Oferta" : rows}); }
            });
        });
    });

    router.get("/ofertas",function(req,res){
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query("SELECT * FROM ofertas", function(err, result) {
            done();
            if(err) {
                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Oferta" : rows}); }
            });                
        });
    });

        router.get("/delofe/:isbn",function(req,res){
            pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query("DELETE FROM ofertas WHERE isbn='"+req.params.isbn+"'", function(err, result) {
            done();
            if(err) {
                res.json({"Error" : true, "Mensaje" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Mensaje" : "Success", "usuarios" : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;
