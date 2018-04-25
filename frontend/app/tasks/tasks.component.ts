import { Component, OnInit } from '@angular/core';
import { TaskService } from './tasks.service';
import { Task } from './task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  selectedTask: Task;

  constructor(protected taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  completeTask(task) {
    task.status = false;
  }

  hasAssignedProject(task) {
    if (task.project.id === undefined) {
      return false;
    }
    return true;
  }

  selectTask(task: Task): void {
    console.log(task);
    this.selectedTask = task;
  }

}
