import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-trip.component.html',
})

export class AddTripComponent implements OnInit {
  tripForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripForm = this.fb.group({
      distance: ['', Validators.required],
      method: ['', Validators.required],
    });
  }

  submitTrip() {
    const tripData = {
      distance: parseFloat(this.tripForm.value.distance),
      method: this.tripForm.value.method,
      _employeeID: '67f19e67a97033b7955b21e6', // You would replace this with a dynamic user ID
      _companyID: '67ffd47f62e104d85bda2821',
      isdeleted: false,
    };

    this.http.post('/api/trip', tripData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: err => console.error('Trip submission failed:', err),
    });
  }
}
