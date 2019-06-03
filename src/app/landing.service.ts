import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LandingService {

    landingPageFormData = {
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
                        "name": "salesrepname",
                        "validators": ["required"],
                        "errorMessage": "This is required",
                        "cookieId": "accountManager"
                    },
                    {
                        "type": "text",
                        "label": "Account Manager Email: ",
                        "value": "",
                        "name": "salesrep_email",
                        "validators": ["required", "email"],
                        "errorMessage": "This is required",
                        "cookieId": "accountManagerEmail"
                    },
                    {
                        "type": "text",
                        "label": "Account Manager Employee ID: ",
                        "value": "",
                        "name": "salesrep_id",
                        "validators": ["required"],
                        "errorMessage": "This is required",
                        "cookieId": "accountManagerEmployeeID"
                    },

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
                        "name": "salesrepname",
                        "cookieId": "customerName",
                        validators: []
                    },
                    {
                        "type": "text",
                        "label": "Customer Company: ",
                        "value": "",
                        "name": "salesrepname",
                        "cookieId": "customerCompany",
                        validators: []
                    },
                    {
                        "type": "text",
                        "label": "Customer Phone: ",
                        "value": "",
                        "name": "salesrepname",
                        validators: [],
                        "cookieId": "customerPhone",

                    },
                    {
                        "type": "text",
                        "label": "Customer Email: ",
                        "value": "",
                        "name": "salesrepname",
                        validators: [],
                        "cookieId": "customerEmail",
                    }
                ]
            }
        ]
    };

    constructor() { }

    getLandingPageData() {
        return JSON.parse(JSON.stringify(this.landingPageFormData));
    }


}
