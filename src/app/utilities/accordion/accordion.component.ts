import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
    openAccordionIndex;
    questionnaireData: any;
    currentPage: any;

    constructor(private formData: FormDataService, private router: Router) {
        this.formData.getQuestionChangeSubject().subscribe((data) =>{
            this.onInitOfComponent();
        })
    }

    ngOnInit() {
        this.onInitOfComponent();
    }
    
    onInitOfComponent() {
        let questionnaireData = this.formData.getFormData();
        if(questionnaireData && questionnaireData.data && questionnaireData.currentPage) {
            this.questionnaireData = questionnaireData.data.data;
            this.currentPage = questionnaireData.currentPage;
        }
    }

    onTabOpen(event) {
        this.openAccordionIndex = event.index;
    }
    onTabClose(event) {
        this.openAccordionIndex = undefined;
    }

    takeQuestion(question) {
        this.formData.moveToParticularQuestion(question.id);
        this.formData.triggerRouteChangeSubject();
    }


}
