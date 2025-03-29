import { Component, Input, signal } from '@angular/core';
import {
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CacheService } from '../../cache.service';

export type NavItem = {
    icon: string;
    label: string;
    route?: string;
    visible: string[];
};

@Component({
    selector: 'app-cts-sidenav',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
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

    // data?: any[];
    // constructor(private cacheService: CacheService) {}

    navItems = signal<NavItem[]>(this.getData('login'));

    getData(login: string): NavItem[] {
        // const cachedData = this.cacheService.getCache(login);

        // // If the data is not in cache, we retrieve it from the server and store it in the cache.
        // if (!cachedData) {
        //     return [
        //         {
        //             icon: 'home',
        //             label: 'Home',
        //             route: 'home',
        //             visible: ['Employee', 'Employer', 'Admin']
        //         }
        //     ];
        // }

        return [
            {
                icon: 'home',
                label: 'Home',
                route: 'home',
                visible: ['Employee', 'Employer', 'Admin']
            },
            {
                icon: 'directions_car',
                label: 'Trip',
                route: 'trips',
                visible: ['Employee', 'Employer', 'Admin']
            },
            {
                icon: 'compare_arrows',
                label: 'Trade',
                route: 'trades',
                visible: ['Employer', 'Admin']
            },
            {
                icon: 'settings',
                label: 'settings',
                route: 'settings',
                visible: ['Employee', 'Employer', 'Admin']
            }
        ];
    }

    // ngOnDestroy(): void {
    //     // We unsubscribe from the cache and clear the cache data when the component is destroyed.
    //     this.cacheService.deleteCache('login');
    // }
}
