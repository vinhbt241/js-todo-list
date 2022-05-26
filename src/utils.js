import { App } from "./app";
import { Project } from "./project";
import { Task } from "./task";

const storeApp = () => {
  const projects = JSON.stringify(App.projects);

  localStorage.setItem("projects", projects);
}

const loadProjects = () => {
  const projectsHash = JSON.parse(localStorage.getItem("projects"));

  const projects = []

  if(projectsHash != null) {
    projectsHash.forEach(projectInfo => {
      const project = Project(projectInfo["name"]);
      project.ID = projectInfo["ID"];
      
      const tasks = []
      projectInfo["tasks"].forEach(taskInfo => {
        const task = Task(taskInfo["name"], taskInfo["info"], taskInfo["dueDate"]);
        task.ID = taskInfo["ID"];
        task.isComplete = taskInfo["isComplete"];
  
        tasks.push(task);
      });
  
      project.tasks = tasks;
  
      projects.push(project);
    });
  }
  

  return projects;
}

export { storeApp, loadProjects }
