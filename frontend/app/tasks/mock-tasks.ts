import { Task, Priority } from "./task";
import { Project } from "../projects/project";


let randomColor = () => {
    for (let i = 0; i < 100; i++) {
        console.log('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
let defineMockTasks = () => {
    let range = 50;
    let generic = new Task();
    generic.id = 0;
    generic.label = 'Create application'
    generic.status = true;
    generic.description = "kadsfklsdfbalksdbfalksdbfkajshdbfkajshdfbkajsdhfbakjsdhfbakjshdf";

    generic.project = new Project();
    generic.project.id = 0;
    generic.project.name = 'Test';
    generic.project.description = 'A test project';
    generic.project.theme = randomColor();

    let tasks = [];
    for (let i = 0; i < range; i++) {
        let newTask = Object.assign({}, generic);

        newTask.priority = new Priority();
        newTask.priority.id = Math.floor((Math.random() * 4) + 1);
        newTask.priority.label = 'Normal';
        let random = randomColor();
        newTask.project.theme = random;
        console.log(newTask);
        newTask.id = i;
        if (i == 2) {
            newTask.project = new Project();
            newTask.project.theme = random;
            newTask.status = false;
        }
        tasks.push(newTask);
    }
    return tasks;
}
export const TASKS: Task[] = defineMockTasks();
