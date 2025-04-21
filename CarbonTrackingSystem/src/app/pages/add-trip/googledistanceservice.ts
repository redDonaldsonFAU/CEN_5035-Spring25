import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleDistanceService {

  private apiUrl = '/api/distance';  // No need for full URL, as Angular is served by the same server

  constructor(private http: HttpClient) { }

  getDistance(start: string, end: string): Observable<any> {
    const body = { source: start, destination: end };
    return this.http.post<any>(this.apiUrl, body);
  }
}