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
							"label": "Sales Rep Name: ",
							"value": "",
							"name": "salesrepname"
						}
				]
			},
			{
				"question": "Client Information",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": false,
				"id": 0,
				"formData": [
						{
							"type": "text",
							"label": "Client Name: ",
							"value": "",
							"name": "salesrepname"
						},
						{
							"type": "text",
							"label": "Client Company: ",
							"value": "",
							"name": "salesrepname"
						},
						{
							"type": "text",
							"label": "Client Phone: ",
							"value": "",
							"name": "salesrepname"
						},
						{
							"type": "text",
							"label": "Client Email: ",
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
