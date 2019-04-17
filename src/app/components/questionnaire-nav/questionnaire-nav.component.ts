import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-questionnaire-nav',
  templateUrl: './questionnaire-nav.component.html',
  styleUrls: ['./questionnaire-nav.component.css']
})
export class QuestionnaireNavComponent implements OnInit {
  questionnaireData: any;
  currentPage: any;

  constructor(private formData: FormDataService) { }

  ngOnInit() {
    let questionnaireData = this.formData.getFormData();
    this.questionnaireData = questionnaireData.data.data;
    this.currentPage = questionnaireData.currentPage;
  }

}
