import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TripsComponent } from './pages/trips/trips.component';
import { TradesComponent } from './pages/trades/trades.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/signin/signin.component';
import { AddTripComponent } from './pages/add-trip/add-trip.component';
import { AuthGuard } from './auth.guard';

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
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    { 
        path: 'dashboard/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
        import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
    },
    { 
        path: 'add-trip', 
        component: AddTripComponent 
    }
];

export class AppRoutingModule {}
