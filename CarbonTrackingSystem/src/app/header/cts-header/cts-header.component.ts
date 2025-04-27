import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import { CtsSidenavComponent } from '../cts-sidenav/cts-sidenav.component';
import { CacheService } from '../../cache.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cts-header',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        CtsSidenavComponent,
        CommonModule
    ],
    templateUrl: './cts-header.component.html',
    styleUrl: './cts-header.component.css'
})
export class CtsHeaderComponent {
    private cacheService = inject(CacheService);
    constructor(private router: Router) {}
    loginRoute = 'signin';
    readonly dialog = inject(MatDialog);
    showSideMenu = signal(false);

    sideNavWidth = computed(() => (this.showSideMenu() ? '65px' : '150px'));

    openDialog() {
        this.dialog.open(Dialog);
        this.cacheService.deleteCache('user'); // clear both in-memory and local storage
    }
    logout(): void {
        
        this.cacheService.clearAllCache(); // clear both in-memory and local storage
        this.router.navigate(['/signin']); // redirect to login
    }
}

@Component({
    selector: 'dialog',
    templateUrl: 'dialog.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
    
})
export class Dialog {}
