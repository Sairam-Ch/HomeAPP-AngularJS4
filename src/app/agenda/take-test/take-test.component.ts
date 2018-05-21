import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  constructor() { }
  ques:any = [
{
    "_id": "59afa15e6c7fba4364ef9b85",
    "questionID": "QM0286",
    "creator": "ADMT00001",
    "course": "Math",
    "grade": "3",
    "strand": "Geometry and Spatial Sense",
    "generalexp": "Location and Movement",
    "specificexp": "complete and describe designs and pictures of images that have a vertical, horizontal, or diagonal line of symmetry",
    "specificexpID": "EXP00168",
    "type": "multi",
    "part1": "",
    "part2": "",
    "line1": "How many lines of symmetry are there in the shape below?",
    "line2": "",
    "line3": "",
    "line4": "",
    "line5": "",
    "line6": null,
    "image1": "faa23b70-c00e-11e6-a2a1-c7a02103acfe.png",
    "image2": null,
    "image3": null,
    "answer1": "1",
    "answer2": "4",
    "answer3": "3",
    "answerimage1": null,
    "answerimage2": null,
    "answerimage3": null,
    "correctanswer": "2",
    "correctanswerimage": null,
    "manipulatives": "false",
    "library": "public"
},
{
    "_id": "59afc065fde2eb56bf3b66d0",
    "questionID": "QM0407",
    "creator": "ADMT00001",
    "course": "Math",
    "grade": "3",
    "strand": "Measurement",
    "generalexp": "Attributes, Units, and Measurement Sense",
    "specificexp": "identify benchmarks for freezing, cold, cool,warm, hot, and boiling temperatures as they relate to water and for cold, cool, warm, and hot temperatures as they relate to air",
    "specificexpID": "EXP00144",
    "type": "multi",
    "part1": "",
    "part2": "",
    "line1": "Kardinal is making Kraft Dinner for his family.  He puts the water on and waits for it to boil.  He tells his brother the temperature needs to be how how before he puts in the pasta?",
    "line2": "",
    "line3": "",
    "line4": "",
    "line5": "",
    "line6": null,
    "image1": "",
    "image2": null,
    "image3": null,
    "answer1": "100°F",
    "answer2": "30°C",
    "answer3": "32°C",
    "answerimage1": null,
    "answerimage2": null,
    "answerimage3": null,
    "correctanswer": "100°C",
    "correctanswerimage": null,
    "manipulatives": "false",
    "library": "public"
}
];
multiExist:boolean = false;
questionno:number;
quesPerPage:number = 1;
currentPage = 0;
openres:string = "Next";
typecheck:string ="false";
success = false;
successCongrates = false;
headerShow = false;
course;
grade;
textQuesCount;
manupu;
non_manu;
manupulength;
nonmanulength;
total_question;
total_question_bkp;
strandObj = {};
  ngOnInit() {

  	if(this.ques){
            var text_ques = [];
            var multi_ques = [];
            var course = 'Math';
            var manu = [];
            var non_manu = [];
            var manuopen = [];
            var non_manuopen = [];
            var manumultiple = [];
            var manutext = [];
            var non_manumultiple = [];
            var non_manutext = [];
            var total_question = [];
            this.questionno = 1;
            this.course = this.ques[0].course;
            this.grade =  this.ques[0].grade;

            for (var i = 0; i < this.ques.length; i++) {
                this.ques[i]['actualanswer'] = this.ques[i].correctanswer;
                this.ques[i]['actualimageanswer'] = this.ques[i].correctanswerimage;
                //course = ques[i].course;
                if (this.ques[i].manipulatives == "true") {
                    manu.push(this.ques[i]);
                }

                if (this.ques[i].manipulatives == "false") {
                    non_manu.push(this.ques[i])
                }
                // console.log("idas ",this.ques[i].questionID);
            }
             for (var i = 0; i < manu.length; i++) {
                if (manu[i].type == "multi") {
                    this.multiExist = true;
                    manumultiple.push(manu[i]);
                }
                if (manu[i].type == "text") {
                    manutext.push(manu[i])
                }

                if (manu[i].type == "open") {
                    manuopen.push(manu[i])
                }
            }

           for (var i = 0; i < non_manu.length; i++) {
                if (non_manu[i].type == "multi") {
                    this.multiExist = true;
                    non_manumultiple.push(non_manu[i]);
                }
                if (non_manu[i].type == "text") {
                    non_manutext.push(non_manu[i])
                }

                if (non_manu[i].type == "open") {
                    non_manuopen.push(non_manu[i])
                }
            }
         this.textQuesCount = manutext.length + non_manutext.length;course

          this.manupu = manu;
          this.non_manu = non_manu;
          this.manupulength = this.manupu.length;
          this.nonmanulength = this.non_manu.length;

           for (var n = 0; n < non_manumultiple.length; n++) {
                total_question.push(non_manumultiple[n])
            }
            for (var n = 0; n < non_manutext.length; n++) {
                total_question.push(non_manutext[n])
            }

            for (var k = 0; k < non_manuopen.length; k++) {
                total_question.push(non_manuopen[k])
            }

            for (var k = 0; k < manumultiple.length; k++) {
                total_question.push(manumultiple[k])
            }

            for (var k = 0; k < manutext.length; k++) {
                total_question.push(manutext[k])
            }

            for (var k = 0; k < manuopen.length; k++) {
                total_question.push(manuopen[k])
            }

            for (var i = 0; i < total_question.length; i++) {
                total_question[i].questionno = this.questionno++;
            }

            this.total_question = total_question;
            this.total_question_bkp = total_question;
            console.log(this.total_question);
          var flags = [], strandarr = [];

        for( var i=0; i<this.ques.length; i++) {
            if( flags[this.ques[i]['strand']]) continue;
            flags[this.ques[i]['strand']] = true;
            strandarr.push(this.ques[i]);
        }
        console.log(strandarr);
          for (var k = 0; k < strandarr.length; k++) {
                var count = 0;
                this.strandObj[strandarr[k].strand] = {};
                this.strandObj[strandarr[k].strand].correctcount = 0;
                for (var i = 0; i < this.total_question.length; i++) {
                    if (this.total_question[i].strand == strandarr[k].strand) {
                        count++;
                    }
                }
                this.strandObj[strandarr[k].strand].totalcount = count;
            }
              if (this.multiExist == true) {
                if (this.total_question[0] != undefined || this.total_question[1] != undefined) {
                    if ((this.total_question[0].type == "text" || this.total_question[1].type == "text") || (this.total_question[0].type == "open" || this.total_question[1].type == "open")) {
                        this.quesPerPage = 1;

                    } else {
                        this.quesPerPage = 2;
                    }
                }
            } else {
                this.quesPerPage = 1;
            }
            if (this.total_question[0].type == "text") {
                this.openres = "Next";
                this.typecheck = "true";
            }
  	}
  }

}
