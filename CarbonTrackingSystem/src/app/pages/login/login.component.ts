import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [FormsModule, JsonPipe],
    templateUrl: './login.component.html',
    styleUrl: '../../app.component.css'
})
export class LoginComponent {
    constructor(
        private httpService: HttpService
        //public username: string,
        //public pass: string,
    ) {}
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

    
}
