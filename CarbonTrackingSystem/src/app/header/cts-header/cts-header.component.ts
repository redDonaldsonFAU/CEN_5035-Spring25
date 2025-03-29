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
    readonly dialog = inject(MatDialog);
    showSideMenu = signal(false);

    sideNavWidth = computed(() => (this.showSideMenu() ? '65px' : '150px'));

    openDialog() {
        this.dialog.open(Dialog);
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
