import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ValidationService } from 'src/app/validation.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    pageView = "/1-landing";
    submitted: boolean = false;
    userInfoForm: any = {
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
    showSessionResumePopup: boolean;
    companyName: string;
    customerName: string;
    saleRepName: string;

    constructor(public formData: FormDataService,
        private utils: UtilService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private validationService: ValidationService) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            (queryParams: any) => {
                // console.log(queryParams['new']);
                if (queryParams['new']) {
                    this.showSessionResumePopup = false;
                    // this.createNewSession();
                } else {
                    this.showSessionResumeSection();
                }
                this.utils.scrolltoTop();
            }
        );
        //google analytics pageview triggering
        this.utils.sendPageView(this.pageView);

    }

    createNewSession() {
        this.utils.clearStorage();
        this.utils.clearCookies();
        this.utils.setSessionInCookies();
        this.formData.setInitialDataToLocalStorage();
    }

    getStarted() {
        this.submitted = true;
        let valid;
        this.userInfoForm.data.forEach(ff => {
            ff.formData.filter(formControl => {
                if (this.validationService.validateFormControl(formControl)) {
                    valid = true;
                }
            })
        });
        if (valid) {
            this.formData.showSuccessMessage = false;
            this.createNewSession();

            //storing  userData in to  cookie
            let userData = this.createUserInfoCookieData();
            document.cookie = `userInfo=${JSON.stringify(userData)}`;

            //storing formData in to localstorage without values.
            userData = this.createFormDataForLocalStorage();
            this.utils.setItemInLocalStorage("userInfo", userData, true);
            this.router.navigate(['/questionaire']);

            //call event for google analytics
            this.utils.sendEvent('Click', '{Account Manager}-callstart', 'Call Event')
        }

    }

    createUserInfoCookieData() {
        let fd = {};
        this.userInfoForm.data.forEach(form => {
            form.formData.forEach(formData => {
                fd[formData.cookieId] = formData.value
            })
        })
        return fd;
    }

    createFormDataForLocalStorage() {
        let fd: any = JSON.parse(JSON.stringify(this.userInfoForm)); // removing the reference
        fd.data.forEach(form => {
            form.formData.forEach(formData => {
                formData.value = "";
            })
        })
        return fd;
    }

    resumeSession() {
        this.router.navigate(['/questionaire']);
    }

    showSessionResumeSection() {

        let userData = this.utils.setUserCookieDataToUserFormData();
        
        if (userData && userData.data) {
            this.saleRepName = userData.data[0].formData[0].value;
            this.customerName = userData.data[1].formData[0].value;
            this.companyName = userData.data[1].formData[1].value;
        }
        this.showSessionResumePopup = true;
    }

}
