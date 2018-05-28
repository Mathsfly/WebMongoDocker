"use strict"
var express = require('express');
var path = require('path');
var database = require('./database/database');

database.initializeMongo();

var app = express();

app.get('/', function(req, res){
    res.sendFile('index.html', {root: path.join(__dirname,'./')});
});	

app.get('/v1/key/:id', function(req, res){
    var id = req.params.id;
    console.log(req.params);
	database.User.findOne({key: id}, function(err, data) {
        if (err) res.send('this key does not exist in database');
        else     res.send('The value of {key: '+ id + '} is: {' + data.value + '}');
    })
});	

app.get('/post-err/:id', function(req, res){
    var id = req.params.id;
    res.send('This key = ' + id + ' exist with another value');
})

app.post('/v1/key/:ikey/value/:ivalue', function(req, res){
    var ikey = req.params.ikey;
    var ivalue = req.params.ivalue;
    database.User.findOne({key: ikey}, function(err, data) {
	if (err) {
	    res.send('an error of POST');
	} else if (!data) {
            const result = database.AddUser({
                key: ikey,
                value: ivalue
            });
            res.redirect('/v1/key/' + ikey);
        } else {
            //ignore the new user with an existing key. 
            //TO BE CONSIDER modify or ignore or may be accept the keys with the same value.
            res.redirect('/post-err/' + ikey);
        }
    })
});	

app.listen(8081, function () {
    console.log('app running on 8081');
})

app.get('/AllUser', function(req, res){
	database.User.find(function (err, data) {
        if (err) return res.error(err);
        res.json(data);
    })
});	
