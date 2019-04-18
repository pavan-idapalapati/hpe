import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
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
							"label": "Account Manager Name: ",
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

  constructor(private utils: UtilService, private router: Router) { }

  ngOnInit() {
    this.utils.clearStorage();
  }

  getStarted() {
    this.utils.setItemInLocalStorage("userInfo", this.userInfoForm, true);
    this.router.navigate(['/questionaire']);
  }

}
