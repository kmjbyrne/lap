import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task: Task;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.task = new Task();
  }


  addTask(task: Task) {
    console.log(task);
    this.taskService.addTask(task);
    this.task = new Task();
  }

}
