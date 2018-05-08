import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class AsscommonService {
  private filterSectionData = new BehaviorSubject<string>('');
  currentData = this.filterSectionData.asObservable();
  private QuestionSectionData = new BehaviorSubject<string>('');
  QStoggle = this.QuestionSectionData.asObservable();
 
  assessmentname:string ='';

  constructor() { }
  
   filterSectionMsg(msg:any){
    this.filterSectionData.next(msg);
   }

   setQsection(qs:any){
   	this.QuestionSectionData.next(qs);
   }

   setAssessmentName(name){
   	this.assessmentname = name;
   	console.log(this.assessmentname);
   }
   getAssessmentName(){
   	console.log(this.assessmentname);
   	return this.assessmentname;
   }
}
