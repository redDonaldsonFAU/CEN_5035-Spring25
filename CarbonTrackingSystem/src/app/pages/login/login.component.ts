import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './login.component.html',
    styleUrl: '../../app.component.css'
})
export class LoginComponent {
 /*   constructor(
        private httpService: HttpService

    ) {} */
 /*   doLogin() {
        this.httpService.getData('vehicle').subscribe((res) => {
            const data = JSON.parse(JSON.stringify(res));
            console.log(`:RED: ${data.foo}`);
        });
    }*/

    loginData:any;
    loginFunc(val:NgForm){
        console.log(val)
        this.loginData=val
    }

    signupRoute = 'signup';
    
}
