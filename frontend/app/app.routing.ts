import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: DashboardComponent
			},
			{
				path: 'contacts',
				component: DashboardComponent
			},
			{
				path: 'projects',
				component: DashboardComponent
			},
			{
				path: 'invoices',
				component: DashboardComponent
			}
		]
	},
	{
		path: '',
		component: LoginLayoutComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
			}
		]
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }