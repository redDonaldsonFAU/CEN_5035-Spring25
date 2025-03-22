import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CtsHeaderComponent } from './header/cts-header/cts-header.component';

@Component({
	selector: 'app-root',
	imports: [CtsHeaderComponent, RouterModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'CarbonTrackingSystem';
}
