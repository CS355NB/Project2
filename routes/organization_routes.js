var express = require('express');
var router = express.Router();
var organization_dal = require('../model/organization_dal');


// View All organizations
router.get('/all', function(req, res) {
    organization_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('organization/organizationViewAll', { 'result':result });
        }
    });

});

// View the organization for the given id
router.get('/', function(req, res){
    if(req.query.organization_id == null) {
        res.send('organization_id is null');
    }
    else {
        organization_dal.getById(req.query.organization_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('organization/organizationViewById', {'result': result});
            }
        });
    }
});

// Return the add a new organization form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    organization_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('organization/organizationAdd', {'organization': result});
        }
    });
});

// insert an organization record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.organization_name == null) {
        res.send('Organization Name must be provided.');
    }
    else if(req.query.organization_address == null) {
        res.send('Organization Address must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        organization_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/organization/all');
            }
        });
    }
});

// Delete an organization for the given organization_id
router.get('/delete', function(req, res){
    if(req.query.organization_id == null) {
        res.send('organization_id is null');
    }
    else {
        organization_dal.delete(req.query.organization_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/organization/all');
            }
        });
    }
});

module.exports = router;