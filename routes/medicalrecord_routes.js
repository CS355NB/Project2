var express = require('express');
var router = express.Router();
var medicalrecord_dal = require('../model/medicalrecord_dal');
var pet_dal = require('../model/pet_dal');


// View All medicalrecords
router.get('/all', function(req, res) {
    medicalrecord_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('medicalrecord/medicalrecordViewAll', { 'result':result });
        }
    });

});

// View the medicalrecord for the given id
router.get('/', function(req, res){
    if(req.query.pet_id == null) {
        res.send('pet_id is null');
    }
    else if (req.query.checkup_id == null) {
        res.send('checkup_id is null');
    }
    else {
        medicalrecord_dal.getById(req.query.pet_id, req.query.checkup_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('medicalrecord/medicalrecordViewById', {'result': result});
            }
        });
    }
});

// Return the add a new medicalrecord form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    pet_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('medicalrecord/medicalrecordAdd', {'pet': result});
        }
    });
});

// insert a medicalrecord record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.pet_id == null) {
        res.send('A pet must be selected.');
    }
    else if(req.query.checkup_id == null) {
        res.send('Check Up ID must be provided.');
    }
    else if (req.query.checkup_date == null) {
        res.send('Check Up date must be provided.');
    }
    else if (req.query.shots_uptodate == null) {
        res.send("Whether the pet's shots are up to date must be provided.");
    }
    else if (req.query.worms == null) {
        res.send('Whether the pet has worms or not must be provided.');
    }
    else if (req.query.cancer == null) {
        res.send('Whether the pet has cancer or not must be provided.');
    }
    else if (req.query.checkup_description == null) {
        res.send('Check up description must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        medicalrecord_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/medicalrecord/all');
            }
        });
    }
});

// Delete a medicalrecord for the given pet_id
router.get('/delete', function(req, res){
    if(req.query.pet_id == null) {
        res.send('pet_id is null');
    }
    else if (req.query.checkup_id == null) {
        res.send('checkup_id is null');
    }
    else {
        medicalrecord_dal.delete(req.query.pet_id, req.query.checkup_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/medicalrecord/all');
            }
        });
    }
});

module.exports = router;