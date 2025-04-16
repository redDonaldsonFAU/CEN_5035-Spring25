import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardData(userId: string) {
    return this.http.get(`/api/dashboard/${userId}`);
  }
}
