const mongoose = require('mongoose');

//To connect local, replace by: localhost/myDatabase
const DATABASE_CONNECTION = 'mongodb://mongo/myDatabase';

var UserSchema = mongoose.Schema({
    key: String,
    value: String
});

User = exports.User =  mongoose.model('User', UserSchema);

dbConnection = exports.dbConnection = mongoose.connection;

exports.initializeMongo = function (connection = DATABASE_CONNECTION) {
    mongoose.connect(connection);

    console.log('try to connect to ' + connection);

    dbConnection.on('error', function (err) {
        if (err) console.log('Connection is failed');
    })

    dbConnection.once('open', function () {
        console.log('You are connected');
    })
}

exports.AddUser = function (dataUser) {
    const data = new User(dataUser)
    data.save(function (err, fluffy) {
        if (err) console.log('Failed');
    })
}