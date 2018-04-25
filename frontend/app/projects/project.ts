import { Task } from "../tasks/task";

export class Project {
    id: number;
    name: string;
    status: boolean;
    description: string;
    isBudgeted: boolean = false;
    budget: number;
    tasks: Task[];
    theme: string;
}