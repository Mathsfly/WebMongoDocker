"use strict"
var express = require('express');
var path = require('path')
var database = require('./database/database')

database.initializeMongo();

var app = express();

app.get('/', function(req, res){
	res.sendFile('index.html', {root: path.join(__dirname,'./')})
});	

app.get('/v1/key/:id', function(req, res){
    var id = req.params.id;
    console.log(req.params);
	database.User.findOne({key: id}, function(err, data) {
        if (err) return res.send('this key does not exist in database');
        res.send('We try to find out the user from the "key = '+ id + ' on url:\n ' + 'Value: ' + data.value);
    })
});	

app.post('/v1/key/:ikey/value/:ivalue', function(req, res){
    var ikey = req.params.ikey;
    var ivalue = req.params.ivalue;
    const result = database.AddUser({
        key: ikey,
        value: ivalue
    })
    res.redirect('/v1/key/' + ikey)
});	

app.listen(8081, function () {
    console.log('app running on 8081')
})

app.get('/AllUser', function(req, res){
	database.User.find(function (err, data) {
        if (err) return res.error(err);
        res.json(data);
    })
});	