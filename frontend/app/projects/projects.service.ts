import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Project } from './project';
import { PROJECTS } from './mock-projects';

@Injectable()
export class ProjectsService {

    constructor() { }

    getProjects(): Observable<Project[]> {
        return of(PROJECTS);
    }
}