import { Component, Input, Output, EventEmitter, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export type NavItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-cts-sidenav',
  imports: [
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
  @Input() showSideMenu = false;

  navItems = signal<NavItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home'
    }
  ]);
}
