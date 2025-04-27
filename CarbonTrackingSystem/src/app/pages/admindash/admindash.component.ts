import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admindash',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule,
    NgIf,
  ],

  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.scss']
})

export class AdmindashComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private http: HttpClient,
    private router: Router
  ) {}
  
  user: any;
  companies: any[] = [];

  ngOnInit(): void {
    
    this.user = this.cacheService.getCache('user');
    this.http.get<any[]>('/api/getcompany').subscribe(data => {
      this.companies = data;
      console.log('Company Data:', this.companies);
    });
  }

  addEmployer() {
    // open dialog or navigate to company creation form
    this.router.navigate(['/add-company']);
  }

  addEmployee() {
    // Later: open dialog or navigate to employee creation form with company ID
    this.router.navigate(['/add-employee']);
  }
}