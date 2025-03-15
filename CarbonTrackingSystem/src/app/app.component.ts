import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CtsHeaderComponent } from './cts-header/cts-header.component';
import { CtsSidenavComponent } from './cts-sidenav/cts-sidenav.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    CtsHeaderComponent,
    CtsSidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CarbonTrackingSystem';
}
