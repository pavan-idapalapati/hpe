import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    cformid = '902';
    clinkid = '10253';
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

        let obj = {
        "form[salesrep_name]": data.userInfo.data[0].formData[0].value,
        "form[client_name]": userformData[0].value,
        "form[client_company]": userformData[1].value,
        "form[client_phone]": userformData[2].value,
        "form[client_email]": userformData[3].value,
        "form[ws_imp]": "",
        "form[ws_imp]": "",
        "form[ws_timetotalk]": "",
        "form[ws_version_cb][]": "",
        "form[ws_version_cb][]": "",
        "form[number_of_servers]": "",
        "form[vendors_server_gen]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_or_azure]": "",
        "form[onprem_plan]": "",
        "form[onprem_plan]": "",
        "form[onprem_plan]": "",
        "form[onprem_plan]": "",
        "form[onprem_plan]": "",
        "form[budget_allocated]": "",
        "form[budget_allocated]": "",
        "form[budget_allocated_amt]": "",
        "form[infra_req][]": "",
        "form[infra_req][]": "",
        "form[infra_req][]": "",
        "form[infra_req][]": "",
        "form[infra_req][]": "",
        "form[infra_req_compute]": "",
        "form[infra_req_storage]": "",
        "form[infra_req_networking]": "",
        "form[feedback_gen10_server]": "",
        "form[feedback_gen10_server]": "",
        "form[send_resource]": "",
        "form[send_resource]": "",
        "form[resource_to_send]": "",
        "form[next_steps]": "",
        "form[meet_with_specialist]": "",
        "form[meet_with_specialist]": "",
        "form[specialist_meeting_datetime]": "",
        "form[other_stakeholders]": "",
        "form[other_stakeholders]": "",
        "form[other_stakeholders_details]": "",
        "form[other_questions]": "",
        "form[other_questions]": "",
        "form[optin][terms]": "",
        "form[optin][contactTypes][]": "",
        "form[optin][contactTypes][]": "",
        "form[optin][contactTypes][]": "",
        "form[optin][contactTypes][]": "",
        "form[submit]": "",
        "form[_trans]": "",
        }
        return obj;
    }
}
