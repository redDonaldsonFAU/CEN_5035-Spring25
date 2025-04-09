import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-login',
    imports: [],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private httpService: HttpService) {}
    doLogin() {
        this.httpService.getData('vehicle').subscribe((res) => {
            const data = JSON.parse(JSON.stringify(res));
            console.log(`:RED: ${data.foo}`);
        });
    }
}
