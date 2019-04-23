import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {

  unansweredQuestions = [];
  pageView="/16-thank-you";

  constructor(private formData: FormDataService, private router: Router, private utils: UtilService) { }

  ngOnInit() {
    this.getUnansweredQuestions();
    this.utils.sendPageView(this.pageView);
  }

  getUnansweredQuestions() {
    let data = this.formData.getFormData().data;
    this.unansweredQuestions = data.data.filter((eachData) => {
      return (eachData.isRequired && !eachData.isAnswered);
    });
    this.utils.scrolltoTop();
  }

  takeQuestion(question) {
    this.formData.moveToParticularQuestion(question.id);
    this.router.navigate(["/questionaire"]);
  }

  finishQuestionaire() {
    this.formData.resetWholeFormData();
    this.utils.clearCookies();
    this.router.navigate(['/']);  
    //google analytics submit event
    this.utils.sendEvent('Click','{Account Manager}-form-submit','Submit Event');
  }

  previousQuestion() {
    this.formData.moveToPreviousQuestion();
    this.router.navigate(["/questionaire"]);
    this.utils.scrolltoTop();
	}

}
