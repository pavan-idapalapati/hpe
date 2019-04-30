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
        let data = this.formData.massageFormData(this.formData.getFormData());
        let payload = this.convertoPaload(data);

        this.showLoader();

        this.backendService.doCall({
            type: "POST",
            data: payload,
            url: "https://4d5cy2i133.execute-api.us-west-2.amazonaws.com/prod/convertr_request"
        }).subscribe(res => {
            res = JSON.parse(res);
            if(res.status && res.status == 400) {
                this.showErrorPopup = true;
            } else {
                //google analytics submit event
                this.utils.sendEvent('Click', '{Account Manager}-form-submit', 'Submit Event');
                this.formData.showSuccessMessage = true;
                this.formData.resetWholeFormData();
                this.utils.clearCookies();
                clearInterval(this.utils.cookieInterval);
                this.router.navigate(['/'], { queryParams: { "new": true }});
            }
            

            this.hideLoader();
        }, e => {
            // this.formData.showSuccessMessage = true;
            this.showErrorPopup = true;
            this.hideLoader();
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

    showLoader(){
        var loader:any = document.querySelector('.loader-wrapper');
        loader.style.display = "flex";
    }

    hideLoader(){
        var loader:any = document.querySelector('.loader-wrapper');
        loader.style.display = "";
    }

    convertoPaload(data) {
        let userformData = data.userInfo.data[1].formData;
        let questionsData = data.data.data;

        let obj = {
        "form[salesrep_name]": data.userInfo.data[0].formData[0].value,
        "form[client_name]": userformData[0].value,
        "form[client_company]": userformData[1].value,
        "form[client_phone]": userformData[2].value,
        "form[client_email]": userformData[3].value,
        "form[ws_imp]": questionsData[0].formData[0].value,
        "form[ws_timetotalk]": questionsData[0].formData[0].options[1].helpField[0].value,
        "form[ws_timetotalk_notes]":  questionsData[0].formData[1].value,
        
        
        "form[ws_version_cb_notes]": questionsData[1].formData[1].value,
        "form[number_of_servers]": questionsData[2].formData[0].value,
        "form[vendors_server_gen]": questionsData[2].formData[1].value,
        "form[number_of_servers_notes]": questionsData[2].formData[2].value,
        "form[onprem_or_azure]": questionsData[3].formData[0].value,
        "form[onprem_or_azure_notes]": questionsData[3].formData[1].value,
        "form[onprem_plan]": questionsData[4].formData[0].value,
        "form[onprem_plan_notes]": questionsData[4].formData[1].value,

        "form[budget_allocated]": questionsData[5].formData[0].value,
        "form[budget_allocated_amt]": questionsData[5].formData[0].options[0].helpField[0].value,
        "form[budget_allocated_notes]": questionsData[5].formData[1].value,
        
        "form[infra_req_notes]": questionsData[6].formData[1].value, 
        "form[infra_req_compute]": questionsData[6].formData[0].options[0].helpField[0].value,
        "form[infra_req_storage]":questionsData[6].formData[0].options[1].helpField[0].value,
        "form[infra_req_networking]": questionsData[6].formData[0].options[2].helpField[0].value,
        "form[feedback_gen10_server]": questionsData[7].formData[0].value,
        "form[feedback_gen10_server_notes]": questionsData[7].formData[1].value,
        "form[send_resource]": questionsData[8].formData[0].value,
        "form[resource_to_send]": questionsData[8].formData[0].options[0].helpField[0].value,
        "form[next_steps]": questionsData[9].formData[0].value,
        "form[meet_with_specialist]": questionsData[10].formData[0].value,
        "form[specialist_meeting_datetime]": questionsData[10].formData[0].options[0].helpField[0].value,
        "form[specialist_meeting_resources]": questionsData[10].formData[0].options[1].helpField[0].value,
        "form[meet_with_specialist_notes]": questionsData[10].formData[1].value,

        "form[other_stakeholders]":  questionsData[11].formData[0].value,
        "form[other_stakeholders_notes]": questionsData[11].formData[1].value,
        "form[confirm_nextsteps_notes]": questionsData[12].formData[1].value,
        "form[other_questions]":  questionsData[13].formData[0].value,
        "form[other_questions_notes]": questionsData[13].formData[1].value,
        "form[optin][terms]": this.utils.getCookie('CookieAccepence') || false
        }
        let string;
        questionsData[11].formData[0].options[0].addDetailsData.forEach(group => {
            group.fields.forEach(field => {
                string =`${string},${field.label}:${field.value}`
            })
            string+=";";
        });
        obj["form[other_stakeholders_details]"] = string;
        
        let infra_req_string ='';
        questionsData[6].formData[0].options.forEach(opt =>{
            if(opt.isSelected && opt.value!==undefined){
                infra_req_string += opt.value + ",";
            }
        });
        // "form[infra_req][]": questionsData[6].formData[0].options[0].isSelected ? questionsData[6].formData[0].options[0].value : '', questionsData[6].formData[0].options[1].isSelected ? questionsData[6].formData[1].options[0].value : '', questionsData[6].formData[0].options[2].isSelected ? questionsData[6].formData[2].options[0].value : '',questionsData[6].formData[0].options[3].isSelected ? questionsData[6].formData[3].options[0].value : '',questionsData[6].formData[0].options[4].isSelected ? questionsData[6].formData[4].options[0].value : ''`,
        obj["form[infra_req]"] = infra_req_string;

        let ws_ver_string='';
        questionsData[1].formData[0].options.forEach(opt=>{
            if(opt.isSelected && opt.value!==undefined){
                ws_ver_string += opt.value + ",";
            }
        });

        obj["form[ws_version_cb]"] = ws_ver_string;
        
        // "form[ws_version_cb][]": "questionsData[1].formData[0].options[0].isSelected ? questionsData[1].formData[0].options[0].value: '',questionsData[1].formData[0].options[1].isSelected ? questionsData[1].formData[0].options[1].value: ''",

        // console.log("OBJ:", obj);

        return obj;
    }


    previousQuestion() {
        // this.formData.previousButton();
        this.formData.moveToPreviousQuestion();
        this.router.navigate(["/questionaire"]);
        this.utils.scrolltoTop();
    }

}
