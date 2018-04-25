import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable()
export class TaskService {

    tasks: Task[];
    constructor() { }

    getTasks(): Observable<Task[]> {
        this.tasks = TASKS;
        return of(this.tasks);
    }

    getOneTask(taskID: number): Observable<Task> {
        console.log(taskID);
        let task = TASKS.filter(task => task.id == taskID)[0];
        console.log(task);
        return of(task);
    }

    addTask(task: Task) {
        console.log(task);
        task.id = this.tasks.length;
        this.tasks.push(task);
        this.getTasks();
    }


    setTaskComplete(taskID: number): void {
        console.log(taskID);
    }
}