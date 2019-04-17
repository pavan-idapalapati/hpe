import { Injectable } from '@angular/core';
import { UtilService } from "./util.service";

@Injectable({
	providedIn: 'root'
})
export class FormDataService {
	formData: any;
	formCurrentPage: any;
	wholeFormData = {
		"name": "HPE Call Guide",
		"metadata": "HPE call guide project",
		"data":  [
			{
				"question": "Do you have a few minutes to talk about your WS implementation?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 0,
				"formData": [
					{
						"type": "radio",
						"label": "",
						"value": "",
						"name": "ws-imp-radio",
						"id": "radio1",
						"options": [
							{
								"label": "yes",
								"value": "yes",
								"name": "ws-imp",
								"helpField": [
									{
										"type": "text",
										"label": "When is a good time to talk?",
										"value": ""
									}
								]
							},
							{
								"label": "no",
								"value": "no",
								"name": "ws-imp"
							}
						]
					}
				]
			},
			{
				"question": "What WS versions are you currently running?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 1,
				"formData": [
					{
						"type": "checkbox",
						"label": "Select all that apply:",
						"value": "",
						"name": "ws-version-cb",
						"id": "",
						"options": [
							{
								"label": "WS 2008",
								"value": "WS 2008",
								"name": "ws-version-cb",
								"isSelected": false
							},
							{
								"label": "WS 2012 R2",
								"value": "WS 2012 R2",
								"name": "ws-version-cb",
								"isSelected": false
							}
						]
					}
				]
			},
			{
				"question": "What does your current WS infrastructure look like?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 2,
				"formData": [
					{
						"type": "text",
						"label": "Number of servers:",
						"value": "",
						"name": "ws-infra-text",
						"id": ""
					},
					{
						"type": "text",
						"label": "Vendors / server generation:",
						"value": "",
						"name": "ws-infra-text",
						"id": ""
					}
				]
			},
			{
				"question": "Are you planning to upgrade on-prem or to migrate to Azure?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 3,
				"formData": [
					{
						"type": "radio",
						"label": "Select one:",
						"value": "",
						"name": "upgrade-migrate-radio",
						"id": "radio1",
						"options": [
							{
								"label": "Don’t know",
								"value": "Don’t know",
								"name": "upgrade-migrate-radio"
							},
							{
								"label": "Not planning to upgrade",
								"value": "Not planning to upgrade",
								"name": "upgrade-migrate-radio"
							},
							{
								"label": "On-prem",
								"value": "On-prem",
								"name": "upgrade-migrate-radio"
							},
							{
								"label": "Azure: WS 2008",
								"value": "Azure: WS 2008",
								"name": "upgrade-migrate-radio"
							},
							{
								"label": "Azure: WS 2012 / 2016",
								"value": "Azure: WS 2012 / 2016",
								"name": "upgrade-migrate-radio"
							},
							{
								"label": "Waiting for WS 2019",
								"value": "Waiting for WS 2019",
								"name": "upgrade-migrate-radio"
							},
							{
								"label": "Combination on-prem/Azure",
								"value": "Combination on-prem/Azure",
								"name": "upgrade-migrate-radio"
							}
						]
					}
				],
				"matadata": {
					"heading": "Don’t know / Not planning to upgrade (from WS 2008):",
					"data": [

					]
				}
			},
			{
				"question": "If upgrading on-prem, when are you planning to upgrade?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 4,
				"formData": [
					{
						"type": "radio",
						"label": "Select one:",
						"value": "",
						"name": "upgrade-onprem-radio",
						"id": "radio1",
						"options": [
							{
								"label": "Haven’t made a plan",
								"value": "Haven’t made a plan",
								"name": "upgrade-onprem-radio"
							},
							{
								"label": "< 3 mo.",
								"value": "< 3 mo.",
								"name": "upgrade-onprem-radio"
							},
							{
								"label": "4-6 mo.",
								"value": "4-6 mo.",
								"name": "upgrade-onprem-radio"
							},
							{
								"label": "7-12 mo.",
								"value": "7-12 mo.",
								"name": "upgrade-onprem-radio"
							},
							{
								"label": "&gt; 12 mo.",
								"value": "&gt; 12 mo.",
								"name": "upgrade-onprem-radio"
							}
						]
					}
				],
				"matadata": {
					"heading": "No / late upgrade start date:",
					"data": [

					]
				}
			},
			{
				"question": "Do you have budget allocated for use in that timeframe?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 5,
				"formData": [
					{
						"type": "radio",
						"label": "Select one:",
						"value": "",
						"name": "budget-allocate-radio",
						"id": "radio1",
						"options": [
							{
								"label": "Yes and amt.:",
								"value": "Yes and amt.:",
								"name": "budget-allocate-radio",
								"helpField": [
									{
										"type": "text",
										"label": "amount:",
										"value": ""
									}
								]
							},
							{
								"label": "No / not sure",
								"value": "No / not sure",
								"name": "budget-allocate-radio"
							}
						]
					}
				]
			},
			{
				"question": "What are your infrastructure requirements going to be?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 6,
				"formData": [
					{
						"type": "checkbox",
						"label": "Select all that apply and enter:",
						"value": "",
						"name": "infra-req-cb",
						"id": "",
						"options": [
							{
								"label": "Compute:",
								"value": "Compute:",
								"name": "infra-req-cb",
								"isSelected": false,
								"helpField": [
									{
										"type": "text",
										"label": "details:",
										"value": ""
									}
								]
							},
							{
								"label": "Storage:",
								"value": "Storage:",
								"name": "infra-req-cb",
								"isSelected": false,
								"helpField": [
									{
										"type": "text",
										"label": "details:",
										"value": ""
									}
								]
							},
							{
								"label": "Networking:",
								"value": "Networking:",
								"name": "infra-req-cb",
								"helpField": [
									{
										"type": "text",
										"label": "details:",
										"value": ""
									}
								]
							},
							{
								"label": "None",
								"value": "None",
								"name": "infra-req-cb"
							},
							{
								"label": "Already working with another hardware vendor on this",
								"value": "Already working with another hardware vendor on this",
								"name": "infra-req-cb"
							}
						]
					}
				],
				"matadata": {
					"heading": "Already working with another vendor:",
					"data": [

					]
				}
			},
			{
				"question": "Customers have upgraded via Gen10 servers. Want to hear their feedback?",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 7,
				"formData": [
					{
						"type": "radio",
						"label": "Select one:",
						"value": "",
						"name": "gen10-upgrade-radio",
						"id": "radio1",
						"options": [
							{
								"label": "yes",
								"value": "yes",
								"name": "gen10-upgrade-radio"
							},
							{
								"label": "no",
								"value": "no",
								"name": "gen10-upgrade-radio"
							}
						]
					}
				],
				"matadata": {
					"heading": "Yes:",
					"data": [

					]
				}
			},
			{
				"question": "Which of those benefits are of particular interest to you? Can I send you some additional information",
				"stepName": "Kick-off questions",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 8,
				"formData": [
					{
						"type": "radio",
						"label": "Select one:",
						"value": "",
						"name": "benefits-interest-radio",
						"id": "radio1",
						"options": [
							{
								"label": "yes",
								"value": "yes",
								"name": "benefits-interest-radio",
								"helpField": [
									{
										"type": "text",
										"label": "Resources to be sent:",
										"value": ""
									}
								]
							},
							{
								"label": "no",
								"value": "no",
								"name": "benefits-interest-radio"
							}
						]
					}
				],
				"matadata": {
					"heading": "Yes:",
					"data": [

					]
				}
			},
			{
				"question": "What are the next steps? What do you need help with?",
				"stepName": "Next steps",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 9,
				"formData": [
					{
						"type": "text",
						"label": "",
						"value": "",
						"name": "next-steps-text",
						"id": ""
					}
				]
			},
			{
				"question": "Can I set up a meeting with one of our specialists?",
				"stepName": "Next steps",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 10,
				"formData": [
					{
						"type": "radio",
						"label": "",
						"value": "",
						"name": "gen10-upgrade-radio",
						"id": "radio1",
						"options": [
							{
								"label": "yes",
								"value": "yes",
								"name": "gen10-upgrade-radio",
								"helpField": [
									{
										"type": "text",
										"label": "Best date/time for a meeting:",
										"value": ""
									}
								]
							},
							{
								"label": "no",
								"value": "no",
								"name": "gen10-upgrade-radio",
								"helpField": [
									{
										"//TODO:": "this needs to integrate",
										"label": "Offer to send specific resources",
										"url": "www.www.com",
										"value": ""
									},
									{
										"type": "link",
										"label": "Offer to send specific resources",
										"url": "www.www.com",
										"value": ""
									},
									{
										"type": "link",
										"label": "Offer to send specific resources",
										"url": "www.www.com",
										"value": ""
									},
									{
										"type": "text",
										"label": "Resources to be sent:",
										"value": ""
									}
								]
							}
						]
					}
				]
			},
			{
				"question": "Are there other stakeholders involved in the WS migration strategy that I should contact or that should be included in the meeting?",
				"stepName": "Next steps",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 11,
				"formData": [
					{
						"type": "radio",
						"label": "",
						"value": "",
						"name": "ws-migration-strategy-radio",
						"id": "radio1",
						"options": [
							{
								"label": "yes",
								"value": "yes",
								"name": "ws-migration-strategy-radio",
								"addDetailsData": [
									{
										"fields": [
											{
												"type": "text",
												"label": "Name:",
												"value": ""
											},
											{
												"type": "text",
												"label": "Phone:",
												"value": ""
											},
											{
												"type": "text",
												"label": "Email:",
												"value": ""
											},
											{
												"type": "text",
												"label": "Title:",
												"value": ""
											}
										]
									}
								]
							},
							{
								"label": "no",
								"value": "no",
								"name": "ws-migration-strategy-radio"
							}
						]
					}
				]
			},
			{
				"question": "Confirm the next steps",
				"stepName": "Next steps",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": false,
				"id": 12,
				"formData": [
					{
						"//TODO:": "this needs to implement",
						"type": "list",
						"label": "",
						"value": "",
						"name": "confirm-next-steps-list",
						"id": "",
						"options": [
							{
								"label": "Information to be sent",
								"value": "[captured info listed]",
								"name": "confirm-next-steps-list"
							},
							{
								"label": "Other stakeholder(s) to be contacted",
								"value": "[captured info listed]",
								"name": "confirm-next-steps-list"
							},
							{
								"label": "Meeting information: date and time, agenda topics, customer participants, and CDW participants",
								"value": "[captured info listed]",
								"name": "confirm-next-steps-list"
							}
						]
					}
				]
			},
			{
				"question": "Do you have questions or is there any additional info I can provide?",
				"stepName": "Next steps",
				"isViewed": false,
				"isAnswered": false,
				"isRequired": true,
				"id": 13,
				"formData": [
					{
						"type": "radio",
						"label": "",
						"value": "",
						"name": "additional-info-radio",
						"id": "radio1",
						"options": [
							{
								"label": "yes",
								"value": "yes",
								"name": "additional-info-radio"
							},
							{
								"label": "no",
								"value": "no",
								"name": "additional-info-radio"
							}
						]
					}
				]
			}
		]
	}

	constructor(private utils: UtilService) { }

	getWholeFormData() {
		return this.wholeFormData;
	}

	resetWholeFormData() {
		this.utils.clearStorage();
	}

	setInitialDataToLocalStorage() {
		this.utils.setItemInLocalStorage("currentPage", 0, false);
		this.utils.setItemInLocalStorage('submittedFormData', this.wholeFormData, true);
	}

	getFormData() {
		return {
			data: this.utils.getItemFromLocalStorage('submittedFormData', true),
			currentPage: this.utils.getItemFromLocalStorage("currentPage", false)
		}
	}

	setFormData(formData, currentPage) {
		this.utils.setItemInLocalStorage("currentPage", currentPage, false);
		let data = this.utils.getItemFromLocalStorage("submittedFormData", true);
		data.data[currentPage] = formData;
		this.utils.setItemInLocalStorage("submittedFormData", data, true);
	}

	moveToNextQuestion() {
		let currentPage = this.utils.getItemFromLocalStorage("currentPage", false);
		this.utils.setItemInLocalStorage("currentPage", Number(currentPage) + 1, false);
	}

	moveToParticularQuestion(questionId) {
		this.utils.setItemInLocalStorage("currentPage", Number(questionId), false);
	}

}
