import { Component, OnInit } from '@angular/core';
import {isBoolean} from 'util';
declare var $: any;
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

  constructor() { }

  ngOnInit() {
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
  }

  showQuestionList () {
   this.displayQuestionList = !this.displayQuestionList;
  }

  assignAssessment () {
    this.DisplayConfirmDetails = !this.DisplayConfirmDetails;
    // this.assessmentDetails = !this.assessmentDetails;
   this.assesdetails = false;
    this.filterSection = !this.filterSection;
    this.displayQuestionList = !this.displayQuestionList;
  }

  back() {
    this.displayQuestionList = true;
    this.DisplayConfirmDetails = false;
    // this.assessmentDetails = true;
    this.assesdetails = true
    this.filterSection = true;
  }

  cancel() {
    this.displayQuestionList = false;
    this.DisplayConfirmDetails = false;
    // this.assessmentDetails = true;
    this.assesdetails = true
    this.filterSection = true;
  }

}
