import { format } from "date-fns";
import { Task } from "./task";
import { App } from "./app";

const RenderController = () => {

  const renderProjectList = (projects) => {
    const projectList = document.createElement('div');
  
    projects.forEach(project => {
      const projectItem = document.createElement('button');
      projectItem.onclick = () => {
        const taskList = document.querySelector(".task-list");
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
        return;
      }

      const projectName = document.createElement('h2');
      projectName.innerText = project.name;
      projectItem.appendChild(projectName);
  
      projectList.appendChild(projectItem);
    })
  
    return projectList;
  }

  const renderTaskList = (project) => {
    const taskList = document.createElement('div');
    taskList.setAttribute("projectid", project.ID);
    taskList.classList.add("task-list");

    project.tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.id = task.ID;

      const taskName = document.createElement('h3');
      taskName.innerText = task.name;
      taskItem.appendChild(taskName);

      const taskInfo = document.createElement('p');
      taskInfo.innerText = task.info;
      taskItem.appendChild(taskInfo);

      const taskDueDate = document.createElement('p');
      taskDueDate.innerText = format(task.dueDate, 'yyyy-MM-dd');
      taskItem.appendChild(taskDueDate);

      const completeBtn = document.createElement('button');
      if(task.isComplete) {
        completeBtn.innerText = "O";
      } else {
        completeBtn.innerText = "X";
      }
      completeBtn.onclick = () => {
        task.isComplete = !task.isComplete;
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
      }
      taskItem.appendChild(completeBtn);

      const editBtn = document.createElement('button');
      editBtn.innerText = "Edit";
      taskItem.appendChild(editBtn);
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = () => {
        project.removeTask(task.ID);
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
      }
      taskItem.appendChild(deleteBtn);
  
      taskList.appendChild(taskItem);
    })

    return taskList
  }

  const newTaskForm = document.getElementById("new-task");
  newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    // Create new task
    let name = newTaskForm['new-task-name'].value;
    let info = newTaskForm['new-task-info'].value;
    let dueDate = Date.parse(newTaskForm['new-task-due-date'].value);
    const newTask = Task(name, info, dueDate);
    // Find current project id
    const taskList = document.querySelector(".task-list");
    let displayProjectID = taskList.getAttribute('projectid');
    // Add task to current project
    App.projects.forEach((project) => {
      if(project.ID == displayProjectID) {
        project.addTask(newTask);
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
        return;
      }
    })
    return;
  })
  
  return { renderProjectList, renderTaskList }
}

const DOMController = RenderController()

export { DOMController }
