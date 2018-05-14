
var ApiService = require('../services/service.js');

var _ = require("underscore");
var lodash = require("lodash");
var async = require("async");
var fs = require('fs');
var uuid = require('uuid'); // to generate random number
var moment = require('moment');

var ApiActions = function (app) {
    this.app = app;
    this.apiServiceInstance = new ApiService(app);
};

module.exports = ApiActions;


ApiActions.prototype.login = function (req, callback) {
    console.log("Enter into login &Action", req.body);
    var self = this;
    var reqObj = req.body;

    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }
    var responseObject = {};

    if ((!_.isEmpty(reqObj.userID)) && (!_.isEmpty(reqObj.password))) {

        // var query = { '$or' : [{userID : reqObj.userID},{email : reqObj.userID}], password : reqObj.password }

        var userOrEmail = new RegExp(["^", reqObj.userID, "$"].join(""), "i");

        var query = {
            '$or': []
        };

        query['$or'].push({
            // userID: reqObj.userID
            userID: userOrEmail
        });
        query['$or'].push({
            // email: reqObj.userID
            email: userOrEmail
        });

        query['password'] = reqObj.password;

        var criteria = {
            condition : query,
            projection : {
                userID : 1, email : 1, firstname : 1,
                lastname : 1, role : 1, locationID : 1
            }
        }

        var userTableName = "user";

        self.apiServiceInstance.findDataAll(userTableName, criteria, function (err, userResult) {
            console.log(userResult, "userResult ---");
            if (userResult.length > 0) {
                console.log(userResult);

                responseObject['status'] = true;
                responseObject['data'] = userResult;

                if(userResult[0].role == "Parent"){
                    responseObject['roleStatus'] = 100;
                    callback(null, responseObject);
                }
                else if(userResult[0].role == "Admin"){
                    responseObject['roleStatus'] = 101;
                    callback(null, responseObject);
                }else if(userResult[0].role == "Content"){
                    responseObject['roleStatus'] = 102;
                    callback(null, responseObject);
                }else{
                    callback(err, errorResponseObj);
                }

            }
            else {
                callback(err, errorResponseObj);
            }
        })
    }else{
        callback(null, errorResponseObj);
    }

}


ApiActions.prototype.getCourseGrade = function (req, callback) {
    console.log("getCourseGrade &Action");
    var self = this;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }
    var query = {};
    var criteria = {
        condition : query
    }
    var courseAndGrade = [];
    var data = [];

    var courseTableName = "course";

    self.apiServiceInstance.findDataAll(courseTableName, criteria, function (err, courseResult) {
        if(courseResult.length > 0){

            var course = _.pluck(courseResult, 'course');
            var uniqueCourse = _.uniq(course).sort(function( a, b ) {
                return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
            });
            var finalCourse = [];
            async.forEachSeries(uniqueCourse, function(singleCourse, forEachCb){
                finalCourse.push(singleCourse);
                var query = {
                    course : singleCourse
                }
                var criteria = {
                    condition: query,
                    projection: {
                        grade: 1
                    }
                }

                self.apiServiceInstance.findDataAll(courseTableName, criteria, function (err, courseResult1) {

                    if (courseResult1.length > 0) {
                        var grade = [];
                        for (var j = 0; j < courseResult1.length; j++) {
                            grade.push(courseResult1[j].grade);
                        }
                        var gradeforcourse = _.uniq(grade).sort(function(a,b){
                            return a-b;
                        });
                    }
                    courseAndGrade.push({
                        course: singleCourse,
                        grade: gradeforcourse
                    });
                    forEachCb(null, singleCourse);
                });

            }, function (result1) {
                data.push({
                    course: finalCourse,
                    courseandgrade: courseAndGrade
                })
                responseObject['data'] = data;
                responseObject['status'] = true;
                // console.log(responseObject, "responseObject ----");
                callback(null, responseObject)
            })

        }else{
            callback(null, errorResponseObj);
        }

    });

};


ApiActions.prototype.getStrand = function (req, callback) {
    console.log("Enterd into getStrand &Action ");

    var self = this;
    var reqObj = req.body;
    console.log(reqObj, "reqObj ---");
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    };

    if ((!_.isEmpty(reqObj.course)) && (!_.isEmpty(reqObj.grade))) {
        var query = {
            course: reqObj.course,
            grade: reqObj.grade
        };
        var criteria={
            condition : query,
            projection : {strand: 1, specificexpID : 1},
            sortOrder : {_id:1}
        };

        console.log(criteria, "criteria @@@");
        var courseTableName = 'course';

        self.apiServiceInstance.findDataAll(courseTableName, criteria, function (err, strandData) {
            if (strandData.length > 0) {
                var strand = _.pluck(strandData, 'strand');
                var uniquestrand = _.uniq(strand);
                var finalstrand = [];
                var finalData = [];
                var checkStrand = [];
                async.forEachSeries(uniquestrand, function (singleObj, forEachCbk) {
                    finalstrand.push(singleObj);
                    var object1 = _.where(strandData, {'strand': singleObj});
                    var specificexpid = _.pluck(object1, 'specificexpID');
                    var uniquespecificid = _.uniq(specificexpid);
                    checkStrand.push({
                        strand: singleObj,
                        specificexpID: uniquespecificid
                    });
                    forEachCbk(null, singleObj);
                }, function (result1) {
                    finalData.push({
                        strand: finalstrand,
                        specificexpID: checkStrand
                    });
                    responseObject['status'] = true;
                    responseObject['data'] = finalData;
                    callback(null, responseObject);
                });
            } else {
                callback(null, errorResponseObj)
            }
        });
    }
    else {
        callback(null, errorResponseObj)
    }
};


ApiActions.prototype.getGeneralExp = function (req, callback) {
    console.log("Entered into getGeneralExp &Action");

    var self = this;
    var reqObject = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }

    var query = {
        course: reqObject.course,
        grade: reqObject.grade,
        strand: reqObject.strand
    };
    var criteria = {
        condition: query,
        projection: {
            generalexp: 1
        },
        sort: {
            _id: 1
        }
    };
    var courseTableName = 'course';
    self.apiServiceInstance.findDataAll(courseTableName, criteria, function (err, gereralExpResult) {
        if (gereralExpResult.length > 0) {
            var generalExp = [];
            for (var i = 0; i < gereralExpResult.length; i++) {
                generalExp.push(gereralExpResult[i].generalexp)
            }
            responseObject['status'] = true;
            responseObject['data'] = _.uniq(generalExp);
            callback(err, responseObject);
        }
        else {
            callback(err, errorResponseObj);
        }
    });
};


ApiActions.prototype.getSpecificExp = function (req, callback) {
    console.log("Enter into getSpecificExp &Action");

    var self = this;
    var reqObj = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    };

    var query = {};

    query['course'] = reqObj.course ? reqObj.course : null
    query['grade'] = reqObj.grade ? reqObj.grade : null
    query['strand'] = reqObj.strand ? reqObj.strand : null
    query['generalexp'] = reqObj.generalexp ? reqObj.generalexp : null

    var criteria = {
        condition: query,
        projection: {
            specificexp: 1,
            url: 1,
            specificexpID : 1
        }

    };

    var courseTableName = 'course';

    self.apiServiceInstance.findDataAll(courseTableName, criteria, function (err, seResult) {
        if (seResult.length > 0) {
            responseObject['status'] = true;
            responseObject['data'] = seResult;
            callback(null, responseObject);
        } else {
            callback(null, errorResponseObj);
        }
    });

};


ApiActions.prototype.getSpecificExpID = function (req, callback) {
    console.log("Entered into getSpecificExpID &Action");

    var self = this;
    var reqObj = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }

    var query = {};

    query['course'] = reqObj.course ? reqObj.course : null;
    query['grade'] = reqObj.grade ? reqObj.grade : null;
    query['strand'] = reqObj.strand ? reqObj.strand : null;
    query['generalexp'] = reqObj.generalexp ? reqObj.generalexp : null;
    query['specificexp'] = reqObj.specificexp ? reqObj.specificexp : null;

    var criteria = {
        condition: query,
        projection: {
            specificexpID : 1
        }
    };

    var courseTableName = 'course';

    self.apiServiceInstance.findDataAll(courseTableName, criteria, function (err, seIdResult) {
        if (seIdResult.length > 0) {
            responseObject['status'] = true;
            responseObject['data'] = seIdResult;
            callback(null, responseObject);
        } else {
            callback(null, errorResponseObj);
        }
    });

};


// addQuestion
ApiActions.prototype.addQuestion = function (req, callback) {
    console.log("Entered into addQuestion &Action");

    var self = this;
    var s3 = self.app.s3;
    var reqObj = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }

//    Validating the Question Insert Request Object Before insert
    if ( (_.isEmpty(reqObj.strand)) || (_.isEmpty(reqObj.course)) || (_.isEmpty(reqObj.grade)) || (_.isEmpty(reqObj.generalexp)) ||
                    (_.isEmpty(reqObj.specificexp)) || (_.isEmpty(reqObj.type))  ) {
        console.log('Request Object is not properly ----');
        callback(null, responseObject);
        return;
    }

    //Validate Text and Images - if data not come from any one of the line
    if ( (_.isEmpty(reqObj.line1)) && (_.isEmpty(reqObj.line2)) && (_.isEmpty(reqObj.line3)) &&
         (_.isEmpty(reqObj.line4)) && (_.isEmpty(reqObj.line5)) && (_.isEmpty(reqObj.line6)) )
    {
        console.log("No data from Request text ");
        callback(null, responseObject);
        return;
    }

    //Validate Question type
    if (((reqObj.type == 'text') && (reqObj.correctanswer)) || ((reqObj.type == 'text') && (reqObj.correctanswerimage))) {
        reqObj.answer1 = '';
        reqObj.answer2 = '';
        reqObj.answer3 = '';
        reqObj.answerimage1 = '';
        reqObj.answerimage2 = '';
        reqObj.answerimage3 = '';

    } else {
        //Validate Answers tag
        if ((_.isEmpty(reqObj.answer1) && !_.has(reqObj, 'answerimage1')) || (_.isEmpty(reqObj.answer2) && !_.has(reqObj, 'answerimage2')) || (_.isEmpty(reqObj.answer3) && !_.has(reqObj, 'answerimage3')) || (_.isEmpty(reqObj.correctanswer) && !_.has(reqObj, 'correctanswerimage'))) {
            console.log('Validate Answers tag ');
            callback(null, responseObject);
            return;
        }
    }

    if (reqObj.manipulatives == null) {
        reqObj.manipulatives = 'false';
    }

    var creatID = reqObj.username ? reqObj.username : null;

    var counterTableName = "counter";

    var query = {_id : "neoHome"};
    var criteria = {
        condition : query,
        projection : {}
    };

    self.apiServiceInstance.findDataAll(counterTableName, criteria, function(err, counterResult){
        if(counterResult){
            var condition = {
                _id : "neoHome"
            }
            var updateData = {
                seq: parseInt(counterResult[0].seq) + 1
            };
            self.apiServiceInstance.updateDocument(condition, updateData, counterTableName, function (err, updateCounter) {
                if(updateCounter){
                    self.apiServiceInstance.findDataAll(counterTableName, criteria, function (err, counterResult2) {
                        if(counterResult2) {
                            var serial;

                            if (JSON.stringify(counterResult2[0].seq).length == 1) {
                                serial = ("QM000").concat(JSON.parse(counterResult2[0].seq));
                            } else if (JSON.stringify(counterResult2[0].seq).length == 2) {
                                serial = ("QM00").concat(JSON.parse(counterResult2[0].seq));
                            } else if (JSON.stringify(counterResult2[0].seq).length == 3) {
                                serial = ("QM0").concat(JSON.parse(counterResult2[0].seq));
                            } else {
                                serial = ("QM").concat(JSON.parse(counterResult2[0].seq))
                            }

                            var questionTableName = "question";

                            var files = req.files.file;
                            console.log("files ---", files);

                            if(files && files.length){

                                var criteria = {
                                    questionID: serial,
                                    creator: creatID,
                                    course: reqObj.course,
                                    grade: reqObj.grade,
                                    strand: reqObj.strand,
                                    generalexp: reqObj.generalexp,
                                    specificexp: reqObj.specificexp,
                                    specificexpID: reqObj.specificexpID,
                                    type: reqObj.type,
                                    part1: reqObj.part1 || '',
                                    part2: reqObj.part2 || '',
                                    line1: reqObj.line1 || '',
                                    line2: reqObj.line2 || '',
                                    line3: reqObj.line3 || '',
                                    line4: reqObj.line4 || '',
                                    line5: reqObj.line5 || '',
                                    line6: reqObj.line6 || '',
                                    image1: reqObj.image1 || '',
                                    image2: reqObj.image2 || '',
                                    image3: reqObj.image3 || '',
                                    answer1: reqObj.answer1 || '',
                                    answer2: reqObj.answer2 || '',
                                    answer3: reqObj.answer3 || '',
                                    answerimage1: reqObj.answerimage1 || '',
                                    answerimage2: reqObj.answerimage2 || '',
                                    answerimage3: reqObj.answerimage3 || '',
                                    correctanswer: reqObj.correctanswer || '',
                                    correctanswerimage: reqObj.correctanswerimage || '',
                                    manipulatives: reqObj.manipulatives,
                                    library: reqObj.library
                                };

                                async.forEachSeries(files, function (singleObj, forEachCbk) {

                                    var jsonObj = singleObj;
                                    var mm = Object.keys(jsonObj);
                                    var filePathData = singleObj[mm[0]].path;

                                    fs.readFile(filePathData, function (f_err, stream) {

                                        if (f_err) {
                                            return;
                                        }
                                        var file_name = uuid.v1() + '.png';

                                        console.log("file_name", file_name);

                                        var params = {
                                            Bucket: 'neohomeapp',
                                            Key: file_name,
                                            Body: stream,
                                            ACL: 'public-read'
                                        };

                                        console.log("params", params)


                                        s3.putObject(params, function (error, suc) {
                                            if (error) {
                                                console.log(error);
                                            } else {

                                                criteria[mm[0]] = file_name;
                                            }
//
                                            forEachCbk(null, forEachCbk)
                                        })

                                    });

                                }, function (result1) {

                                    self.apiServiceInstance.insert(criteria, questionTableName, function (err, questionResult) {
                                        if (questionResult) {
                                            responseObject['status'] = true;
                                            responseObject['data'] = questionResult;
                                            callback(err, responseObject);
                                        } else {
                                            callback(null, errorResponseObj);
                                        }
                                    });
                                });

                            }
                            else{
                                var criteria = {
                                    questionID: serial,
                                    creator: creatID,
                                    course: reqObj.course,
                                    grade: reqObj.grade,
                                    strand: reqObj.strand,
                                    generalexp: reqObj.generalexp,
                                    specificexp: reqObj.specificexp,
                                    specificexpID: reqObj.specificexpID,
                                    type: reqObj.type,
                                    part1: reqObj.part1 || '',
                                    part2: reqObj.part2 || '',
                                    line1: reqObj.line1 || '',
                                    line2: reqObj.line2 || '',
                                    line3: reqObj.line3 || '',
                                    line4: reqObj.line4 || '',
                                    line5: reqObj.line5 || '',
                                    line6: reqObj.line6 || '',
                                    image1: reqObj.image1 || '',
                                    image2: reqObj.image2 || '',
                                    image3: reqObj.image3 || '',
                                    answer1: reqObj.answer1 || '',
                                    answer2: reqObj.answer2 || '',
                                    answer3: reqObj.answer3 || '',
                                    answerimage1: reqObj.answerimage1 || '',
                                    answerimage2: reqObj.answerimage2 || '',
                                    answerimage3: reqObj.answerimage3 || '',
                                    correctanswer: reqObj.correctanswer || '',
                                    correctanswerimage: reqObj.correctanswerimage || '',
                                    manipulatives: reqObj.manipulatives,
                                    library: reqObj.library
                                };

                                self.apiServiceInstance.insert(criteria, questionTableName, function (err, questionResult) {
                                    if (questionResult) {
                                        responseObject['status'] = true;
                                        responseObject['data'] = questionResult;
                                        callback(err, responseObject);
                                    } else {
                                        callback(null, errorResponseObj);
                                    }
                                });
                            }

                        }else{
                            callback(null, errorResponseObj);
                        }
                    })
                }else{
                    callback(null, errorResponseObj);
                }
            })

        }
        else{
          callback(null, errorResponseObj);
        }
    })

};




ApiActions.prototype.updateQuestion = function (req, callback) {
    console.log("Entered into updateQuestion &Action");

    var self = this;
    var s3 = self.app.s3;
    var reqObj = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }


//    Validating the Question Insert Request Object Before insert

    if ( (_.isEmpty(reqObj.strand)) || (_.isEmpty(reqObj.course)) || (_.isEmpty(reqObj.grade)) || (_.isEmpty(reqObj.generalexp)) ||
        (_.isEmpty(reqObj.specificexp)) || (_.isEmpty(reqObj.type)) || (_.isEmpty(reqObj.specificexpID)) ) {
        console.log('Request Object is not properly ----');
        callback(null, responseObject);
        return;
    }

    //Validate Text and Images - if data not come from any one of the line
    if ( (_.isEmpty(reqObj.line1)) && (_.isEmpty(reqObj.line2)) && (_.isEmpty(reqObj.line3)) &&
        (_.isEmpty(reqObj.line4)) && (_.isEmpty(reqObj.line5)) && (_.isEmpty(reqObj.line6)) )
    {
        console.log("No data from Request text ");
        callback(null, responseObject);
        return;
    }

    //Validate Question type
    if ((reqObj.type == 'text') && (reqObj.correctanswer) || ((reqObj.type == 'text') && (reqObj.correctanswerimage))) {
        reqObj.answer1 = '';
        reqObj.answer2 = '';
        reqObj.answer3 = '';
        reqObj.answerimage1 = '';
        reqObj.answerimage2 = '';
        reqObj.answerimage3 = '';

    }

    else if (reqObj.type == 'open') {

    }
    else {

        //Validate Answers tag
        if ((_.isEmpty(reqObj.answer1) && !_.has(reqObj, 'answerimage1')) || (_.isEmpty(reqObj.answer2) && !_.has(reqObj, 'answerimage2')) || (_.isEmpty(reqObj.answer3) && !_.has(reqObj, 'answerimage3')) || (_.isEmpty(reqObj.correctanswer) && !_.has(reqObj, 'correctanswerimage'))) {
            console.log("Validate Answers tag");
            callback(null, responseObject);
            return;
        }
    }

    var questionTableName = "question";

    var files = req.files.file;

    if (files && files.length) {

        var updateData = {
            course: reqObj.course,
            grade: reqObj.grade,
            strand: reqObj.strand,
            generalexp: reqObj.generalexp,
            specificexp: reqObj.specificexp,
            specificexpID: reqObj.specificexpID,
            type: reqObj.type,
            part1: reqObj.part1 || '',
            part2: reqObj.part2 || '',
            line1: reqObj.line1 || '',
            line2: reqObj.line2 || '',
            line3: reqObj.line3 || '',
            line4: reqObj.line4 || '',
            line5: reqObj.line5 || '',
            line6: reqObj.line6 || '',
            image1: reqObj.image1 || '',
            image2: reqObj.image2 || '',
            image3: reqObj.image3 || '',
            answer1: reqObj.answer1 || '',
            answer2: reqObj.answer2 || '',
            answer3: reqObj.answer3 || '',
            answerimage1: reqObj.answerimage1 || '',
            answerimage2: reqObj.answerimage2 || '',
            answerimage3: reqObj.answerimage3 || '',
            correctanswer: reqObj.correctanswer,
            correctanswerimage: reqObj.correctanswerimage || '',
            manipulatives: reqObj.manipulatives,
            library: reqObj.library
        };

        async.forEachSeries(files, function (singleObj, forEachCbk) {

            var jsonObj = singleObj;
            var mm = Object.keys(jsonObj);
            var filePathData = singleObj[mm[0]].path;

            fs.readFile(filePathData, function (f_err, stream) {

                if (f_err) {
                    return;
                }
                var file_name = uuid.v1() + '.png';

                console.log("file_name", file_name);
                var params = {
                    Bucket: 'neohomeapp',
                    Key: file_name,
                    Body: stream,
                    ACL: 'public-read'
                };

                console.log("params", params);


                s3.putObject(params, function (error, suc) {
                    if (error) {
                        console.log(error);
                    } else {

                        updateData[mm[0]] = file_name;
                    }
//
                    forEachCbk(null, forEachCbk)
                })

            });

        }, function (result1) {
            var query = {
                questionID: reqObj.oldQuestionID
            };

            self.apiServiceInstance.updateDocument(query, updateData, questionTableName, function (err, result) {

                if (result) {
                    responseObject['status'] = true;
                    responseObject['data'] = 'Question Updated successfully';
                    callback(err, responseObject);

                }
                else {
                    callback(null, responseObject);
                }

            });
        });

    }
    else {
        var updateData = {
            course: reqObj.course,
            grade: reqObj.grade,
            strand: reqObj.strand,
            generalexp: reqObj.generalexp,
            specificexp: reqObj.specificexp,
            specificexpID: reqObj.specificexpID,
            type: reqObj.type,
            part1: reqObj.part1 || '',
            part2: reqObj.part2 || '',
            line1: reqObj.line1 || '',
            line2: reqObj.line2 || '',
            line3: reqObj.line3 || '',
            line4: reqObj.line4 || '',
            line5: reqObj.line5 || '',
            line6: reqObj.line6 || '',
            image1: reqObj.image1 || '',
            image2: reqObj.image2 || '',
            image3: reqObj.image3 || '',
            answer1: reqObj.answer1 || '',
            answer2: reqObj.answer2 || '',
            answer3: reqObj.answer3 || '',
            answerimage1: reqObj.answerimage1 || '',
            answerimage2: reqObj.answerimage2 || '',
            answerimage3: reqObj.answerimage3 || '',
            correctanswer: reqObj.correctanswer,
            correctanswerimage: reqObj.correctanswerimage || '',
            manipulatives: reqObj.manipulatives,
            library: reqObj.library
        };
        var query = {
            questionID: reqObj.oldQuestionID
        };


        self.apiServiceInstance.updateDocument(query, updateData, questionTableName, function (err, result) {
            if (result) {
                responseObject['status'] = true;
                responseObject['data'] = 'Question Updated successfully';
                callback(err, responseObject);
            }
            else {
                callback(null, errorResponseObj);
            }
        });
    }
};

ApiActions.prototype.getQuestionCount = function (req, callback) {
    console.log("Entered into getQuestionCount &Action");
    var self = this;
    var reqObj = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }

    var query = {};

    if (reqObj.questionID) {
        query['questionID'] = req.body.questionID;
    } else {
        query = {
            library: reqObj.library,
            course: reqObj.course,
            grade: reqObj.grade,
            type: reqObj.type,
            specificexpID: reqObj.specificexpID,
            creator: reqObj.username
        }
    }
    console.log(query, "question query ---");
    var questionTableName = "question";
    self.apiServiceInstance.couQuestion(query, questionTableName, function (err, questionCount) {
        if (questionCount > 0) {
            responseObject['status'] = true;
            responseObject['data'] = questionCount;
            callback(err, responseObject)
        } else {
            callback(err, errorResponseObj)
        }
    });
};


ApiActions.prototype.getQuestion = function (req, callback) {
    console.log("Entered into getQuestion &Action");
    var self = this;
    var conditionObject = req.body.query;
    var responseObject = {};
    var errorResponseObj = {
        status : false,
        statuscode : 204,
        data : {}
    }

    var query = {}

    if (conditionObject.questionID) {
        query['questionID'] = conditionObject.questionID;
        query['creator'] = conditionObject.username;
    } else {
        query = {
            course: conditionObject.course,
            grade: conditionObject.grade,
            type: conditionObject.type,
            specificexpID: conditionObject.specificexpID,
            library: conditionObject.library,
            creator: conditionObject.username
        };
    }

//Remove undefined and empty key from JSON
    for (var i in query) {
        if (query[i] === null || query[i] === undefined || query[i] === '') {
            delete query[i];
        }
    }

    var criteria = {
        condition: query,
        projection: {},
//        sortOrder:{_id:-1},
        limit: 1
    };
    var mylimit = parseInt(req.body.limit);
    req.body.limit ? criteria['skip'] = mylimit : null

    var tableName = 'question';
    self.apiServiceInstance.findDataAll(tableName, criteria, function (err, questionData) {
        if (questionData.length) {
            responseObject['status'] = true;
            responseObject['data'] = questionData;
            callback(null, responseObject);
        } else {
            callback(null, errorResponseObj);

        }
    });
};

ApiActions.prototype.getAssessmentQuestion = function (req, callback) {
    console.log("Entered into get Assessment Question &Action");
    var self = this;
    var reqObject = req.body;
    var responseObject = {};
    if (req.body.page == 0) {
        req.body.page = 1;
    }
    var errorResponseObj = {
        status: false,
        statuscode: 204,
        data: {}
    };
    var query = {
        course: reqObject.course,
        grade: reqObject.grade,
        type: reqObject.type,
        manipulatives: reqObject.manipulatives,
        library:reqObject.library
    };
    if (reqObject.specificexpID != '' || reqObject.specificexpID == null) {
        query['specificexpID'] = {$in: reqObject.specificexpID}
    } else {
        query['strand'] = req.body.strand;
        query['generalexp'] = req.body.generalexp;
        query['specificexp'] = req.body.specificexp;
   }
    if (req.body.manipulatives == 'true') {
        delete query.manipulatives;
    }
    //Remove undefined and empty key from JSON
    for (var i in query) {
        if (query[i] === null || query[i] === undefined || query[i] === '') {
            delete query[i];
        }
    }
    var questionTableName = 'question';
    var criteria = {
        condition: query
    };
    if (req.body.assignment == 'selectedQ') {
        self.apiServiceInstance.findDataAll(questionTableName, criteria, function (err, questionData) {
            if (questionData.length) {
                responseObject['status'] = true;
                responseObject['count'] = questionData.length;
                responseObject['data'] = _.shuffle(questionData);
                callback(null, responseObject);
            } else {
                callback(null, errorResponseObj);

            }
        });

    } else if (req.body.assignment == 'randomQ') {
        var mylimit = parseInt(req.body.limit)
        if (req.body.presentQuestion.length >= req.body.limit) {
            var findQuery = {};
            findQuery['questionID'] = {$in: req.body.presentQuestion};
            var questionTableName = 'question';
            var criteria2 = {
                condition: findQuery,
                limit: mylimit
            };
            self.apiServiceInstance.findDataAll(questionTableName, criteria2, function (err, randomQuestionData) {
                if (randomQuestionData.length) {
                    var chunkObject = lodash.chunk(randomQuestionData, 10);
                    var viewQuestionID = _.pluck(chunkObject[req.body.page - 1], 'questionID');
                    var findQuery = {};
                    findQuery['questionID'] = {$in: viewQuestionID};
                    var tableName = 'question';
                    var criteria3 = {
                        condition: findQuery
                    };
                    self.apiServiceInstance.findDataAll(tableName, criteria3, function (error, viewQuestionData) {
                        if (viewQuestionData.length) {
                            var finalData = _.shuffle(viewQuestionData);
                            responseObject['status'] = true;
                            responseObject['count'] = req.body.presentQuestion.length;
                            responseObject['data'] = finalData;
                            responseObject['totalData'] = randomQuestionData;
                            callback(null, responseObject)
                        } else {
                            callback(null, errorResponseObj)
                        }
                    })
                } else {
                    callback(null, errorResponseObj)
                }
            })
        }
        else {
            var tablename = 'question';
            var criteria4 = {
                condition: query
            };
            self.apiServiceInstance.findDataAll(tablename, criteria4, function (err, datacount) {
                if (datacount.length > 0) {
                    var finalData = _.shuffle(datacount);
                    var chunkObject = lodash.chunk(finalData, req.body.limit);
                    var finalData = _.shuffle(chunkObject);
                    responseObject['status']=true;
                    responseObject['count'] = chunkObject[0].length;
                    responseObject['data'] = finalData[0];
                    callback(null, responseObject)
                } else {
                    callback(null, errorResponseObj)
                }
            });
        }
    } else {
        var tablename = 'question';
        var criteria4 = {
            condition: query
        };
        self.apiServiceInstance.findDataAll(tablename, criteria4, function (error, questionResult) {
            if (questionResult.length) {
                var finalData = _.shuffle(questionResult);
                responseObject['status'] = true;
                responseObject['count'] = questionResult.length;
                responseObject['data'] = finalData;
                callback(null, responseObject)
            } else {
                callback(null, errorResponseObj)
            }

        });
    }
};

ApiActions.prototype.createAssessment = function (req, callback) {
    var self = this;
    var reqObject = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status: false,
        statuscode: 204,
        data: {}
    };
    var counterTableName = 'counter';
    var condition = {
        condition: {_id: "test"},
        sortOrder: [
            ['_id', 'asc']
        ],
        updateData: {$inc: {seq: 1}},
        newUp: {new: true, upsert: true}

    };

    self.apiServiceInstance.findAndModifyDocument(condition, counterTableName, function (err, result) {
        if (result) {
            var testCount = result.value.seq;
            var criteria = {
                testID: 'TP' + testCount,
                course: reqObject.course,
                grade: reqObject.grade,
                startdate: reqObject.startdate,
                enddate: reqObject.enddate,
                username: reqObject.username,
                ingrade: reqObject.ingrade,
                library: reqObject.library,
                type: reqObject.type,
                assessmentName: reqObject.assessmentName
            };
            var testTablename = 'test';
            self.apiServiceInstance.insert(criteria, testTablename, function (err, testResult) {
                if (testResult) {
                    var question_ids = reqObject.question_id;
                    var criteria2 = {
                        testID: 'TP' + testCount,
                        questions: question_ids
                    };
                    var testquestionTablename = 'testquestion';
                    self.apiServiceInstance.insert(criteria2, testquestionTablename, function (err, testquestionResult) {
                        if (testquestionResult) {
                            responseObject['status'] = true;
                            responseObject['testdata'] = testResult;
                            responseObject['testQuestiondata']=testquestionResult;
                            callback(null, responseObject);
                        } else {
                            callback(null, errorResponseObj);
                        }
                    });
                } else {
                    callback(null, errorResponseObj);
                }
            });
        } else {
            callback(null, errorResponseObj);
        }
    });
};

ApiActions.prototype.getStrandColor = function (req, callback) {
    var self = this;
    var reqObject = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status: false,
        statuscode: 204,
        data: {}
    };
    var tableName='strands';
    var criteria={ };
    self.apiServiceInstance.findDataAll(tableName,criteria, function (err, strandsData) {
        if (strandsData) {
            var result = strandsData;
            delete result["_id"];
            responseObject['status']=true;
            responseObject['data']=result
            callback(null, responseObject);
        } else {
            callback(null, errorResponseObj);
        }
    });

};


ApiActions.prototype.getTestsList = function (req, callback) {
    console.log("Entered in to getTestsList ---");
    var self = this;
    var reqObject = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status: false,
        statuscode: 204,
        data: {}
    };

    var testTableName = "test";

    var today = new Date;

    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    var date = today;


    var endrest = moment(date).format('YYYY-MM-DD');

    var query = {
        username : reqObject.username,
        enddate: {
            $gte: endrest
        }

    }
    var criteria = {
        condition : query
    }

    self.apiServiceInstance.findDataAll(testTableName, criteria, function (error, testDataResult){
        // console.log(testDataResult, "testDataResult -----");
        if(testDataResult.length > 0){
            responseObject['status'] = true;
            responseObject['data'] = testDataResult;
            callback(null, responseObject);
            callback()
        }else{
            callback(null, errorResponseObj);
        }
    })

}


ApiActions.prototype.getTestQuesList = function (req, callback) {
    console.log("Entered into getTestQuesList -----");
    var self = this;
    var reqObject = req.body;
    var responseObject = {};
    var errorResponseObj = {
        status: false,
        statuscode: 204,
        data: {}
    };

    var testTableName = "test";
    var testQuesTableName = "testquestion";

    var query = {
       testID : reqObject.testID
    };

    var criteria = {
        condition : query
    };

    self.apiServiceInstance.findDataAll(testTableName, criteria, function (error, testResult){
        if(testResult.length > 0){

            self.apiServiceInstance.findOne(query,testQuesTableName, function (error, testQuesResult){
                if(testQuesResult){

                    var testQuestions = testQuesResult.questions;

                    var query={};
                    query['$or']=[];
                    for(var i=0;i<testQuestions.length;i++){
                        query['$or'].push({questionID:testQuestions[i].questionID});
                    }
                    var quesTableName = "question";

                    self.apiServiceInstance.find(query,{}, quesTableName, function (error, quesResult) {
                        if(quesResult){
                            responseObject['status'] = true;
                            responseObject['data'] = quesResult;
                            callback(null,responseObject);
                        }else{
                            callback(null,errorResponseObj);
                        }
                    })
                }else{
                    callback(null,errorResponseObj);
                }
            })
        }else{
            callback(null,errorResponseObj);
        }
    })

}
