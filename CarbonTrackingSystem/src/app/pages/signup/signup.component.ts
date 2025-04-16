import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  title = 'Signup Form';

  sumbitSignup(event: Event) {
    event.preventDefault();

    console.log('Signup form');
  }
}
