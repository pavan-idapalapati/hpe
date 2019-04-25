import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    cformid = '1806';
    clinkid = '10299';
    cpubid = '11007';

    constructor(private http: HttpClient) { }


    toQueryString(obj) {
        const parts = [];
        for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
            } else {
                parts.push(encodeURIComponent(i) + '=' + obj[i]);
            }
        }
        return parts.join('&');
    }

    public doCall(payload): Observable<any> {

        let data = this.convertoPaload(payload.data);


        const postBody = {
            'formid': this.cformid,
            'linkid': this.clinkid,
            'pubid': this.cpubid,
            'dataload': this.toQueryString(data)
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };


        return this.http
            .post(payload.url, JSON.stringify(postBody), httpOptions)
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
        "form[ws_timetotalk_notes":  questionsData[0].formData[1].value,
        "form[ws_version_cb][0]": questionsData[1].formData[0].options[0].isSelected ? questionsData[1].formData[0].options[0].value: "",
        "form[ws_version_cb][1]": questionsData[1].formData[0].options[1].isSelected ? questionsData[1].formData[0].options[1].value: "",
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
        "form[budget_note]": questionsData[5].formData[1].value,
        "form[infra_req][0]": questionsData[6].formData[0].options[0].isSelected ? questionsData[6].formData[0].options[0].value : "",
        "form[infra_req][1]":  questionsData[6].formData[0].options[1].isSelected ? questionsData[6].formData[1].options[0].value : "",
        "form[infra_req][2]":  questionsData[6].formData[0].options[2].isSelected ? questionsData[6].formData[2].options[0].value : "",
        "form[infra_req][3]": questionsData[6].formData[0].options[3].isSelected ? questionsData[6].formData[3].options[0].value : "",
        "form[infra_req][4]": questionsData[6].formData[0].options[4].isSelected ? questionsData[6].formData[4].options[0].value : "",
        "form[infra_notes]": questionsData[6].formData[1].value, 
        "form[infra_req_compute]": questionsData[6].formData[0].options[0].helpField[0].value,
        "form[infra_req_storage]":questionsData[6].formData[0].options[1].helpField[0].value,
        "form[infra_req_networking]": questionsData[6].formData[0].options[2].helpField[0].value,
        "form[feedback_gen10_server]": questionsData[7].formData[0].value,
        "form[feedback_gen10_server_notes]": questionsData[7].formData[1].value,
        "form[send_resource]": questionsData[8].formData[0].value,
        "form[resource_to_send]": questionsData[8].formData[0].options[0].helpField[0].value,
        "form[budget_allocated_notes]": questionsData[8].formData[1].value,
        "form[next_steps]": questionsData[9].formData[0].value,
        "form[meet_with_specialist]": questionsData[10].formData[0].value,
        "form[specialist_meeting_datetime]": questionsData[10].formData[0].options[0].helpField[0].value,
        "form[specialist_meeting_resources]": questionsData[10].formData[0].options[1].helpField[0].value,
        "form[specialist_notes]": questionsData[10].formData[1].value,

        "form[other_stakeholders]":  questionsData[11].formData[0].value,
        "form[other_stakeholders_notes]": questionsData[11].formData[1].value,
        "form[confirm_nextsteps_notes]": questionsData[12].formData[1].value,
        "form[other_questions]":  questionsData[13].formData[0].value,
        "form[other_questions_notes]": questionsData[13].formData[1].value
        }
        let string;
        questionsData[11].formData[0].options[0].addDetailsData.forEach(group => {
            group.fields.forEach(field => {
                string =`${string},${field.label}:${field.value}`
            })
            string+=";";
        });
        obj["form[other_stakeholders_details]"] = string;


        return obj;
    }
}
