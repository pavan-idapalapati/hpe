import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    openSideNavFlag;
    @ViewChild('rightNavAccordion') rightNavAccordion: any;

	currentFormData: any;
	templates = {
		"formTemplate": "form-template",
		"reviewTemplate": "review-template"
	};
	currentPage: any;

	constructor(private utils: UtilService, private formData: FormDataService, private router: Router) {
		this.formData.getROuteChangeSubject().subscribe((data) => {
			this.ngOnInit();
		});
	}

	ngOnInit() {
		var currentPage = this.utils.getItemFromLocalStorage("currentPage", false);
		if(!currentPage) {
			this.formData.setInitialDataToLocalStorage();
		}
		this.onInitOfPage();
	}
	
	onInitOfPage() {
		this.formData.triggerQuestionChangeSubject();
		var formData = this.formData.getFormData();
		if(formData.currentPage < formData.data.data.length) {
			this.generateTemplate(formData);
		} else {
			this.router.navigate(['/conclusion']);
		}
	}
	
	generateTemplate(formData) {
		this.currentFormData = formData.data.data[formData.currentPage];
		this.currentPage = formData.currentPage;
		console.log(this.currentFormData, "this currentFormDataaaaaaa")
	}

	previousQuestion() {
		var currentPage = this.utils.getItemFromLocalStorage("currentPage", false);
		if(currentPage <= 0) {
			return;
		}
		this.utils.setItemInLocalStorage("currentPage", --currentPage, false);
		this.onInitOfPage();
	}

	nextQuestion() {
		this.currentFormData.isAnswered = this.setIsAnswered(this.currentFormData);
		this.formData.setFormData(this.currentFormData, this.currentPage);
		this.formData.moveToNextQuestion();
		this.onInitOfPage();
	}

	setIsAnswered(data) {
		return data.formData.every((eachData) => {
			if(eachData.isNotes) {
				return true;
			}
			if(eachData.type === 'text' || eachData.type === 'textArea') {
				return eachData.value.length;
			} else if(eachData.type === 'radio') {
				return eachData.value;
			} else if(eachData.type === 'checkbox') {
				return (eachData.options.some((eachData) => eachData.isSelected ));
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

}
