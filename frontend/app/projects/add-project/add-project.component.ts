import { Component, OnInit } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  project: Project;
  constructor() { }

  ngOnInit() {
    this.project = new Project();
  }

  isBudgeted() {
    if (this.project.isBudgeted === true) {
      return true;
    }
    return false;
  }

  createPlan() {
    console.log(this.project);
  }

  setProjectTheme(event) {
    this.project.theme = event;
  }

  change() {
    console.log(this.project);
  }
}
