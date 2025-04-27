import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
// import {
//     CarouselComponent,
//     CarouselIndicatorsComponent,
//     CarouselInnerComponent,
//     CarouselItemComponent,
//     ThemeDirective
// } from '@coreui/angular';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        MatButtonModule
        // CarouselComponent,
        // CarouselInnerComponent,
        // CarouselIndicatorsComponent,
        // CarouselItemComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}
    slides: any[] = new Array(3).fill({
        id: -1,
        src: '',
        title: '',
        subtitle: ''
    });

    ngOnInit(): void {
        this.slides[0] = {
            src: '../../images/city.jpg'
        };
        this.slides[1] = {
            src: '../../images/traffic.jpg'
        };
        this.slides[2] = {
            src: '../../images/public.jpg'
        };
    }

    goLogin() {
        this.router.navigate(['/signin']);
    }
}
