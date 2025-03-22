import { Component, Input, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export type NavItem = {
	icon: string;
	label: string;
	route?: string;
};

@Component({
	selector: 'app-cts-sidenav',
	imports: [
		RouterOutlet,
		CommonModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule
	],
	templateUrl: './cts-sidenav.component.html',
	styleUrl: './cts-sidenav.component.css'
})
export class CtsSidenavComponent {
	@Input() sideNavWidth = '150px';

	navItems = signal<NavItem[]>([
		{
			icon: 'home',
			label: 'Home',
			route: 'home'
		},
		{
			icon: 'directions_car',
			label: 'Trip',
			route: 'trips'
		},
		{
			icon: 'compare_arrows',
			label: 'Trade',
			route: 'trades'
		}
	]);
}
