import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TripsComponent } from './pages/trips/trips.component';
import { TradesComponent } from './pages/trades/trades.component';

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
	}
];
