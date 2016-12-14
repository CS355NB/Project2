var express = require('express');
var router = express.Router();
var pet_dal = require('../model/pet_dal');
var organization_dal = require('../model/organization_dal');
var customer_dal = require('../model/customer_dal');


// View All pets
router.get('/all', function(req, res) {
    pet_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('pet/petViewAll', { 'result':result });
        }
    });

});

// View the pet for the given id
router.get('/', function(req, res){
    if(req.query.pet_id == null) {
        res.send('pet_id is null');
    }
    else {
        pet_dal.getById(req.query.pet_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('pet/petViewById', {'result': result});
            }
        });
    }
});

// Return the add a new pet form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    organization_dal.getAll(function(err,result) {
        customer_dal.getAll(function(err, customer) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('pet/petAdd', {'organization': result, 'customer': customer}); // might need to change black result to organization
            }
        });
    });
});

// insert a pet record
router.get('/insert', function(req, res) {
    // simple validation
    if (req.query.pet_name == null) {
        res.send('Pet Name must be provided.');
    }
    else if (req.query.animal_type == null) {
        res.send('Animal Type must be provided.');
    }
    else if (req.query.age == null) {
        res.send('Animal Age must be provided.');
    }
    else if (req.query.gender == null) {
        res.send('Animal Gender must be provided.');
    }
    else if (req.query.pet_description == null) {
        res.send('Pet Description must be provided.');
    }
    else if (req.query.broughtin_date == null) {
        res.send('Date of when pet was brought in must be provided.');
    }
    else if(req.query.organization_id == null) {
        res.send('An organization must be selected.');
    }
    else if (req.query.adopted_date != null && req.query.ssn == null) {
        res.send('If the pet has an adoption date, then the customer ssn must be selected as well.');
    }
    else if (req.query.ssn != null && req.query.adopted_date == null) {
        res.send('If a customer ssn was selected, then the pet adoption date must be provided.')
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        pet_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/pet/all');
            }
        });
    }
});

// Delete a pet for the given pet_id
router.get('/delete', function(req, res){
    if(req.query.pet_id == null) {
        res.send('pet_id is null');
    }
    else {
        pet_dal.delete(req.query.pet_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/pet/all');
            }
        });
    }
});

module.exports = router;