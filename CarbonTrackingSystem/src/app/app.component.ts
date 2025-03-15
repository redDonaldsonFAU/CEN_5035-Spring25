import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CtsHeaderComponent } from './cts-header/cts-header.component';
import { CtsSidenavComponent } from './cts-sidenav/cts-sidenav.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    CtsHeaderComponent,
    CtsSidenavComponent,
    MatButtonModule,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CarbonTrackingSystem';
}
