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
import { MatSelectModule } from '@angular/material/select';
import { CacheService } from '../../cache.service';
import { GoogleDistanceService } from './googledistanceservice';


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
    MatSelectModule,
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
    private router: Router,
    private cacheService: CacheService,
    private googleDistanceService: GoogleDistanceService
  ) {}

  ngOnInit(): void {
    const user = this.cacheService.getCache('user');
    const vehicle = this.cacheService.getCache('vehicles');
    const employeeID = user?._id;
    const companyID = user?._companyID;
    const companyName = user?.CompanyName;
    const vehicleType = vehicle?.VehicleType?.toLowerCase();
  
    this.tripForm = this.fb.group({
      _employeeID: [employeeID],
      _companyID: [companyID],
      _companyName: [companyName],
      start:[''],
      end:[''],
      method: [''],
      distance: [{ value: '', disabled: true }],
      points: [{ value: '', disabled: true }], // disable so it's not editable by user
      isdeleted: [false]
    });

    this.tripForm.get('method')?.valueChanges.subscribe(() => this.recalculatePoints());
    
  }

  onCalculateDistance(): void {
    const { start, end } = this.tripForm.value;

    if (start && end) {
      this.googleDistanceService.getDistance(start, end)
        .subscribe(response => {
          this.tripForm.patchValue({
            distance: response.distanceValueInMiles?.toFixed(2) || response.distance
          });
        }, error => {
          console.error('Error calculating distance:', error);
        });;

        this.recalculatePoints();
    }
  }

  

  submitTrip() {

    const { method, distance, points } = this.tripForm.getRawValue();
    const user = this.cacheService.getCache('user');
    const employeeID = user?._id;
    const companyID = user?._companyID;
    
    const tripData = {
      
      _employeeID: employeeID, 
      _companyID: companyID,
      distance: parseFloat(distance),
      method,
      points, 
      isdeleted: false
    };

    //const form = this.tripForm.getRawValue(); // get values including disabled ones
    this.http.post('/api/trip', tripData).subscribe({
      next: () => this.router.navigate(['/dashboard', user?._id]),
      error: err => console.error('Trip submission failed:', err),
    });
  }

  private recalculatePoints(): void {
    const method = this.tripForm.get('method')?.value;
    const distance = this.tripForm.get('distance')?.value;
    const vehicle = this.cacheService.getCache('vehicles');
    const vehicleType = vehicle?.VehicleType?.toLowerCase();
    let points = 0;
    const miles = parseFloat(distance) || 0;

    if (method === 'personal car') {
      switch (vehicleType) {
        case 'gasoline':
          points = 0.85 * miles;
          break;
        case 'hybrid':
          points = 1 * miles;
          break;
        case 'electric':
          points = 2 * miles;
          break;
      }
    } else if (method === 'public transit') {
      points = 1.5 * miles;
    } else if (method === 'walking') {
      points = 3 * miles;
    } else if (method === 'biking') {
      points = 2.5 * miles;
    }

    this.tripForm.get('points')?.setValue(points, { emitEvent: false });
  }

}
