import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GettripsService } from '../dashboard/gettrips.service';
import { CacheService } from '../../cache.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companydash',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './companydash.component.html',
  styleUrl: './companydash.component.scss'
})
export class CompanydashComponent {

  user: any;
  company: any;
  vehicle: any;
  trips: any[] = [];

  constructor(
    private dashboardService: DashboardService, 
    private gettripsService: GettripsService, 
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    //const userId = this.route.snapshot.paramMap.get('id'); // Replace with dynamic value if needed
    const user = this.cacheService.getCache('user');
    const employeeID = user?._id;
    const companyID = user?._companyID;
    if (employeeID) {
        this.dashboardService.getDashboardData(employeeID).subscribe((data: any) => {
        this.user = data.user;
        this.company = data.company;
        this.vehicle = data.vehicle;
      });

      this.gettripsService.getTrips({ companyID: companyID }).subscribe({
          next: (data) => {this.trips = data;
          console.log('trips data:', this.trips);
          },
          error: (err) => console.error('Failed to load trips:', err)
        });
    }
  }

  calculateTotalPoints() {
    const companyId = this.company?._id;
    if (!companyId) return;

    this.http.post(`/api/calcpoints?companyID=${companyId}`, {})
      .subscribe({
        next: (res: any) => {
          this.company.TotalPoints = res.TotalPoints;
          this.company.CarbonCredits = res.TotalCredits;
        },
                error: (err) => console.error('Recalculation failed:', err)
      });
  }
}
