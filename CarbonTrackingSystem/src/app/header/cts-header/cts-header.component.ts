import { Component, computed, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CtsSidenavComponent } from '../cts-sidenav/cts-sidenav.component';

@Component({
	selector: 'app-cts-header',
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		CtsSidenavComponent
	],
	templateUrl: './cts-header.component.html',
	styleUrl: './cts-header.component.css'
})
export class CtsHeaderComponent {
	showSideMenu = signal(false);

	sideNavWidth = computed(() => (this.showSideMenu() ? '65px' : '150px'));
}
