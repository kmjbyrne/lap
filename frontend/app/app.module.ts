
// All application modules import together for consistency
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import {
	MatButtonModule,
	MatCheckboxModule,
	MatInputModule,
	MatIconModule
} from '@angular/material';

import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import 'hammerjs';

// All components import together for consistency
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TasksComponent } from './tasks/tasks.component';

// All services import together for consistency
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TaskService } from './tasks/tasks.service';
import { ProjectsService } from './projects/projects.service';


import './rxjs-operators';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';


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
		TasksComponent,
		ViewTaskComponent,
		AddTaskComponent,
		AddProjectComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTooltipModule,
		MatSelectModule,
		MatInputModule,
		MatIconModule,
		ColorPickerModule
	],
	providers: [AuthService, AuthGuard, TaskService, ProjectsService],
	bootstrap: [AppComponent]
})
export class AppModule { }