import { Component, Input, Output, EventEmitter } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-cts-sidenav',
  imports: [
    MatButtonModule,
    MatSidenavModule
  ],
  templateUrl: './cts-sidenav.component.html',
  styleUrl: './cts-sidenav.component.css'
})
export class CtsSidenavComponent {
  @Input() showSideMenu = false;
}
