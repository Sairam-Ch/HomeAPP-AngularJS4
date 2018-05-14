/**
 * Created by Sairam on 14/05/18.
 * */


var multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();

var Action = require('../models/api-actions.js');


var UIRoutes = function(app) {

    this.app = app;
    this.actionInstance = new Action(app);
};

module.exports = UIRoutes;

UIRoutes.prototype.init = function() {
    var self = this;
    var app = this.app;


    // login API for both HomeAPP & Home AdminAPP
    app.post('/login', function(req, res){
        console.log("login API routes", new Date());
        self.actionInstance.login(req, function (err, loginResult) {
            res.json(loginResult);
        })
    });

    // get all grades and course data based on course
    app.post('/getCourseGrade', function(req, res) {
        console.log("getCourseGrade routes", new Date() );
        self.actionInstance.getCourseGrade(req, function(err, result) {
            res.json(result);
        });
    });

    // get strands based on course and grade from "course" collection.
    app.post('/getStrand', function (req, res) {
        console.log(" ENTER INTO GET STRAND routes",new Date());
        self.actionInstance.getStrand(req, function (err, result) {
            res.send(result);
        });
    });

    //get General Expression based on course, grade and strand from "course" collection
    app.post('/getGeneralExp',function(req,res){
        console.log("ENTER INTO GENERALEXP routes", new Date());
        self.actionInstance.getGeneralExp(req, function (err, result){
            res.json(result)

        });
    });

    // get Specific Expectation based on course, grade, strand and GE - from "course" collection
    app.post('/getSpecificExp', function (req, res) {
        console.log("ENTER INTO GET SPECIFIC EXPECTATION routes", new Date() );
        self.actionInstance.getSpecificExp(req, function (err, result) {
            res.json(result);
        });
    });

    //get Specific ExpID based on SE, grade, course, strand & GE.
    app.post('/getSpecificExpID', function (req, res) {
        console.log("ENTER INTO GET SE ID",new Date());
        self.actionInstance.getSpecificExpID(req, function (err, result) {
            res.json(result);
        });
    });


    //add question

    app.post('/addQuestion',multipartyMiddleware,function (req, res) {
        console.log('ENTER INTO ADD QUESTION routes', new Date() );
        self.actionInstance.addQuestion(req, function (err, result) {
            res.json(result);
        });
    });


    //update question

    app.post('/updateQuestion',multipartyMiddleware,function (req, res) {
        console.log('ENTER INTO ADD QUESTION routes', new Date() );
        self.actionInstance.updateQuestion(req, function (err, result) {
            res.json(result);
        });
    });

    // Get Question count list with Question Data in Library Module

    app.post('/getQuestionCount', function (req, res) {
        console.log("ENTER INTO QUESTION COUNT");
        self.actionInstance.getQuestionCount(req, function (err, result) {
            res.json(result)

        });
    });

    //Get the question
    app.post('/getQuestion', function (req, res) {
        console.log(new Date(), "ENTER INTO  GET QUESTION ");
        self.actionInstance.getQuestion(req, function (err, result) {
            res.json(result);
        });

    });

    /*
     //delete the library question Image
    app.post('/deleteQuestionImage', function (req, res) {
        console.log(new Date(), "ENTER INTO  GET QUESTION ");
        self.actionInstance.deleteQuestionImage(req, function (err, result) {
            res.json(result);
        });

    });
    */

    app.post('/getAssessmentQuestion', function (req, res) {
        console.log(new Date(), "ENTER INTO  GET ASSESSMENT QUESTION ");
        self.actionInstance.getAssessmentQuestion(req, function (err, result) {
            res.json(result);
        });

    });

    app.post('/createAssessment', function (req, res) {
        console.log(new Date(), "ENTER INTO CREATE ASSESSMENT ");
        self.actionInstance.createAssessment(req, function (err, result) {
            res.json(result);
        });
    });


    // get the tests details for Agenda Page.
    app.post('/getTestsList', function (req, res) {
        console.log(new Date(), "ENTER INTO CREATE ASSESSMENT ");
        self.actionInstance.getTestsList(req, function (err, result) {
            res.json(result);
        });
    });

 // get the tests questions in Agenda Page.
    app.post('/getTestQuesList', function (req, res) {
        console.log(new Date(), "ENTER INTO CREATE ASSESSMENT ");
        self.actionInstance.getTestQuesList(req, function (err, result) {
            res.json(result);
        });
    });

    app.post('/getStrandColor', function (req, res) {
        console.log(new Date(), "ENTER INTO STRAND COLOR ");
        self.actionInstance.getStrandColor(req, function (err, result) {
            res.json(result);
        });

    });




};


