import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactsComponent } from './contacts/contacts.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import './rxjs-operators';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProjectsComponent,
		ContactsComponent,
		LoginComponent,
		DashboardLayoutComponent,
		LoginLayoutComponent,
		NavigationComponent,
		TasksComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule
	],
	providers: [AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }