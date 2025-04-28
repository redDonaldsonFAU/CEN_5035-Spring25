import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GettripsService } from './gettrips.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  user: any;
  company: any;
  vehicle: any;
  trips: any[] = [];

  constructor(
    private dashboardService: DashboardService, 
    private gettripsService: GettripsService, 
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id'); // Replace with dynamic value if needed
    if (userId) {
        this.dashboardService.getDashboardData(userId).subscribe((data: any) => {
        this.user = data.user;
        this.company = data.company;
        this.vehicle = data.vehicle;
        this.calculateTotalMiles();
        this.calculateTotalPoints();
      });

      this.gettripsService.getTrips({ employeeID: userId }).subscribe({
          next: (data) => {this.trips = data;
            this.calculateTotalMiles();
            this.calculateTotalPoints();
          console.log('trips data:', this.trips);
          },
          error: (err) => console.error('Failed to load trips:', err)
        });
    }
    
  }

  calculateTotalPoints() {
    const employeeID = this.user?._id;
    if (!employeeID) return;

    this.http.post(`/api/calcpoints?employeeID=${employeeID}`, {})
      .subscribe({
        next: (res: any) => {
          this.user.TotalPoints = res.TotalPoints;
          this.user.CarbonCredits = res.TotalCredits;
        },
        error: (err) => console.error('Recalculation failed:', err)
      });
  }

  calculateTotalMiles() {
    const employeeID = this.user?._id;
    if (!employeeID) return;

    this.http.post(`/api/calcpoints?employeeID=${employeeID}`, {})
      .subscribe({
        next: (res: any) => {
          this.user.TotalMiles = res.TotalMiles;
          this.user.CarbonCredits = res.TotalCredits;
        },

        error: (err) => console.error('Recalculation failed:', err)
      });
  }
  
  deleteTrip(tripId: string) {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.http.post('/api/deletetrip', { tripId }).subscribe({
        next: () => {
          alert('Trip deleted successfully');
          this.ngOnInit();
          this.calculateTotalMiles();
          this.calculateTotalPoints(); 
        },
        error: (err) => {
          console.error('Error deleting trip', err);
          alert('Failed to delete trip.');
        }
      });
    }
  }
}

