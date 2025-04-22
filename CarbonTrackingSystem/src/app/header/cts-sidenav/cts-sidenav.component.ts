import { Component, Input, signal, inject, OnInit, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CacheService } from '../../cache.service';
import { Subscription } from 'rxjs';

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
        MatIconModule,
    ],
    templateUrl: './cts-sidenav.component.html',
    styleUrl: './cts-sidenav.component.css',
    //providers: [CacheService]
})
export class CtsSidenavComponent implements OnInit {
    @Input() sideNavWidth = '150px';

    // data?: any[];
    private cacheService = inject(CacheService);
    private refreshSub!: Subscription;
    user = signal(this.cacheService.getCache('user'));
    //navItems = signal<NavItem[]>([]);
    //navItems = signal<NavItem[]>(this.getData('user'));
    
    ngOnInit(): void {
        // This runs after the component is initialized
        //const cachedUser = this.cacheService.getCache('user');
    
        //if (cachedUser) {
         // this.navItems.set(this.getData(cachedUser.Role));
                 //}
                 //this.refreshUserCache();
                 this.refreshSub = this.cacheService.sidenavRefresh$.subscribe(() => {
                  this.user.set(this.cacheService.getCache('user'));
                });
      }

      refreshUserCache() {
        // If cache is not updated, refresh the signal
        const userData = this.cacheService.getCache('user');
        if (userData) {
          this.user.set(userData);  // Manually set user data in signal
        } else {
          console.log('User data not found in cache');
        }
      }

      navItems = computed(() => {
        const userData = this.user();
        if (!userData) return [];  // Return empty if no user data

        const role = userData.Role;
    return [
      { 
        icon: 'home', 
        label: 'Home', 
        route: 'home', 
        visible: ['user', 'companyadmin', 'Admin'] 
      },
      {
        icon: 'space_dashboard',
        label: 'Dashboard',
        route: 'dashboard',
        visible: ['user']
      },
      { 
        icon: 'directions_car', 
        label: 'Trip', 
        route: 'add-trip', 
        visible: ['user', 'companyadmin', 'Admin'] 
      },
      { 
        icon: 'compare_arrows', 
        label: 'Trade', 
        route: 'trades', 
        visible: ['companyadmin', 'Admin'] 
      },
      { 
        icon: 'settings', 
        label: 'Settings', 
        route: 'settings', 
        visible: ['user', 'companyadmin', 'Admin'] 
      },
    ].filter(item => item.visible.includes(role));  // Filter based on role
  });



    

    ngOnDestroy(): void {
        // We unsubscribe from the cache and clear the cache data when the component is destroyed.
        this.refreshSub.unsubscribe();
        this.cacheService.clearAllCache();
    }
}
