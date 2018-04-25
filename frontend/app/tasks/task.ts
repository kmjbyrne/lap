import { Project } from "../projects/project";

export class Priority {
    id: number = 0;
    label: string = "Medium";
}

export class Task {
    id: number;
    label: string = "";
    description: string = "";
    status: boolean = true;
    priority: Priority;
    project: Project;
}