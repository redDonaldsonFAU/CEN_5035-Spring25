import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employer',
  imports: [
    CommonModule, 
    ReactiveFormsModule
],
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent implements OnInit {

  employerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      CompanyName: ['', Validators.required],
      CompanyAddress: ['', Validators.required],
      CompanyEmail: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employerForm.valid) {
      this.http.post('/api/addcompany', this.employerForm.value).subscribe({
        next: (res) => {
          console.log('Company added successfully!', res);
          this.router.navigate(['/admindash']); // go back to admin dashboard
        },
        error: (err) => {
          console.error('Error adding company', err);
        }
      });
    }
  }
}
