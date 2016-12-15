var mysql   = require('mysql');
var db  = require('./db_connection.js');

// DATABASE CONFIGURATION
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Customer;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(ssn, callback) {
    var query = 'SELECT * FROM Customer WHERE ssn = ?';
    var queryData = [ssn];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Customer (ssn, customer_fname, customer_lname, customer_address) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.ssn, params.customer_fname, params.customer_lname, params.customer_address];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(ssn, callback) {
    var query = 'DELETE FROM Customer WHERE ssn = ?';
    var queryData = [ssn];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};