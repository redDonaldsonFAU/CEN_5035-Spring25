import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    AsyncPipe,
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const userId = '67f19e67a97033b7955b21e6'; // Replace with dynamic value if needed
    this.dashboardService.getDashboardData(userId).subscribe((data: any) => {
      this.user = data.user;
      this.company = data.company;
      this.vehicle = data.vehicle;
    });
  }
}
