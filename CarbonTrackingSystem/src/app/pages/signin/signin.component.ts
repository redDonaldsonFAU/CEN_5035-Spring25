import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CacheService } from '../../cache.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule, 
    RouterLink
  ]
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cacheService: CacheService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    console.log('Login button clicked'); //  Check if this logs
    //console.log('Form Data:', this.loginForm.value); // check what data is being sent
  
    this.http.post<any>('/api/auth', this.loginForm.value).subscribe({
      next: (res) => {
        console.log('login response', res); // check cache variable
        this.cacheService.setCache('user', res.user);
        this.cacheService.setCache('company', res.company);
        this.cacheService.setCache('vehicles', res.vehicles);
        this.cacheService.setCache('trips', res.trips);
        console.log('login post cache set', this.cacheService.getCache('user')); //check cache variable
        //console.log('login post cache set', this.cacheService.getCache('company'));
        //console.log('login post cache set', this.cacheService.getCache('vehicles'));
        //console.log('login post cache set', this.cacheService.getCache('trips'));

        setTimeout(() => {
          this.router.navigate(['/dashboard', res.user._id]);
        }, 1);
      },
      error: (err) => {
        alert('Login failed. Please check your credentials.');
        console.error(err);
      }
    });
  }
}
