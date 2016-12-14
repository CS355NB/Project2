var mysql   = require('mysql');
var db  = require('./db_connection.js');

// DATABASE CONFIGURATION
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Vet_Check_Up;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(pet_id, checkup_id, callback) {
    var query = 'SELECT * FROM Vet_Check_Up WHERE pet_id = ? AND checkup_id = ?';
    var queryData = [pet_id, checkup_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Account (first_name, last_name, email) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(account_id, callback) {
    var query = 'DELETE FROM Account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};