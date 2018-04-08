import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'tasks',
				component: TasksComponent
			},
			{
				path: 'contacts',
				component: ContactsComponent
			},
			{
				path: 'projects',
				component: ProjectsComponent
			},
			{
				path: 'invoices',
				component: HomeComponent
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