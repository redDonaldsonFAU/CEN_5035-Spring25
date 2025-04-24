import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GettripsService {
  constructor(private http: HttpClient) {}

  getTrips(filters: { employeeID?: string, companyID?: string }): Observable<any[]> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<any[]>('/api/gettrips', { params });
  }
}
