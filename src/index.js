import { Task } from "./task";
import { Project } from "./project";
import { DOMController } from "./DOMController";
import { App } from "./app";
import './style.css';

const contentContainer = document.querySelector('#content');

if(localStorage.getItem("projects") == null) {
  const guideProject = Project("Welcome!");

  const taskOne = Task("Mark complete task", "You can tick to the little rectange box on the left of the task's box to mark comlete", Date.now());
  const taskTwo = Task("Edit", "To edit task, click to screw symbol on the lower right corner", Date.now());
  const taskThree = Task("Delete", "You can delete task by simply click on the red X symbol at top left corner", Date.now());
  const taskFour = Task("Add new task", "Click to plus symbol on the bottom of the screen to add task", Date.now());

  guideProject.addTask(taskOne);
  guideProject.addTask(taskTwo);
  guideProject.addTask(taskThree);
  guideProject.addTask(taskFour);

  App.addProject(guideProject);
}


contentContainer.appendChild(DOMController.renderProjectList(App.projects));
contentContainer.appendChild(DOMController.renderTaskList(App.projects[0]));




