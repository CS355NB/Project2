var mysql   = require('mysql');
var db  = require('./db_connection.js');

// DATABASE CONFIGURATION
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM VetCheckUp_View;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(pet_id, checkup_id, callback) {
    var query = 'SELECT * FROM VetCheckUp_View WHERE pet_id = ? AND checkup_id = ?';
    var queryData = [pet_id, checkup_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Vet_Check_Up (pet_id, checkup_id, checkup_date, shots_uptodate, worms, fleas, cancer, checkup_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.pet_id, params.checkup_id, params.checkup_date, params.shots_uptodate, params.worms, params.fleas, params.cancer, params.checkup_description];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(pet_id, checkup_id, callback) {
    var query = 'DELETE FROM Vet_Check_Up WHERE pet_id = ? AND checkup_id = ?';
    var queryData = [pet_id, checkup_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};