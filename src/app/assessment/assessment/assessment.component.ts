import {Component, OnInit, NgZone} from '@angular/core';
import {isBoolean} from 'util';
import {HttpClient} from '@angular/common//http';
import {_} from 'underscore';

declare var $: any;
const API_URL = 'http://localhost:3002';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  // displayQuestionList: boolean = false;
  displayQuestionList = false;
  DisplayConfirmDetails = false;
  filterSection = true;
  assesdetails = true;


  private courseList;
  private bothCourseGrade;
  private gradeList;
  private assessment: any = {
    selectedCourse: '',
    selectedGrade: '',
    // assessmentName: '',
    pinRequired: true,
    testType: 'practice',
    retest: true,
    showResult: true,
    assessmentType: 'selectedQ',
    quesLib: 'public',
    quesType: '',
    manipulatives: 'true',


  };
  private limit: number = 10;
  private qLimit: number = 3;
  private page: number = 0;
  private strands: any = '';
  private assessmentName: string;
  private generalExp: string = '';
  private presentQuestion: string[] = [];
  private color: any;


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {



    // this.strands = "";
    $('.datepicker').datepicker({
      minDate: 0,
      dateFormat: 'yy-mm-dd',
      showOn: 'button',
      buttonImage: 'assets/img/calendar24blk.png',
      buttonImageOnly: true,
      onSelect: function (selectedDate) {

      },
    }).datepicker('setDate', new Date());
    $('.datepicker1').datepicker({
      minDate: 0,
      dateFormat: 'yy-mm-dd',
      showOn: 'button',
      buttonImage: 'assets/img/calendar24blk.png',
      buttonImageOnly: true,
    }).datepicker('setDate', new Date());
    $('#startTime').timepicker({
      timeFormat: 'h:i A',
      interval: 30, // 60 minutes
      scrollDefaultNow: 'now',
      minTime: new Date(),

    });
    $('#endTime').timepicker({
      timeFormat: 'h:i A',
      interval: 30, // 60 minutes
      scrollDefaultNow: 'now',
      minTime: new Date(),
    });
    this.httpClient.post(API_URL + '/getCourseGrade', {}).subscribe(data => {
        var Data: any = data;
        if (Data.status) {
          this.courseList = Data.data[0].course;
          this.bothCourseGrade = Data.data[0].courseandgrade;
          this.assessment.selectedCourse = this.courseList[0];
          this.CourseChanged();
        } else {

        }

      },
      err => {
        console.log(err);
      });

    this.httpClient.post(API_URL + '/getStrandColor', {}).subscribe(data => {
      var colorsOfStrand: any = data;
      // console.log("color",colorsOfStrand.data)
      if (colorsOfStrand.status) {
        this.color = colorsOfStrand.data[0];
      }

    });


  }

  CourseChanged() {
    this.displayQuestionList = false;
    for (let i in this.bothCourseGrade) {
      if (this.assessment.selectedCourse == this.bothCourseGrade[i].course) {
        this.gradeList = this.bothCourseGrade[i].grade;
        // console.log(this.gradeList)
      }

    }
    this.assessment.selectedGrade = this.gradeList[0];
    this.gradeChanged();


  }


  private specificID: any;
  private strandsArry: any;

  gradeChanged() {
    this.displayQuestionList = false;
    let selCourse: any;
    let selGrade: any;
    selCourse = this.assessment.selectedCourse;
    selGrade = this.assessment.selectedGrade;
    // let reqObj: any
    // reqObj = {

    // }
    this.httpClient.post(API_URL + '/getStrand', {course: selCourse, grade: selGrade}).subscribe(data => {
        var strandResp: any = data;
        if (strandResp.status) {
          this.specificID = _.pluck(strandResp.data[0].specificexpID, 'specificexpID');
          this.specificID = _.flatten(this.specificID);
          this.strandsArry = strandResp.data[0].strand;
          this.strandChanged();
          // this.strandsArry[0].
        } else {

        }
      },
      err => {
        console.log(err);
      });
  }

  onchangeToHideQuesFiled() {
    this.displayQuestionList = false;
  }

  onLimitChange(searchValue: number) {
    this.displayQuestionList = false;
    this.qLimit = searchValue;
  }

  private generalExpArry: any;

  strandChanged() {
    let selCourse: any;
    let selGrade: any;
    let selStrand: any;
    this.displayQuestionList = false;
    selCourse = this.assessment.selectedCourse;
    selGrade = this.assessment.selectedGrade;
    selStrand = this.strands;
    if (_.isEmpty(selStrand)) {
      selStrand = '';
    }
    this.httpClient.post(API_URL + '/getGeneralExp', {
      course: selCourse,
      grade: selGrade,
      strand: selStrand
    }).subscribe(data => {
      // console.log("exp",data)
      let generalExpResp: any = data;
      if (generalExpResp.status) {
        this.generalExpArry = generalExpResp.data;
      } else {

      }

    });

  }

  private assessNameValidation: string;
  private assessmentQuestionList: any;
  private noQuesAvailable: string;
  // private zone: NgZone;
  private assessQuesList: any;
  private assessQuesCount: any;
  private start_date: any;
  private random: number;
  private totquestionsChunck: any;
  private totalpageCount: number;
  private AssessNameIsEmpty: boolean;

  showQuestionList() {


    if (_.isEmpty(this.assessmentName)) {
      this.displayQuestionList = false;
      this.AssessNameIsEmpty = true;
      this.assessNameValidation = 'Enter Assessment Name';
      // this.assessNameValidation =  "";

      // this.zone.fork().run(function() {
      setTimeout(function () {
        this.AssessNameIsEmpty = false;
      }.bind(this), 2500);
      // })

    }
    else {


      var requestObject = {};


      requestObject['course'] = this.assessment.selectedCourse,
        // requestObject['class'] =
        requestObject['grade'] = this.assessment.selectedGrade,
        requestObject['library'] = this.assessment.quesLib,
        requestObject['type'] = this.assessment.quesType,
        requestObject['manipulatives'] = this.assessment.manipulatives,
        requestObject['specificexpID'] = this.specificID,
        requestObject['page'] = this.page,
        requestObject['limit'] = this.limit,
        requestObject['qlimit'] = this.qLimit,
        requestObject['presentQuestion'] = this.presentQuestion;
      // requestObject['username'] = 'admin'
      requestObject['assignment'] = this.assessment.assessmentType;
      if (this.assessment.assessmentType === 'randomQ') {
        requestObject['limit'] = this.qLimit;
      }
      this.httpClient.post(API_URL + '/getAssessmentQuestion', requestObject).subscribe(data => {
        let assessQuestionListResp: any = data;
        if (assessQuestionListResp.status) {
          this.displayQuestionList = true;
          this.page = 1;
          this.assessQuesList = assessQuestionListResp.data;
          this.assessQuesCount = assessQuestionListResp.count;
          if (this.assessment.assessmentType === 'randomQ') {
            this.overAllSelectedQues = assessQuestionListResp.data;
            var questionData: any = [];
            for (var i in this.overAllSelectedQues) {
              if (this.checkedQuestions[this.overAllSelectedQues[i].strand]) {
                var checkQuestionStandExist = [];
                for (var j = 0; j < this.checkedQuestions[this.overAllSelectedQues[i].strand].data.length; j++) {
                  checkQuestionStandExist.push(this.checkedQuestions[this.overAllSelectedQues[i].strand].data[j].questionID);
                }
                var checkData = _.contains(checkQuestionStandExist, this.overAllSelectedQues[i].questionID);
                if (checkData) {

                } else {

// console.log("this.checkedQuestions",this.checkedQuestiif not don't want on)
                  questionData = this.overAllSelectedQues[i];
                  questionData['checked'] = true;
                  this.checkedQuestions[this.overAllSelectedQues[i].strand].data.push(questionData);
                }
              }
              else {
                questionData = this.overAllSelectedQues[i];
                questionData['checked'] = true;
                this.checkedQuestions[this.overAllSelectedQues[i].strand] = {
                  name: this.overAllSelectedQues[i].strand,
                  data: []
                };
                this.checkedQuestions[this.overAllSelectedQues[i].strand].data.push(this.overAllSelectedQues[i]);
              }
            }
          }
          this.random = _.random(1000, 9999);
          this.totquestionsChunck = chunkArray(assessQuestionListResp.data, 10);
          if (requestObject['page'] == 0) {
            this.assessQuesList = this.totquestionsChunck[requestObject['page']];
          } else {
            this.assessQuesList = this.totquestionsChunck[requestObject['page'] - 1];
          }
          this.totalpageCount = Math.ceil(this.assessQuesCount / 10);
        }
        else {
          this.displayQuestionList = false;
          this.noQuesAvailable = 'No Question Available';
          setTimeout(function () {
            this.noQuesAvailable = '';
          }, 1000);

        }
      });

    }

    function chunkArray(myArray, chunk_size) {
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];

      for (index = 0; index < arrayLength; index += chunk_size) {
        var myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
      }

      return tempArray;
    }


  }

  private checkedQuestions = {};
  private checkedQuestion = [];
  private overAllSelectedQues = [];
  private indexOfQues: any;
  private result: any;

  //  private indexOfQues: number;
  selectedQuestion(ques) {


    if (this.overAllSelectedQues.length > 0) {
      for (var k in this.overAllSelectedQues) {
        if (this.overAllSelectedQues[k].questionID == ques.questionID) {
          var index = 0;
          this.indexOfQues = k;
          this.checkedQuestions['checked'] = false;
          break;
        } else {
          var index = -1;
        }
      }

    }
    else {
      var index = -1;
    }

    if (index > -1) {
      this.checkedQuestions[ques.strand].splice(this.indexOfQues, 1);

      for (var m = 0; m < this.checkedQuestions[ques.strand].data.length; m++) {
        if (this.checkedQuestions[ques.strand].data[m].questionID == ques.questionID) {
          this.checkedQuestions[ques.strand].splice(m, 1);
        }

      }
      if (_.isEmpty(this.checkedQuestions[ques.strand].data)) {
        delete this.checkedQuestions[ques.strand];
      }


    }
    else {
      this.overAllSelectedQues.push(ques);
      this.checkedQuestions['checked'] = false;


      if (this.checkedQuestions[ques.strand]) {
        this.checkedQuestions[ques.strand].data.push(ques);
      } else {
        this.checkedQuestions[ques.strand] = {
          name: ques.strand,
          data: []
        };
        this.checkedQuestions[ques.strand].data.push(ques);
        // console.log("*****else", this.checkedQuestions)
        // getObjectinArray(ques)


      }


      //  this.checkedQuestion.push(ques)

      //  var selectedQues =  this.overAllSelectedQues

      //   class Job {
      //    strandName: any = ques.strand;
      //    data: Transaction[] = selectedQues;
      //  }


      // class Transaction {}
      // let myjob = new Job();
      //  this.checkedQuestions = myjob.data;


      this.checkedQuestions['checked'] = true;


    }
  }

  next() {
    this.page += 1;
    this.assessQuesList = this.totquestionsChunck[this.page - 1];

  }

  previous() {
    this.page -= 1;
    this.assessQuesList = this.totquestionsChunck[this.page - 1];
  }

  private indexOf1: any;
  private selectedQuesval: boolean;
  private deSelectedQues: any;
  private removedQuestion: any = [];

  deselectedQues(ques1) {

    this.selectedQuesval = false;
    this.checkedQuestions['checked'] = false;
    this.deSelectedQues = this.overAllSelectedQues;
    // console.log("this.overAllSelectedQues", this.overAllSelectedQues)
    for (var i in this.deSelectedQues) {
      if (this.deSelectedQues[i].questionID == ques1.questionID) {
        var index1 = 0;
        this.indexOf1 = i;
        this.selectedQuesval = true;
        break;
      } else {
        var index1 = -1;
      }

    }

    if (this.selectedQuesval == true) {
      this.overAllSelectedQues.splice(this.indexOf1, 1);
      this.removedQuestion.push(ques1.questionID);

    }
    else {
      this.overAllSelectedQues.push(ques1);
      this.removedQuestion = [];
    }

  }


  private quesSelecValidation: string;
  private startDate: any;
  private endDate: any;
  private start_Time: any;
  private end_Time: any;

  assignAssessment() {
    // this.question1 =  this.checkedQuestion


    this.startDate = (<HTMLInputElement>document.getElementById('datepickerStart')).value;
    this.endDate = (<HTMLInputElement>document.getElementById('datepickerEnd')).value;
    this.start_Time = (<HTMLInputElement>document.getElementById('startTime')).value;
    this.end_Time = (<HTMLInputElement>document.getElementById('endTime')).value;
    // const value: string = element.value;
    if (_.isEmpty(this.overAllSelectedQues)) {
      this.quesSelecValidation = 'Please select Question';
      this.DisplayConfirmDetails = false;
      setTimeout(function () {
        this.quesSelecValidation = '';
      }.bind(this), 2500);
    }
    else {
      this.DisplayConfirmDetails = !this.DisplayConfirmDetails;
      // this.assessmentDetails = !this.assessmentDetails;
      this.assesdetails = false;
      this.filterSection = !this.filterSection;
      this.displayQuestionList = !this.displayQuestionList;


    }


  }

  getObjectinArray(obj) {
    this.result = [];
    for (var key in obj) {
      if (key !== 'checked') {

        if (obj.hasOwnProperty(key)) {
          this.result.push(obj[key]);
        }
      }

    }
    return this.result;
  }

  getObjectinArrays(obj) {
    if (key !== 'data') {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          this.result.push(obj[key]);
        }

      }
      return this.result;
    }
  }

  assessmentBack() {
    this.displayQuestionList = true;
    this.DisplayConfirmDetails = false;
    // this.assessmentDetails = true;
    this.assesdetails = true;
    this.filterSection = true;
    let question_strand_fieldName = Object.keys(this.checkedQuestions);
    for (var i in question_strand_fieldName) {
      let question_strand_Name = question_strand_fieldName[i];
      var eachStandBased = this.checkedQuestions[question_strand_Name].data;

      for (var k in this.removedQuestion) {
        for (var j in eachStandBased) {
          if (this.removedQuestion[k] == eachStandBased[j].questionID) {
            this.checkedQuestions[question_strand_Name].data.splice(j, 1);

            if (_.isEmpty(this.checkedQuestions[question_strand_Name].data)) {
              delete this.checkedQuestions[question_strand_Name];
            }


          }
        }

      }


    }


  }

  assessmentCancel() {
    this.overAllSelectedQues = [];
    this.displayQuestionList = false;
    this.DisplayConfirmDetails = false;
    // this.assessmentDetails = true;
    this.assesdetails = true;
    this.filterSection = true;
  }

  private assessmentSaveSucc: string;
  private assessmentSaveFail: string;

  saveAssessment() {
    if (!_.isEmpty(this.overAllSelectedQues)) {
      var requestObject = {};
      requestObject['course'] = this.assessment.selectedCourse;
      requestObject['grade'] = this.assessment.selectedGrade;
      requestObject['assessmentName'] = this.assessmentName;
      requestObject['startdate'] = this.startDate;
      requestObject['enddate'] = this.endDate;
      requestObject['pin'] = this.random;
      requestObject['question_id'] = [];
      requestObject['username'] = 'ramya';
      requestObject['starttime'] = this.start_Time;
      requestObject['endtime'] = this.end_Time;
      for (var j in this.overAllSelectedQues) {
        requestObject['question_id'].push({
          questionID: this.overAllSelectedQues[j].questionID
        });
      }
      this.httpClient.post(API_URL + '/createAssessment', requestObject).subscribe(data => {

        let assessSaveResp: any = data;

        if (assessSaveResp.status) {

          this.assessmentSaveSucc = 'Assessment Created Successfully';
          setTimeout(function () {
            this.assessmentSaveSucc = '';
            this.overAllSelectedQues = [];
            this.displayQuestionList = false;
            this.DisplayConfirmDetails = false;
            this.assesdetails = true;
            this.filterSection = true;
            this.assessmentName = '';
          }.bind(this), 2500);
          // setTimeout(function () {
          //   this.overAllSelectedQues = [];
          //   this.displayQuestionList = false;
          //   this.DisplayConfirmDetails = false;
          //   this.assesdetails = true;
          //   this.filterSection = true;
          // }, 500);


        } else {
          this.assessmentSaveFail = 'OOPS please try again later';
          setTimeout(function () {
            this.assessmentSaveFail = '';
          }.bind(this), 2500);
        }

      });
    }
    else {
      this.assessmentSaveFail = 'Please select atleast one questions to save the Assessment';
      setTimeout(function () {
        this.assessmentSaveFail = '';
      }.bind(this), 2500);
    }

  }

}
