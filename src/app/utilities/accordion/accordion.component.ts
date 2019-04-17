import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
    openAccordionIndex;
    questionnaireData: any;
    currentPage: any;

    constructor(private formData: FormDataService) { }

    ngOnInit() {
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




}
