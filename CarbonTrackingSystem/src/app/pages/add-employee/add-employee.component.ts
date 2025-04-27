import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { CacheService } from '../../cache.service'

@Component({
  selector: 'app-add-employee',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  companies: any[] = [];
  vehicles: any[] = []; // Store available vehicles
  filteredModels: any[] = []; // Models filtered by selected Make
  selectedVehicleMake: string = ''; // Track selected Make
  selectedVehicleModel: string = ''; // Track selected Model
  selectedVehicleId: string = ''; // Track selected vehicle ID
  selectedCompanyId: string = ''; // to hold the selected company ID
  vehicleMakes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private cacheService: CacheService,
  ) {}

  ngOnInit(): void {
    
    this.employeeForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      HomeAddress:['',[Validators.required]],
      CompanyName: ['', Validators.required], // We'll bind to this in the dropdown
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      Role:['', Validators.required],
      VehicleMake: ['', Validators.required],
      VehicleModel: ['', Validators.required]
           
    });

    this.loadCompanies(); // Load companies when the component initializes
    this.loadVehicles();
   
  }

  // Load companies from API
  loadCompanies(): void {
    this.http.get<any[]>('/api/getcompany').subscribe(
      (data) => {
        this.companies = data;
        this.cdRef.detectChanges();  // Trigger change detection to update the view
        
      },
      
      (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  loadVehicles(): void {
    
    this.http.get<any[]>('/api/getvehicles').subscribe(
      (data) => {
        this.vehicles = data;
        this.vehicleMakes = [...new Set(this.vehicles.map(v => v.Make))];
        this.cdRef.detectChanges();  // Trigger change detection to update the view
      },
      
      (error) => {
        console.error('Error fetching vehicles', error);
      }
    );
    
  }

  // Handle the change event when a company is selected from the dropdown
  onCompanyChange(event: any): void {
    this.selectedCompanyId = event.value;
    //this.selectedCompanyName = this.companies.
    console.log('Selected company ID:', this.selectedCompanyId);
  }

  onVehicleChange(event: any): void {
    this.selectedVehicleId = event.value;
    console.log('Selected vehicle ID:', this.selectedVehicleId);
  }

  onMakeChange(event: any): void {
    this.selectedVehicleMake = event.value;
  
    // Filter models by Make
    this.filteredModels = this.vehicles.filter(
      (vehicle) => vehicle.Make === this.selectedVehicleMake
    );
  
    // Clear any previously selected Model
    this.employeeForm.patchValue({ VehicleModel: '' });
    this.selectedVehicleModel = '';
    this.selectedVehicleId = '';
  }

  onModelChange(event: any): void {
    this.selectedVehicleModel = event.value;
  
    // Find the selected Vehicle object to get Vehicle ID
    const selectedVehicle = this.filteredModels.find(
      (vehicle) => vehicle.Model === this.selectedVehicleModel
    );
  
    if (selectedVehicle) {
      this.selectedVehicleId = selectedVehicle._id;
      console.log('Selected vehicle ID:', this.selectedVehicleId)
    }
  }



  // Handle form submission
  onSubmit(): void {
    if (this.employeeForm.valid) {

      const selectedCompany = this.companies.find(
        (company) => company._id === this.selectedCompanyId
      );
      if (!selectedCompany) {
        console.error('Selected company not found!');
        return;
      }
      const selectedVehicle = this.vehicles.find(
        (vehicle) => vehicle._id === this.selectedVehicleId
      );

      if (!selectedVehicle) {
        console.error('Selected vehicle not found!');
        return;
      }

      const formData = { 
        ...this.employeeForm.value, 
        companyId: this.selectedCompanyId,
        CompanyName: selectedCompany.CompanyName,
        CompanyAddress: selectedCompany.CompanyAddress,
        vehicleId: this.selectedVehicleId, 
      };
      console.log('Submitting form data:', formData);

      // Call API to create the employee with the selected company ID
      this.http.post('/api/addemployee', formData).subscribe(
        (response) => {
          console.log('Employee added successfully', response);
          this.router.navigate(['/admindash']); // Navigate back to dashboard
        },
        (error) => {
          console.error('Error adding employee', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
