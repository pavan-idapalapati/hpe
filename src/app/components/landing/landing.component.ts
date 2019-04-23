import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
	pageView="/1-landing";
  userInfoForm = {
		"name": "HPE Call Guide",
		"metadata": "HPE Call Guide Landing Page",
		"data": [
			{
				"question": "Your Information",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": false,
				"id": 0,
				"formData": [
						{
							"type": "text",
							"label": "Account Manager: ",
							"value": "",
							"name": "salesrepname"
						}
				]
			},
			{
				"question": "Customer Information",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": false,
				"id": 0,
				"formData": [
						{
							"type": "text",
							"label": "Customer Name: ",
							"value": "",
							"name": "salesrepname"
						},
						{
							"type": "text",
							"label": "Customer Company: ",
							"value": "",
							"name": "salesrepname"
						},
						{
							"type": "text",
							"label": "Customer Phone: ",
							"value": "",
							"name": "salesrepname"
						},
						{
							"type": "text",
							"label": "Customer Email: ",
							"value": "",
							"name": "salesrepname"
						}
				]
			}
		]
	};
	showSessionResumePopup: boolean;
	companyName: string;
	customerName: string;
	saleRepName: string;

  constructor(private formData: FormDataService, private utils: UtilService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
		this.activatedRoute.queryParams.subscribe(
			(queryParams: any) => {
				console.log(queryParams['new']);
				if(queryParams['new']) {
					this.showSessionResumePopup = false;
					this.createNewSession();
				} else {	
					this.showSessionResumeSection();
				}
			}
		);
		this.utils.sendPageView(this.pageView);
		
	}
	
	createNewSession() {
		this.utils.clearStorage();
		this.utils.clearCookies();
		this.utils.setSessionInCookies();
		this.formData.setInitialDataToLocalStorage();
	}

  getStarted() {
		this.createNewSession();
    this.utils.setItemInLocalStorage("userInfo", this.userInfoForm, true);
		this.router.navigate(['/questionaire']);
		
		//call event for google analytics
		this.utils.sendEvent('Click','{Account Manager}-callstart','Call Event')
	}
	
	resumeSession() {
		this.router.navigate(['/questionaire']);
	}

	showSessionResumeSection() {
		let userData = this.utils.getItemFromLocalStorage("userInfo", true);
		if(userData && userData.data) {
			this.saleRepName = userData.data[0].formData[0].value;
			this.customerName = userData.data[1].formData[0].value;
			this.companyName = userData.data[1].formData[1].value;
		}
		this.showSessionResumePopup = true;
	}

}
