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
    });

    router.post("/newusu",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
            client.query("INSERT INTO usuarios (usuario,password,nombre,telefono) VALUES ($1,$2,$3,$4)",
            	[req.body.usuario,req.body.password,req.body.nombre,req.body.telefono],
                function(err, result) {
            done();
            if (err) 
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});

        	else
                res.json({"Error" : false, "Mensaje" : "Registro añadido !"});
            });
        });
    });

    router.post("/newofe",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        	client.query("INSERT INTO ofertas (email,isbn,titulo,editorial,curso,Ciclo,estado,latitud,longitud) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        	[req.body.email,req.body.isbn,req.body.titulo,req.body.editorial,req.body.curso,req.body.ciclo,req.body.estado,req.body.latitud,req.body.longitud],
            function(err, result) {
            done();
            if (err) 
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else 
                res.json({"Error" : false, "Mensaje" : "Registro añadido !"});            
            });
        });
    });

    router.post("/neweve",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        	client.query("INSERT INTO eventos (sala,websala,grupo,webgrupo,estilo,cp,fechadesde,fechahasta,hora,latitud,longitud,preciomax,preciomin,imagen,estado,compra) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
        	    [req.body.sala,req.body.websala,req.body.grupo,req.body.webgrupo,req.body.estilo,req.body.cp,req.body.fechadesde,req.body.fechahasta,req.body.hora,req.body.latitud,req.body.longitud,req.body.preciomax,req.body.preciomin,req.body.imagen,req.body.estado,req.body.compra],
            function(err, result) {
            done();
            if (err) 
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else 
                res.json({"Error" : false, "Mensaje" : "Registro añadido !"});            
            });
        });
    });

    router.get("/getusu/:usuario/:password",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        client.query("SELECT * FROM usuarios WHERE usuario=$1 AND password=$2", [req.params.usuario, req.params.password],
        	function(err, result) {
            done();
            if(err) 
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else 
                res.json({"Error" : false, "Message" : "Success", "usuarios" : result.rows});
            });
        });
    });

    router.get("/getpass/:usuario",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        client.query("SELECT * FROM usuarios WHERE usuario=$1",[req.params.usuario],
        	function(err, result) {
            done();
            if(err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else 
                res.json({"Error" : false, "Message" : "Success", "usuarios" : result.rows});
            });
        });
    });

    router.get("/ofertas",function(req,res){
    	pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
    		client.query("SELECT * FROM ofertas", function(err, result) {
    		done();
            if(err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Message" : "Success", "Oferta" : result.rows});
            });
        });
    });

    router.get("/eventos",function(req,res){
    	pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
    		client.query("SELECT * FROM eventos WHERE fechadesde>=now()::date", function(err, result) {
    		done();
            if(err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Message" : "Success", "Evento" : result.rows});
            });
        });
    });

    router.get("/deleven/:estado",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
            if(estado.equals("*") ) {
                client.query("DELETE FROM eventos", function(err, result) {
                done();
                if(err)
                    res.json({"Error" : true, "Mensaje" : "Error ejecutando postgresSQL query"});
                else
                    res.json({"Error" : false, "Mensaje" : "Success", "Evento" : result.rows});
                });
            };
            else {
                client.query("DELETE FROM eventos WHERE estado=$1",[req.params.estado], function(err, result) {
                done();
                if(err)
                    res.json({"Error" : true, "Mensaje" : "Error ejecutando postgresSQL query"});
                else
                    res.json({"Error" : false, "Mensaje" : "Success", "Evento" : result.rows});
                });  
            };         
        });
    });

    router.get("/delofe/:isbn",function(req,res){
    	pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
    		client.query("DELETE FROM ofertas WHERE isbn=$1",[req.params.isbn], function(err, result) {
    		done();
            if(err)
                res.json({"Error" : true, "Mensaje" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Mensaje" : "Success", "Oferta" : result.rows});
            });            
        });
    });

    router.get("/getofe/:email",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        client.query("SELECT * FROM ofertas WHERE email=$1",[req.params.email], function(err, result) {
            done();
            if(err)
                res.json({"Error" : true, "Mensaje" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Mensaje" : "Success", "Oferta" : result.rows});
            });            
        });
    });
}

module.exports = REST_ROUTER;
