import { Component } from '@angular/core';
import { CtsHeaderComponent } from './header/cts-header/cts-header.component';

@Component({
	selector: 'app-root',
	imports: [CtsHeaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'CarbonTrackingSystem';
}
