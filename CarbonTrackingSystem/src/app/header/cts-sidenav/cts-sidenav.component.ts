import {
    Component,
    Input,
    signal,
    inject,
    OnInit,
    computed,
    ChangeDetectionStrategy
} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CacheService } from '../../cache.service';
import { Subscription } from 'rxjs';
import { SidenavService } from './sidenav.service';

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
    styleUrl: './cts-sidenav.component.css',
    changeDetection: ChangeDetectionStrategy.Default
    //providers: [CacheService]
})
export class CtsSidenavComponent implements OnInit {
    @Input() sideNavWidth = '150px';

    private refreshSub!: Subscription;
    
    user = signal<any>(null);

    // data?: any[];
    constructor(
    
    //private refreshSub!: Subscription;
    private sidenavService: SidenavService,
    private cacheService: CacheService,
    
    ){}
    

    ngOnInit(): void {
        
        this.user.set(this.cacheService.getCache('user'));
        this.sidenavService.refresh$.subscribe(() => {
            this.reinitialize();
          });
      
          this.reinitialize(); // also run it on initial load
    }

    reinitialize() {
        const user = this.cacheService.getCache('user');
        this.refreshSub = this.cacheService.sidenavRefresh$.subscribe(() => {
            this.user.set(this.cacheService.getCache('user'));
            
        });
        
        if (user) {
          console.log('Rebuilding sidenav for:', user.Role);
          // Here you would show the icons based on their role
          // Example: if (user.Role === 'admin') { show admin links }
        } else {
          console.log('No user found. Hiding sidenav.');
          // Optionally, you can hide sidenav links if no user
        }
      }

    refreshUserCache() {
        // If cache is not updated, refresh the signal
        const userData = this.cacheService.getCache('user');
        if (userData) {
            this.user.set(userData); // Manually set user data in signal
        } else {
            console.log('User data not found in cache');
        }
    }

    navItems = computed(() => {
        const userData = this.user();
        if (!userData) return []; // Return empty if no user data

        const role = userData.Role;
        return [
            {
                icon: 'home',
                label: 'Home',
                route: 'home',
                visible: ['Admin']
            },
            {
                icon: 'space_dashboard',
                label: 'Dashboard',
                route: `dashboard/${userData._id}`,
                visible: ['user', 'companyadmin']
            },
            {
                icon: 'directions_car',
                label: 'Trip',
                route: 'add-trip',
                visible: ['user', 'companyadmin', 'Admin']
            },
            {
                icon: 'view_module',
                label: 'CompanyDash',
                route: 'companydash',
                visible: ['companyadmin']
            },
            {
                icon: 'compare_arrows',
                label: 'Trade',
                route: 'trades',
                visible: ['Admin']
            },
            {
                icon: 'manage_accounts',
                label: 'Manage Accounts',
                route: 'admindash',
                visible: ['globaladmin']
            },
            {
                icon: 'settings',
                label: 'Settings',
                route: 'settings',
                visible: ['Admin']
            }
        ].filter((item) => item.visible.includes(role)); // Filter based on role
    });

    ngOnDestroy(): void {
        // We unsubscribe from the cache and clear the cache data when the component is destroyed.

        this.cacheService.clearAllCache();
        //this.refreshSub = this.cacheService.sidenavRefresh$.subscribe(() => {
         //   this.user.set(this.cacheService.getCache('user'));
        //});
        //this.refreshSub.unsubscribe();
        if (this.refreshSub) {
            this.refreshSub.unsubscribe();
          }
    }
}
