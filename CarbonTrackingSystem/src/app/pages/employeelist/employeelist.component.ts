import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../../cache.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employeelist',
  imports: [ 
    NgIf,
    CommonModule
   ],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.scss',
})

export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  user: any;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.loadEmployeesForCompany();
  }

  loadEmployeesForCompany(): void {
    this.user = this.cacheService.getCache('user');
    if (!this.user || !this.user._companyID) {
      console.error('No cached user or company ID found');
      return;
    }
    console.log('UserInfo:', this.user);

    const companyID = this.user._companyID;

    this.http.get<any[]>(`/api/getemployees?companyID=${companyID}`).subscribe({
      next: (data) => {
        this.employees = data;
        console.log('Employees loaded:', this.employees);
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }
}