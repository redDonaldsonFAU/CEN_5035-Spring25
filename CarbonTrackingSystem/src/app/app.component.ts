import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  template: `    <main>      <header class="brand-name">        <img class="brand-logo" src="/public/logo.svg" alt="logo" aria-hidden="true" />      </header>      <section class="content">        <app-home></app-home>      </section>    </main>  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarbonTrackingSystem';
}
