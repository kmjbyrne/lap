import { Component } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent {
    projects: Project[];
    constructor(protected projectsService: ProjectsService) { }

    ngOnInit() {
        this.getProjects();
    }

    getProjects(): void {
        this.projectsService.getProjects()
            .subscribe(projects => this.projects = projects);
    }

}
