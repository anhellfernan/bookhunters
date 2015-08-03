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
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["usuarios","usuario","password","nombre",req.body.usuario,md5(req.body.password),req.body.nombre];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Mensaje" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Mensaje" : "Registro añadido !"});
            }
        });
    });

    router.post("/newofe",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
        var table = ["ofertas","email","isbn","titulo","editorial","curso","ciclo","estado","latitud","longitud",req.body.email,req.body.isbn,req.body.titulo,req.body.editorial,req.body.curso,req.body.ciclo,req.body.estado,req.body.latitud,req.body.longitud];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Mensaje" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Mensaje" : "Registro añadido !"});
            }
        });
    });

    router.get("/getusu/:usuario/:password",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = ["usuarios","usuario",req.params.usuario,"password", md5(req.params.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Mensaje" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Mensaje" : "Success", "usuarios" : rows});
            }
        });
    });

    router.get("/ofertas",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["ofertas"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Oferta" : rows});
            }
        });
    });

        router.get("/delofe/:isbn",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["ofertas","isbn",req.params.isbn];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Mensaje" : "Error ejecutando MySQL query"});
            } else {
                res.json({"Error" : false, "Mensaje" : "Success", "usuarios" : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;
