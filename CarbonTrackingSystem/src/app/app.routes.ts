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
import { CompanydashComponent } from './pages/companydash/companydash.component';
import { AdmindashComponent } from './pages/admindash/admindash.component';
import { AddEmployerComponent } from './pages/add-employer/add-employer.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EmployeeListComponent } from './pages/employeelist/employeelist.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';

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
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    { 
        path: 'add-trip', 
        component: AddTripComponent 
    },
    { 
        path: 'add-company', 
        component: AddEmployerComponent 
    },
    { 
        path: 'add-employee', 
        component: AddEmployeeComponent 
    },   
    {         
        canActivate: [AuthGuard],
        path: 'dashboard/:id',
        component: DashboardComponent
    },
    {         
        canActivate: [AuthGuard],
        path: 'companydash',
        component: CompanydashComponent
    },
    {         
        canActivate: [AuthGuard],
        path: 'employeelist',
        component: EmployeeListComponent
    },
    {
        path: 'admindash',
        component: AdmindashComponent,
        canActivate: [AuthGuard],
        data: { roles: ['globaladmin'] }  // assuming 'Admin' is your global admin role
    }
    
];

export class AppRoutingModule {}
