import { NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
        // CarouselComponent,
        // CarouselInnerComponent,
        // CarouselIndicatorsComponent,
        // CarouselItemComponent,
        NgFor
        // ThemeDirective
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    slides: any[] = new Array(3).fill({
        id: -1,
        src: '',
        title: '',
        subtitle: ''
    });

    ngOnInit(): void {
        this.slides[0] = {
            src: './images/city.jpg'
        };
        this.slides[1] = {
            src: './images/traffic.jpg'
        };
        this.slides[2] = {
            src: './images/public.jpg'
        };
    }
}
