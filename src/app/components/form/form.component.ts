import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
    openSideNavFlag;
    finishButton = false;
    showFinishButton;
    @ViewChild('rightNavAccordion') rightNavAccordion: any;
    @ViewChild('rightAccordion') rightAccordion: any;
    currentFormData: any;
    currentPage: any;
    metaData: any;
    routeChangeSubscription:Subscription;
    getquestionjumpSubscription: Subscription;
    // finishAccordionSubscription: Subscription;
    // conclusionPreviousbuttonSubscription: Subscription;

    constructor(private utils: UtilService, private formData: FormDataService, private router: Router) {
    }
    
    ngOnInit() {
        this.routeChangeSubscription=this.formData.getROuteChangeSubject().subscribe((data) => {
            this.ngOnInit();
        });
        this.getquestionjumpSubscription  =this.formData.getQuestionJumpSubject().subscribe((data) => {
            this.moveToParticularQuestion(data);
        });
        
        // this.finishAccordionSubscription =this.formData.finishAccordionTab.subscribe(data => {
        //     this.answerQuestion();
            
        // })
        var formData = this.formData.getFormData();
        // let submittedData = this.utils.getItemFromLocalStorage("submittedFormData", true);
        // this.conclusionPreviousbuttonSubscription =this.formData.conclusionPreviousButton.subscribe(data => {
        //     if(formData.currentPage == 0 && submittedData.data[0].formData[0].value == "no" ) {
        //         this.showFinishButton = true;
        //        this.finishButton = true;
        //     } else {
        //         this.finishButton = false;
        //     }
            
        // });
        if (!formData || !formData.currentPage || !formData.data) {
            this.formData.setInitialDataToLocalStorage();
        }
        this.init();
    }
    ngOnDestroy() {
       this.answerQuestion();
       this.formData.triggerQuestionChangeSubject();
        if(this.routeChangeSubscription) {
            this.routeChangeSubscription.unsubscribe();
        }
        if(this.getquestionjumpSubscription) {
            this.getquestionjumpSubscription.unsubscribe();
        }
    }

    init() {
        var formData = this.formData.getFormData();
        let submittedData = this.utils.getItemFromLocalStorage("submittedFormData", true);
        if(formData.currentPage == 0 && submittedData.data[0].formData[0].value == "no" ) {
           this.finishButton = true;
        } else {
            this.finishButton = false;
        }
        this.utils.scrolltoTop();
        this.formData.triggerQuestionChangeSubject();
        var formData = this.formData.getFormData();
        if (formData.currentPage < formData.data.data.length) {
            // this.router.navigate(['/questionaire']);
            this.generateTemplate(formData);
        } else {
            this.router.navigate(['/conclusion']);
        }

        //right nav section meta data.
        if (formData && formData.data && formData.currentPage) {
            this.metaData = formData.data.data;
            this.currentPage = formData.currentPage;
            this.metaData = this.metaData[this.currentPage];
            if (this.metaData && this.metaData.matadata) {
                this.openSideNav();

                setTimeout(() => {
                    if (this.currentFormData.isAnswered) {

                        // open the right side accordion based on the following conditions
                        //  1) if current question is already answered by end user.
                        //  2) if current question is having metadata.
                        //  3) if current question is having radiobutton or  checkbox controls

                        let radioCheckboxControl = this.currentFormData.formData.
                            find(formElement => {
                                return (formElement.type === 'radio' || formElement.type === "checkbox")
                            });

                        if (
                            this.currentFormData.matadata &&
                            radioCheckboxControl
                        ) {
                            let option;
                            if (radioCheckboxControl.type === "radio" && radioCheckboxControl.value) {
                                option = radioCheckboxControl.options.find(option => option.value === radioCheckboxControl.value)
                            } else {
                                option = radioCheckboxControl.options.find(o => o.isSelected);
                            }
                            if(option) {
                                this.rightAccordion.openAccordion(option);
                            }
                        }


                    } else {
                        this.rightAccordion.openAccordion({ showallAccordions: this.metaData.showAllAccordionOnPageload });
                    }
                });
            }
            else {
                this.closeSideNav();
            }
        }
        //google analytics pageview triggering
        this.utils.sendPageView(this.currentFormData.pageView);
    }

    generateTemplate(formData) {
        this.currentFormData = formData.data.data[formData.currentPage];
        this.currentPage = formData.currentPage;
        if (this.currentFormData.isConfirmStep) {
            this.getConfirmStepData(formData.data.data);
        }
        this.currentFormData.formData.forEach(formField => {
            if (formField.mapNeeded) {
                try {
                    formField.options.forEach(element => {
                        if (element.mapTo) {
                            let question = formData.data.data[element.mapTo.question];
                            let data = question.formData[0];
                            if (data.type === 'checkbox') {
                                let selectedOptions = data.options.filter((option) => {
                                    return option.isSelected;
                                });
                                if (selectedOptions.length) {
                                    element.uid = selectedOptions.map((selectedOption) => element.mapTo.value[selectedOption.value]);
                                }
                            }
                        }
                    });

                } catch (err) {
                    console.log(err);
                }
            }
        });
    }

    getConfirmStepData(wholeData) {
        this.currentFormData.formData[0].options.forEach((eachItem) => {
            let data = wholeData.find((reqData) => {
                return reqData.id === eachItem.valueIndex;
            });
            eachItem.value = data.formData;
        });
    }

    previousQuestion() {
        var currentPage = this.utils.getItemFromLocalStorage("currentPage", false);
        if (currentPage <= 0) {
            return;
        }
        this.answerQuestion();
        this.checkForSkip("prev");
        this.init();
        this.rightAccordion.openAccordion({});
    }

    nextQuestion() {
        this.answerQuestion();
        this.checkForSkip("next");
        this.init();
        this.rightAccordion.openAccordion({});
    }

    moveToParticularQuestion(questionId) {
        this.answerQuestion();
        this.formData.moveToParticularQuestion(questionId);
        this.init();
        this.rightAccordion && this.rightAccordion.openAccordion({});
    }

    // TODO: Change this hardcoded data to dynamic one.
    checkForSkip(direction?) {
        if(direction == "next") {
            if(this.currentFormData.id == 10 && this.currentFormData.formData[0].value == "no") {
                this.formData.moveToParticularQuestion(12);
            } else {
                this.formData.moveToNextQuestion();
            }
        } else if(direction == "prev") {
            let formData = this.formData.getFormData();
            let enteredData = formData.data.data[10];
            if(this.currentFormData.id == 12 && enteredData.formData[0].value == "no") {
                this.formData.moveToParticularQuestion(10);
            } else {
                this.formData.moveToPreviousQuestion();
            }
        }
    }

    answerQuestion() {
        this.formData.setIsAnswered(this.currentFormData);
        this.formData.setFormData(this.currentFormData, this.currentPage);
    }

    addNewDetails(eachFormElem, index) {
        let mock = JSON.parse(JSON.stringify(eachFormElem.options[index].addDetailsData[0]));
        mock.fields.forEach(each => {
            each.value = "";
        });
        eachFormElem.options[index].addDetailsData.push(mock);
        eachFormElem.options[index].addDetailsData = JSON.parse(JSON.stringify(eachFormElem.options[index].addDetailsData));
    }

    openSideNav() {
        this.openSideNavFlag = true;
        if(this.rightNavAccordion && this.rightNavAccordion.nativeElement) {
            this.rightNavAccordion.nativeElement.classList
                .remove('remove-right-nav-accordion-transition')
            this.rightNavAccordion.nativeElement.classList
                .add('right-nav-accordion-transition');
        }

    }
    closeSideNav() {
        this.openSideNavFlag = false;
        if(this.rightNavAccordion && this.rightNavAccordion.nativeElement) {
            this.rightNavAccordion.nativeElement.classList.remove('right-nav-accordion-transition')
            this.rightNavAccordion.nativeElement.classList.add('remove-right-nav-accordion-transition');
        }
    }

    removeDetailsData(data, index) {
        if (data.length > 1) {
            data.splice(index, 1);
        }
    }

    onRadioButtonValueChange(eachOption, options?: any) {
        if (eachOption && eachOption.hasFinishButton) {
            this.finishButton = true;
        }
        else {
            this.finishButton = false;
        }
        let obj = eachOption;
        this.rightAccordion.openAccordion(eachOption);

        if (options && options.disabilityCheckNeeded) {
            if (eachOption.disabilityCheck) {
                eachOption.disabilityCheck.items.forEach((item) => {
                    return options.options[item].isSelected = false;
                });
            } else {
                let checkButton = options.options.find((option) => {
                    return option.disabilityCheck;
                })
                if (checkButton) {
                    checkButton.isSelected = false;
                }
            }
        }

    }

    finishQuestionaire() {
        this.formData.closeAccordion();
        this.answerQuestion();
        this.router.navigate(['/conclusion']);
    }
}
