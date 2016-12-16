var mysql   = require('mysql');
var db  = require('./db_connection.js');

// DATABASE CONFIGURATION
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Pet_View;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'SELECT * FROM Pet_View WHERE pet_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Pet (pet_name, animal_type, age, gender, pet_description, broughtin_date, adopted_date, ssn, organiation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.pet_name, params.animal_type, params.age, params.gender, params.pet_description, params.broughtin_date, params.adopted_date, params.ssn, params.organization_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(account_id, callback) {
    var query = 'DELETE FROM Pet WHERE pet_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};