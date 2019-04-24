import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/backend.service';
// declare var  jQuery:any;
@Component({
    selector: 'app-conclusion',
    templateUrl: './conclusion.component.html',
    styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {

    unansweredQuestions = [];
    showErrorPopup: boolean = false;
    pageView = "/16-thank-you";

    constructor(private formData: FormDataService, private router: Router, private utils: UtilService,
        private backendService: BackendService) { }

    ngOnInit() {
        this.getUnansweredQuestions();
        //google analytics pageview triggering
        this.utils.sendPageView(this.pageView);
    }

    getUnansweredQuestions() {
        let data = this.formData.getFormData().data;
        this.unansweredQuestions = data.data.filter((eachData) => {
            return (eachData.isRequired && !eachData.isAnswered);
        });
        this.utils.scrolltoTop();
    }

    takeQuestion(question) {
        this.formData.moveToParticularQuestion(question.id);
        this.router.navigate(["/questionaire"]);
    }

    finishQuestionaire() {

        let data = this.formData.massageFormData(this.formData.getFormData().data);

        this.backendService.doCall({
            type: "POST",
            data: data,
            url: "https://spiceworks.cvtr.io/webhook/campaign/46324/form/2576/leads?apikey=cd77dd36c500eb23579532f710125b02&campaignLinkId=10342&publisherId=11007"
        }).subscribe(res => {
            //google analytics submit event
            this.utils.sendEvent('Click', '{Account Manager}-form-submit', 'Submit Event');
            this.formData.showSuccessMessage = true;
            this.formData.resetWholeFormData();
            this.utils.clearCookies();
            this.router.navigate(['/'], { queryParams: { "new": true }});
            
        }, e => {
        })
        // jQuery.ajax({
        //     url: 'https://spiceworks.cvtr.io/webhook/campaign/46324/form/2576/leads?apikey=cd77dd36c500eb23579532f710125b02&campaignLinkId=10342&publisherId=11007',
        //     type: "POST",
        //     data: this.formData.getFormData().data,
        //     contentType: "application/x-www-form-urlencoded",
        //     success: function () {

        //     },
        //     error: function (e) {
        //         console.log(e.responseText)
        //     }
        // })
    }


    previousQuestion() {
        this.formData.moveToPreviousQuestion();
        this.router.navigate(["/questionaire"]);
        this.utils.scrolltoTop();
    }

}
