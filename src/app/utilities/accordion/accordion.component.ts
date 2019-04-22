import { Component, OnInit, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
    // openAccordionIndex;
    questionnaireData = [];
    currentPage: any;
    massagesQuestionnaireData: any;
    @ViewChild('kickoffQuestions') kickoffQuestions: any;
    @ViewChild('nextsteps') nextsteps: any;

    constructor(public formData: FormDataService, private router: Router) {
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
        this.massageQuestionnaireData();
    }

    massageQuestionnaireData() {
        this.massagesQuestionnaireData = {
            kickOffQuestions: {
                name: "Kick-off questions",
                data: []
            },
            nextSteps: {
                name: "Next steps",
                data: []
            }
        }
        this.questionnaireData.forEach(eachQue => {
            if(eachQue.stepName === "Next steps") {
                this.massagesQuestionnaireData.nextSteps.data.push(eachQue);
            } else {
                this.massagesQuestionnaireData.kickOffQuestions.data.push(eachQue);
            }
        });

        // open left side accordion based on navigation
        setTimeout(() => {     
            if(this.currentPage >= 9) {
                this.kickoffQuestions.selected = false;
                this.nextsteps.selected = true;
                this.formData.openAccordionIndex = 1;
            } else if(this.currentPage < 9) {
                this.kickoffQuestions.selected = true;
                this.nextsteps.selected = false; 
                this.formData.openAccordionIndex = 0;                 
            } else if(this.currentPage == 14) {
                this.kickoffQuestions.selected = false;
                this.nextsteps.selected = false;
            }
        });
    }

    onTabOpen(event) {
        this.formData.openAccordionIndex = event.index;
    }
    onTabClose(event) {
        this.formData.openAccordionIndex = undefined;
    }

    takeQuestion(question) {
        this.formData.moveToParticularQuestion(question.id);
        if(this.router.url.indexOf("questionaire") >= 0) {
            this.formData.triggerRouteChangeSubject();
        } else {
            this.router.navigate(["/questionaire"]);
        }
    }

    gotFinish() {
        this.router.navigate(["/conclusion"]);
    }

}
