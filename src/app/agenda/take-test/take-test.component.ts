import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  constructor() { }
  ques:any = [{"_id":"59aec2993ecd953dc5f5fff7","questionID":"QM0254","creator":"ADMT00001","course":"Math","grade":"3","strand":"Geometry and Spatial Sense","generalexp":"Geometric Properties","specificexp":"compare and sort prisms and pyramids by geometric properties","specificexpID":"EXP00159","type":"multi","part1":"","part2":"","line1":"What shape can be made from the shapes below?","line2":"","line3":"","line4":"","line5":"","line6":null,"image1":"","image2":null,"image3":null,"answer1":"octagonal-based pyramid","answer2":"pentagonal-based pyramid","answer3":"rectangular-based pyramid","answerimage1":null,"answerimage2":null,"answerimage3":null,"correctanswer":"hexagonal-based pyramid","correctanswerimage":null,"manipulatives":"false","library":"public"},{"_id":"59aec2993ecd953dc5f5fffa","questionID":"QM0396","creator":"ADMT00001","course":"Math","grade":"3","strand":"Measurement","generalexp":"Attributes, Units, and Measurement Sense","specificexp":"estimate, read, and record positive temperatures to the nearest degree Celsius","specificexpID":"EXP00143","type":"multi","part1":"","part2":"","line1":"Which of the thermometers below shows 20°C?","line2":"","line3":"","line4":"","line5":"","line6":null,"image1":"","image2":null,"image3":null,"answer1":".","answer2":".","answer3":".","answerimage1":null,"answerimage2":null,"answerimage3":null,"correctanswer":".","correctanswerimage":null,"manipulatives":"false","library":"public"},{"_id":"59afc107fde2eb56bf3b66ea","questionID":"QM0443","creator":"ADMT00001","course":"Math","grade":"3","strand":"Measurement","generalexp":"Attributes, Units, and Measurement Sense","specificexp":"estimate, measure, and record the capacity of containers, using the standard unit of the litre or parts of a litre","specificexpID":"EXP00149","type":"multi","part1":"","part2":"","line1":"Which of the following is the most appropriate unit to measure the amount of water in a water pitcher?","line2":"","line3":"","line4":"","line5":"","line6":null,"image1":"","image2":null,"image3":null,"answer1":"gram","answer2":"metre","answer3":"kilometre","answerimage1":null,"answerimage2":null,"answerimage3":null,"correctanswer":"litre","correctanswerimage":null,"manipulatives":"false","library":"public"}]
multiExist:boolean = false;
questionno:number;
quesPerPage:number = 1;
currentPage:number = 0;
sectionCount:number = 0;
nonmanCount:number = 0;
stFrom:number = 0;
currentSection:number = 1;
openres:string = "Next";
typecheck:string ="false";
lastres:string = "false";
OpenQuestion:string = 'false';
success = false;
successCongrates = false;
headerShow = false;
testEnd = false;
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
total_questionlength;
secondSection;
question_ans = [];
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

            if (this.total_question.length > 20) {
                this.secondSection = Math.round(this.total_question.length / 2);
            } else {
                this.secondSection = 1000;
            }

            if (this.manupulength > 0 && this.nonmanulength > 0) {

                this.total_questionlength = this.total_question.length + 1;
            } else {
                this.total_questionlength = this.total_question;

            }
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
  next(){
  	
  if (this.currentPage != 0 && this.stFrom != this.secondSection) {
  	console.log('hi');	
  }
  else if (this.question_ans.length == 2) {
    alert('hi');
   }
  else{
  	if (this.total_question.length == (this.stFrom + this.quesPerPage)) {
                //this.stFrom=0;
        }
        if (this.stFrom == this.secondSection) {
                this.sectionCount = 1;
                this.currentSection = 2;
                this.secondSection = 1000;
                this.headerShow = false;

                if(this.quesPerPage==2)
                {
                    if(this.nonmanulength!=this.nonmanCount)
                    {
                        if(this.nonmanulength==this.nonmanCount+1 || this.nonmanulength==this.nonmanCount+2)
                            this.nonmanCount=this.nonmanulength;
                    }
                }
                else
                {
                    if(this.nonmanulength+1!=this.nonmanCount)
                    {
                        if(this.nonmanulength+1==this.nonmanCount+1)
                            this.nonmanCount=this.nonmanulength;
                    }
                }

            }

              if (this.total_question[this.stFrom] != undefined) {
                if (this.total_question[this.stFrom].type == "text" || this.total_question[this.stFrom].type == "open") {
                    this.quesPerPage = 1;
                } else if (this.total_question[this.stFrom + 1] != undefined) {
                    if (this.total_question[this.stFrom + 1].type == "text" || this.total_question[this.stFrom + 1].type == "open") {
                        this.quesPerPage = 1;
                    } else {
                        this.quesPerPage = 2;
                    }
                } else {
                    this.quesPerPage = 1;
                }
            }

              if (this.quesPerPage == 2) {
                if (this.nonmanulength + 1 != this.nonmanCount && this.nonmanulength > 0) {
                    if (this.nonmanulength + 1 == this.nonmanCount + 1 || this.nonmanulength + 1 == this.nonmanCount + 2)
                        this.quesPerPage = 1;
                }
            }

              if (this.quesPerPage == 2) {
                if (this.nonmanulength + 1 != this.nonmanCount) {
                    if (this.nonmanulength + 1 == this.nonmanCount + 1 || this.nonmanulength + 1 == this.nonmanCount + 2)
                        this.nonmanCount = this.nonmanulength;
                }
            } else {
                if (this.nonmanulength + 1 != this.nonmanCount) {
                    if (this.nonmanulength + 1 == this.nonmanCount + 1)
                        this.nonmanCount = this.nonmanulength;
                }
            }

               if ((this.stFrom + 1) >= this.total_question.length) {
                if (this.total_question[0].type == "text" || this.total_question[0].type == "open") {
                    this.openres = "Mark your test";
                    this.lastres = "true";
                    this.typecheck = "true";
                }
                if (this.total_question[0].type == "open") {
                    this.OpenQuestion = "true";
                }
            } else {
                // alert("dec"+this.nonmanulength)
                if (this.nonmanulength == 0) {
                    this.nonmanulength = 1000;
                }

            }

            if (this.total_question.length == (this.stFrom + this.quesPerPage)) {
                this.testEnd = true;
                //  this.stFrom=0;
            }
            // this.spinner = false;
            this.currentPage = this.currentPage + 1;
  }
  }


  check_index(pos){
  	var index = this.total_question.indexOf(pos);
  	this.question_ans.push(pos);
  }

}
