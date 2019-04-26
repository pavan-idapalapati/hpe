import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterViewInit {
    questionnaireData = [];
    currentPage: any;
    massagesQuestionnaireData: any;
    @ViewChild('kickoffQuestions') kickoffQuestions: any;
    @ViewChild('nextsteps') nextsteps: any;
    @ViewChild('accordion') accordion: any;

    constructor(public formData: FormDataService, private router: Router) {
        this.formData.getQuestionChangeSubject().subscribe((data) => {
            this.init();
        })
    }

    ngOnInit() {
        this.init();
    }

    ngAfterViewInit() {
        this.openAccordion();
    }

    init() {
        let questionnaireData = this.formData.getFormData();
        if (questionnaireData && questionnaireData.data && questionnaireData.currentPage) {
            this.questionnaireData = questionnaireData.data.data;
            this.currentPage = questionnaireData.currentPage;
        }
        this.massageQuestionnaireData();
    }

    massageQuestionnaireData() {
        this.massagesQuestionnaireData = {
            kickOffQuestions: {
                name: "Questions",
                data: []
            },
            nextSteps: {
                name: "Next steps",
                data: []
            }
        }
        this.questionnaireData.forEach(eachQue => {
            if (eachQue.stepName === "Next steps") {
                this.massagesQuestionnaireData.nextSteps.data.push(eachQue);
            } else {
                this.massagesQuestionnaireData.kickOffQuestions.data.push(eachQue);
            }
        });
        this.openAccordion();
    }

    openAccordion() {
        // open left side accordion based on navigation   
        if (this.accordion) {
            if (this.currentPage == 14) {
                this.formData.openAccordionIndex = undefined;
                this.accordion.activeIndex = undefined;
                this.kickoffQuestions.selected = false;
                this.nextsteps.selected = false;
            } else if (this.currentPage >= 9) {
                this.formData.openAccordionIndex = 1;
                this.accordion.activeIndex = 1;
            } else if (this.currentPage < 9) {
                this.formData.openAccordionIndex = 0;
                this.accordion.activeIndex = 0;
            }
        }
    }

    onTabOpen(event) {
        this.formData.openAccordionIndex = event.index;
    }

    onTabClose(event) {
        this.formData.openAccordionIndex = undefined;
    }

    takeQuestion(question) {
        this.formData.triggerQuestionJumpSubject(question.id);
    }

    gotFinish() {
        this.formData.openAccordionIndex = undefined;
        this.kickoffQuestions.selected = false;
        this.nextsteps.selected = false;
        this.router.navigate(["/conclusion"]);
    }

}
