var database = require('../database/database')
var expect = require('chai').expect;

describe('When initialize mongodb', function() {
    it('should database is connected', function (done) {
        database.initializeMongo('mongodb://localhost/myDatabase');        
        database.dbConnection.once('open', function () {
            done()
        })
    });

    describe('When addUser is called', function () {
        userTest = {
            key: 'aead',
            value: 'adqsq'
        };

        it('should mongodb receive DATA', function (done) {
            database.AddUser(userTest);
            setTimeout(function () {
                database.User.findOne({key: userTest.key}, function(err, data) {
                    expect(data.key).to.equal(userTest.key);
                    expect(data.value).to.equal(userTest.value);
                    database.dbConnection.close()  
                    done();
                })
            }, 50)
        });
    });
});