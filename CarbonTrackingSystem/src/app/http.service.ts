import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getData(endPoint: string) {
        console.log(`${this.apiUrl}/${endPoint}`);
        return this.http.get(`${this.apiUrl}/${endPoint}`);
    }

    postData(data: any) {
        return this.http.post(`${this.apiUrl}/data`, data);
    }
}
