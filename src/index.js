import { Task } from "./task";
import { Project } from "./project";

const projectOne = Project("Test Project");

const taskOne = Task("Task 1", "Haha info", new Date(2022, 5, 9));
const taskTwo = Task("Task 2", "Hihi info", new Date(2022, 5, 7));
const taskThree = Task("Task 3", "Hoho info", new Date(2022, 5, 5));

projectOne.addTask(taskOne);
projectOne.addTask(taskTwo);
projectOne.addTask(taskThree);

console.log(projectOne);
console.log(projectOne.tasks);


