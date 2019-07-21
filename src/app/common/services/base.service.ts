import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
const API_URL = environment.baseUrl;
const API_JSON_URL = environment.jsonBaseUrl;

@Injectable()
export class BaseService {

    httpOptions = {
        headers: new HttpHeaders({
            // "Access-Control-Allow-Origin": "*"
            "content-type": "application/json"
        })
    };
    constructor(private http: HttpClient) {

    }

    protected get(serviceUrl: string, jsonUrl: string): Observable<any> {
        try {
            if (environment.isService) {
                return this.http.get(API_URL + serviceUrl, this.httpOptions);
            } else {
                return this.http.get(API_JSON_URL + jsonUrl);
            }
        } catch (err) {
            console.log("http error : ", err);
            throw err;
        }
    }

    protected post(serviceUrl: string, jsonUrl: string, data: any): Observable<any> {
        try {
            if (environment.isService) {
                return this.http.post(API_URL + serviceUrl, data, this.httpOptions);

            } else {
                const url = environment.jsonBaseUrl + jsonUrl;
                return this.http.post(url, data);
            }

        } catch (err) {

            console.log("http error : ", err);
            throw err;
        }
    }

    protected put(serviceUrl: string, jsonUrl: string, data: any): Observable<any> {
        try {
            if (environment.isService) {
                return this.http.put(API_URL + serviceUrl, data, this.httpOptions);

            } else {
                const url = environment.jsonBaseUrl + jsonUrl;
                return this.http.put(url, data);
            }

        } catch (err) {

            console.log("http error : ", err);
            throw err;
        }
    }


    protected delete(serviceUrl: string, jsonUrl: string): Observable<any> {
        try {
            if (environment.isService) {
                return this.http.delete(API_URL + serviceUrl, this.httpOptions);

            } else {
                const url = environment.jsonBaseUrl + jsonUrl;
                return this.http.delete(url);
            }

        } catch (err) {

            console.log("http error : ", err);
            throw err;
        }
    }
}
