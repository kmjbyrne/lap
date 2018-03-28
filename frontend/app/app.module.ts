import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import './rxjs-operators';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		LoginComponent,
		DashboardLayoutComponent,
		LoginLayoutComponent,
		NavigationComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
	],
	providers: [AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }