import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CtsSidenavComponent } from "../cts-sidenav/cts-sidenav.component";

@Component({
  selector: 'app-cts-header',
  imports: [
    // RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CtsSidenavComponent
],
  templateUrl: './cts-header.component.html',
  styleUrl: './cts-header.component.css'
})
export class CtsHeaderComponent {
  showSideMenu = false;
}
