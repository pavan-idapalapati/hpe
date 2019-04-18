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
    questionnaireData = [];
    currentPage: any;
    massagesQuestionnaireData: any;

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
    }

    onTabOpen(event) {
        this.openAccordionIndex = event.index;
    }
    onTabClose(event) {
        this.openAccordionIndex = undefined;
    }

    takeQuestion(question) {
        this.formData.moveToParticularQuestion(question.id);
        if(this.router.url.indexOf("questionaire") >= 0) {
            this.formData.triggerRouteChangeSubject();
        } else {
            this.router.navigate(["/questionaire"]);
        }
    }


}
