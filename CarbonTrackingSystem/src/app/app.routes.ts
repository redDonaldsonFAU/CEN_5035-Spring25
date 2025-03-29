import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TripsComponent } from './pages/trips/trips.component';
import { TradesComponent } from './pages/trades/trades.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'trips',
        component: TripsComponent
    },
    {
        path: 'trades',
        component: TradesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    }
];
