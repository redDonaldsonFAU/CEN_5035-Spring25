import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  title = 'Signup Form';

  sumbitSignup(event: Event) {
    event.preventDefault();

    console.log('Signup form');
  }
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
}

onSubmit() {
  if (this.registrationForm.valid) {
    this.http.post('/api/register', this.registrationForm.value).subscribe({
      next: () => alert('Registration successful!'),
      error: err => alert('Error: ' + err.error?.message || err.message)
    });
  }
}
}
