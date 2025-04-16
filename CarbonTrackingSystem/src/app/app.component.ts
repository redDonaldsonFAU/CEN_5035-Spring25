import { Component } from '@angular/core';
import { CtsHeaderComponent } from './header/cts-header/cts-header.component';
import { routes } from './app.routes';
import { provideRouter, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [CtsHeaderComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'CarbonTrackingSystem';
}
