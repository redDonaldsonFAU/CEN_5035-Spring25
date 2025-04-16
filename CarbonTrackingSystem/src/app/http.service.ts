import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    getData(endPoint: string) {
        console.log(`${this.apiUrl}/${endPoint}`);
        return this.http.get(`${this.apiUrl}/${endPoint}`);
    }

    postData(endPoint: string, data: any) {
        return this.http.post(`${this.apiUrl}/${endPoint}`, data);
    }

    putData(endPoint: string, data: any) {
        return this.http.post(`${this.apiUrl}/${endPoint}`, data);
    }

    deleteData(endPoint: string, data: any) {
        return this.http.delete(`${this.apiUrl}/${endPoint}`, data);
    }
}
