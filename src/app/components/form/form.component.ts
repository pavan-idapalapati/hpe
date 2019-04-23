import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    openSideNavFlag;
    @ViewChild('rightNavAccordion') rightNavAccordion: any;
    @ViewChild('rightAccordion') rightAccordion: any;
    currentFormData: any;
    currentPage: any;
    metaData: any;

    constructor(private utils: UtilService, private formData: FormDataService, private router: Router) {
        this.formData.getROuteChangeSubject().subscribe((data) => {
            this.ngOnInit();
            this.utils.scrolltoTop();
        });
    }

    ngOnInit() {
        var formData = this.formData.getFormData();
        if (!formData || !formData.currentPage || !formData.data) {
            this.formData.setInitialDataToLocalStorage();
        }
        this.init();
    }

    init() {        
        this.utils.scrolltoTop();
        this.formData.triggerQuestionChangeSubject();
        var formData = this.formData.getFormData();
        if (formData.currentPage < formData.data.data.length) {
            this.generateTemplate(formData);
        } else {
            this.router.navigate(['/conclusion']);
        }

        //right nav section meta data.
        if (formData && formData.data && formData.currentPage) {
            this.metaData = formData.data.data;
            this.currentPage = formData.currentPage;
            this.metaData = this.metaData[this.currentPage];
            if (this.metaData.matadata) {
                this.openSideNav();
                this.rightAccordion.openAccordion({});

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
        this.currentFormData.isAnswered = this.setIsAnswered(this.currentFormData);
        this.formData.setFormData(this.currentFormData, this.currentPage);
        this.formData.moveToPreviousQuestion();
        this.init();
        this.utils.scrolltoTop();
        this.rightAccordion.openAccordion({});

    }

    nextQuestion() {
        this.currentFormData.isAnswered = this.setIsAnswered(this.currentFormData);
        this.formData.setFormData(this.currentFormData, this.currentPage);
        this.formData.moveToNextQuestion();
        this.init();
        this.utils.scrolltoTop();
        this.rightAccordion.openAccordion({});

    }

    setIsAnswered(data) {
        return data.formData.every((eachData) => {
            if (eachData.isNotes || eachData.isConfirmStep) {
                return true;
            }
            if (eachData.type === 'text' || eachData.type === 'textArea') {
                return eachData.value.length;
            } else if (eachData.type === 'radio') {
                return eachData.value;
            } else if (eachData.type === 'checkbox') {
                return (eachData.options.some((eachData) => eachData.isSelected));
            }
        })
    }

    addNewDetails(eachFormElem, index) {
        let mock = JSON.parse(JSON.stringify(eachFormElem.options[index].addDetailsData[0]));
        mock.fields.forEach(each => {
            each.value = "";
        });
        eachFormElem.options[index].addDetailsData.push(mock);
    }

    openSideNav() {
        this.openSideNavFlag = true;
        this.rightNavAccordion.nativeElement.classList
            .remove('remove-right-nav-accordion-transition')
        this.rightNavAccordion.nativeElement.classList
            .add('right-nav-accordion-transition');

    }
    closeSideNav() {
        this.openSideNavFlag = false;
        this.rightNavAccordion.nativeElement.classList.remove('right-nav-accordion-transition')
        this.rightNavAccordion.nativeElement.classList.add('remove-right-nav-accordion-transition');
    }

    removeDetailsData(data, index) {
        if (data.length > 1) {
            data.splice(index, 1);
        }
    }

    onRadioButtonValueChange(eachOption) {
        this.rightAccordion.openAccordion(eachOption);
    }

}
