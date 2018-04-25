import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'task-detail',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  task: Task;
  priorities = [
    {
      'id': 0,
      'label': 'Critical Importance'
    }
  ];

  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.getTask();
    console.log('here to get one task');
  }

  getTask() {
    this.route.params.subscribe((r) => {
      console.log('Route change: ', r);
      this.taskService.getOneTask(r.taskID).subscribe(task => {
        console.log(task);
        this.task = task;
      });
    });
  }

  closeViewTask() {
    this.router.navigate(['/tasks']);
  }

}
