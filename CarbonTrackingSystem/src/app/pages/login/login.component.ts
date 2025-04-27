import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink],
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
    loginRoute = 'dashboard';
    
}
