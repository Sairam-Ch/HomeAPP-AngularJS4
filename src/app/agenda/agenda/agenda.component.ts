import { Component, OnInit } from '@angular/core';

declare var require: any

declare var $:any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor() { }
 events = [];
data = [
{
    "_id": "5af00afb955d201b25c35642",
    "target": "class",
    "show_result": "true",
    "pin_required": false,
    "retest": "false",
    "testtype": "practice",
    "library": "private",
    "Temlibrary": "public",
    "type": "open",
    "class": "CL00091",
    "course": "Math",
    "grade": "3",
    "classname": "Class 10012",
    "group": "",
    "student": "",
    "assessmentName": "Assessment Open",
    "startdate": "2018-05-20",
    "enddate": "2018-05-22",
    "pin": 4284,
    "ingrade": true,
    "inCourse": true,
    "username": "TCH0000001",
    "locationID": "LOC00001",
    "starttime": "8:00 AM",
    "endtime": "8:30 AM",
    "testID": "TP11019",
    "owner": "TCH0000001",
    "boardID": "BRD00001",
    "ministryID": "MNS00001"
},
{
    "_id": "5af032baa93e2f242debd9ff",
    "target": "class",
    "show_result": "true",
    "pin_required": false,
    "retest": "false",
    "testtype": "practice",
    "library": "private",
    "Temlibrary": "public",
    "type": "open",
    "class": "CL00091",
    "course": "Math",
    "grade": "3",
    "classname": "Class 10012",
    "group": "",
    "student": "",
    "assessmentName": "assessment all images",
    "startdate": "2018-05-15",
    "enddate": "2018-05-17",
    "pin": 1441,
    "ingrade": true,
    "inCourse": true,
    "username": "TCH0000001",
    "locationID": "LOC00001",
    "starttime": "7:30 AM",
    "endtime": "8:00 AM",
    "testID": "TP11021",
    "owner": "TCH0000001",
    "boardID": "BRD00001",
    "ministryID": "MNS00001"
},
{
    "_id": "5afbd6dfb081252b4c8cd34a",
    "target": "class",
    "show_result": "true",
    "pin_required": false,
    "retest": "false",
    "testtype": "formal",
    "library": "public",
    "Temlibrary": "public",
    "type": "",
    "class": "CL00091",
    "course": "Math",
    "grade": "3",
    "classname": "Class 10012",
    "group": "",
    "student": "",
    "assessmentName": "grdgd",
    "startdate": "2018-05-16",
    "enddate": "2018-05-16",
    "pin": 1809,
    "ingrade": true,
    "inCourse": true,
    "username": "TCH0000001",
    "locationID": "LOC00001",
    "starttime": "",
    "endtime": "",
    "testID": "TF11023",
    "owner": "TCH0000001",
    "boardID": "BRD00001",
    "ministryID": "MNS00001"
},
{
    "_id": "5afbd6fbb081252b4c8cd34c",
    "target": "class",
    "show_result": "true",
    "pin_required": false,
    "retest": "false",
    "testtype": "practice",
    "library": "public",
    "Temlibrary": "public",
    "type": "",
    "class": "CL00091",
    "course": "Math",
    "grade": "3",
    "classname": "Class 10012",
    "group": "",
    "student": "",
    "assessmentName": "htf",
    "startdate": "2018-05-20",
    "enddate": "2018-05-20",
    "pin": 5076,
    "ingrade": true,
    "inCourse": true,
    "username": "TCH0000001",
    "locationID": "LOC00001",
    "starttime": "",
    "endtime": "",
    "testID": "TP11024",
    "owner": "TCH0000001",
    "boardID": "BRD00001",
    "ministryID": "MNS00001"
},
{
    "_id": "5afbd721b081252b4c8cd34e",
    "target": "class",
    "show_result": "true",
    "pin_required": false,
    "retest": "false",
    "testtype": "formal",
    "library": "public",
    "Temlibrary": "public",
    "type": "",
    "class": "CL00091",
    "course": "Math",
    "grade": "3",
    "classname": "Class 10012",
    "group": "",
    "student": "",
    "assessmentName": "vfgd",
    "startdate": "2018-05-18",
    "enddate": "2018-05-18",
    "pin": 5949,
    "ingrade": true,
    "inCourse": true,
    "username": "TCH0000001",
    "locationID": "LOC00001",
    "starttime": "",
    "endtime": "",
    "testID": "TF11025",
    "owner": "TCH0000001",
    "boardID": "BRD00001",
    "ministryID": "MNS00001"
},
{
    "_id": "5afbd759b081252b4c8cd350",
    "library": "",
    "type": "multi",
    "course": "Math",
    "grade": "3",
    "class": "CL00091",
    "classname": "Class 10012",
    "startdate": "2018-05-21",
    "enddate": "2018-05-21",
    "testtype": "ExitTicket",
    "pin": "",
    "pin_required": false,
    "target": "class",
    "show_result": "false",
    "retest": "false",
    "ingrade": true,
    "inCourse": true,
    "username": "TCH0000001",
    "locationID": "LOC00001",
    "starttime": "",
    "endtime": "",
    "testID": "TP11026",
    "owner": "TCH0000001",
    "boardID": "BRD00001",
    "ministryID": "MNS00001"
}];
formatDate(input) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(2), // get only two digits
            month = datePart[1],
            day = datePart[2];

        return month + '/' + day + '/' + year;
    }
    remove_duplicates(a, b,name) {
                    var arr = [];
                    if (a.length == 0) {
                        a.push({
                            Date: '',
                            addClass: '',
                            testType: ''
                        });
                    } else if (b.length == 0) {
                        b.push({
                            Date: '',
                            addClass: '',
                            testType: ''
                        })
                    }
                    for (var i = 0, len = a.length; i < len; i++) {
                        for (var j = 0, len2 = b.length; j < len2; j++) {
                            if (a[i].Date === b[j].Date) {
                                arr.push({
                                    Date: a[i].Date,
                                    className: name,
                                    testType: a[i].testType
                                });
                            }
                        }
                    }

                    return arr;
                };
                  merge(arg) {
                    var args = arg;
                    var hash = {};
                    var arr = [];
                    for (var i = 0; i < args.length; i++) {
                        for (var j = 0; j < args[i].length; j++) {
                            if (hash[args[i][j]] !== true) {
                                arr[arr.length] = args[i][j];
                                hash[args[i][j]] = true;
                            }
                        }
                    }
                    console.log(arr);
                    return arr;
                };
              remove_duplicates1(a, b) {
                    var arr = [];
                    if (a.length == 0) {
                        a.push({
                            Date: '',
                            addClass: '',
                            testType: ''
                        });
                    } else if (b.length == 0) {
                        b.push({
                            Date: '',
                            addClass: '',
                            testType: ''
                        })
                    }
                    for (var i = 0, len = a.length; i < len; i++) {
                        for (var j = 0, len2 = b.length; j < len2; j++) {
                            if (a[i].Date !== b[j].Date) {
                                arr.push({
                                    Date: a[i].Date,
                                    className: a[i].className,
                                    testType: a[i].testType
                                });
                            }
                        }
                    }

                    return arr;
                };
                finaloutput(a, b) {
                    var arr = [];
                    for (var i = 0, len = a.length; i < len; i++) {
                        for (var j = 0, len2 = b.length; j < len2; j++) {
                            if (a[i].Date === b[j].Date) {
                                arr.push(a[i] = b[j]);
                            }
                        }
                    }

                    return arr;
                }
  ngOnInit() {
 
   const events = this.events;
    console.log(this.events);
    const data = this.data;
      for (var i = 0; i < data.length; i++) {
                    if (data[i].testtype == "ExitTicket") {
                        events.push({
                            className: "e",
                            Date: this.formatDate(data[i].startdate),
                            testType: "ExitTicket"
                        });

                    } else if (data[i].testtype == "practice" || data[i].testtype == "formal") {
                        if (data[i].testtype == "practice") {
                            events.push({
                                className: "p",
                                Date: this.formatDate(data[i].startdate),
                                testType: "practice"
                            });
                        } else {
                            events.push({
                                className: "f",
                                Date: this.formatDate(data[i].startdate),
                                testType: "formal"
                            });
                        }
                    }

                }
                var Pra = [];
                var For = [];
                var Exit = [];
                var PF = this.remove_duplicates(Pra, For,"pf");
                var EF = this.remove_duplicates(Exit, For,"fe");
                var PE = this.remove_duplicates(Pra, Exit,"pe");
                var PEF = this.merge([this.remove_duplicates(PF, EF,"pef"), this.remove_duplicates(EF, PE,"pef"), this.remove_duplicates(PF, PE,"pef")]);
                PF = this.remove_duplicates1(PF, PEF);
                EF = this.remove_duplicates1(EF, PEF);
                PE = this.remove_duplicates1(PE, PEF);
                var finalArray = PF.concat(EF, PE, PEF);
                var arr1 = [];
                var A = this.finaloutput(events, finalArray).concat(finalArray);
                A = A.concat(events)
                var uniq = new Set(A.map(e => JSON.stringify(e)));
                A = Array.from(uniq).map(e => JSON.parse(e));
                this.events = A;
                
   
  }
ngAfterViewInit(){
  const events1 = this.events;
  console.log(JSON.stringify(this.events));
  console.log(JSON.stringify(events1));
 $('.datepicker').datepicker({
    dateFormat: 'dd-mm-yy',
     minDate: new Date( new Date().getFullYear(),  new Date().getMonth(), +1), 
     maxDate: new Date( new Date().getFullYear(),  new Date().getMonth() +1, 0),
      beforeShowDay: function(date) {
                        var date,
                            selectedDate = new Date(date),
                            event = null;

                        for (var i = 0; i < events1.length; i++) {
                            date = events1[i].Date;

                            if (selectedDate.valueOf() === new Date(date).valueOf()) {
                                event = events1[i];
                            }
                        }
                        if (event) {
                            return [true, event.className, ''];
                        } else {
                            return [true, '', ''];
                        }
                    }
    }); 

    $('.datepicker1').datepicker({
    dateFormat: 'dd-mm-yy',
    minDate: new Date( new Date().getFullYear(),  new Date().getMonth()+1, +1), 
    maxDate: new Date( new Date().getFullYear(),  new Date().getMonth() +2, +0),
      beforeShowDay: function(date) {
                        var date,
                            selectedDate = new Date(date),
                            event = null;

                        for (var i = 0; i < events1.length; i++) {
                            date = events1[i].Date;

                            if (selectedDate.valueOf() === new Date(date).valueOf()) {
                                event = events1[i];
                            }
                        }
                        if (event) {
                            return [true, event.className, ''];
                        } else {
                            return [true, '', ''];
                        }
                    }
    });
}
}
