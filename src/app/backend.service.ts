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
        "form[ws_version_cb][0]": questionsData[1].formData[0].options[0].isSelected ? questionsData[1].formData[0].options[0].value: "",
        "form[ws_version_cb][1]": questionsData[1].formData[0].options[1].isSelected ? questionsData[1].formData[0].options[1].value: "",
        "form[ws_version_note]": questionsData[1].formData[1].value,
        "form[number_of_servers]": questionsData[2].formData[0].value,
        "form[vendors_server_gen]": questionsData[2].formData[1].value,
        "form[ws_server_note]": questionsData[2].formData[2].value,
        "form[onprem_or_azure]": questionsData[3].formData[0].value,
        "form[pnprem__or_azure_note]": questionsData[3].formData[1].value,
        "form[onprem_plan]": questionsData[4].formData[0].value,
        "form[onprem_plan_note]": questionsData[4].formData[1].value,

        "form[budget_allocated]": questionsData[5].formData[0].value,
        "form[budget_allocated_amt]": questionsData[5].formData[0].helpField[0].value,
        "form[budget_note]": questionsData[5].formData[1].value,
        // "form[infra_req][]": "",
        // "form[infra_req][]": "",
        // "form[infra_req][]": "",
        // "form[infra_req][]": "",
        // "form[infra_req][]": "",
        // "form[infra_req_compute]": "",
        // "form[infra_req_storage]": "",
        // "form[infra_req_networking]": "",
        // "form[feedback_gen10_server]": "",
        // "form[feedback_gen10_server]": "",
        // "form[send_resource]": "",
        // "form[send_resource]": "",
        // "form[resource_to_send]": "",
        // "form[next_steps]": "",
        // "form[meet_with_specialist]": "",
        // "form[meet_with_specialist]": "",
        // "form[specialist_meeting_datetime]": "",
        // "form[other_stakeholders]": "",
        // "form[other_stakeholders]": "",
        // "form[other_stakeholders_details]": "",
        // "form[other_questions]": "",
        // "form[other_questions]": "",
        // "form[optin][terms]": "",
        // "form[optin][contactTypes][]": "",
        // "form[optin][contactTypes][]": "",
        // "form[optin][contactTypes][]": "",
        // "form[optin][contactTypes][]": "",
        // "form[submit]": "",
        // "form[_trans]": "",
        }
        return obj;
    }
}
