import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { CtsHeaderComponent } from '../header/cts-header/cts-header.component';
import { CtsSidenavComponent } from '../header/cts-sidenav/cts-sidenav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatSidenavContainer,
    CtsHeaderComponent,
    CtsSidenavComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']

  
})

export class LayoutComponent {}

