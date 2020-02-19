import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    cformid = '4537';
    clinkid = '10557';
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


        const postBody = {
            'formid': this.cformid,
            'linkid': this.clinkid,
            'pubid': this.cpubid,
            'dataload': this.toQueryString(payload.data)
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

    
}