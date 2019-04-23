import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }

    public doCall(payload): Observable<any> {

        let headers = new HttpHeaders({ contentType: "application/x-www-form-urlencoded" });
        let data = payload.data;
        data.headers = headers

        return this.http.request(payload.type, payload.url, data)

    }
}
