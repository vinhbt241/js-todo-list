import { format } from "date-fns";
import { Task } from "./task";
import { App } from "./app";
import { Project } from "./project";
import { storeApp } from "./utils";

const RenderController = () => {

  const renderProjectList = (projects) => {
    const projectList = document.createElement('div');
    projectList.classList.add("project-list")
  
    projects.forEach(project => {
      const projectItem = document.createElement('button');
      projectItem.onclick = () => {
        const taskList = document.querySelector(".task-list");
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
        return;
      }

      projectItem.innerText = project.name;
  
      projectList.appendChild(projectItem);
    })
    return projectList;
  }

  const renderTaskList = (project) => {
    const taskList = document.createElement('div');
    taskList.setAttribute("projectid", project.ID);
    taskList.classList.add("task-list");

    const completedTasks = document.createElement('div');
    completedTasks.classList.add("completed-tasks-container");
    completedTasks.innerHTML = ("<h1>Completed Tasks</h1>");

    project.tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.id = task.ID;
      taskItem.classList.add("task");

      const taskName = document.createElement('h3');
      taskName.innerText = task.name;
      taskItem.appendChild(taskName);

      const wrapper1 = document.createElement("div");
      wrapper1.classList.add("task-content");

      const completeBtn = document.createElement('button');
      completeBtn.classList.add("complete-task-btn");
      
      if(task.isComplete) {
        completeBtn.innerText = "✔";
        completeBtn.classList.add("task-complete");
      } else {
        completeBtn.innerText = " ";
        completeBtn.classList.remove("task-complete");
      }
      completeBtn.onclick = () => {
        task.isComplete = !task.isComplete;
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
        storeApp();
      }
      wrapper1.appendChild(completeBtn);
      
      const wrapper2 = document.createElement("div");

      const taskInfo = document.createElement('p');
      taskInfo.innerText = task.info;
      wrapper2.appendChild(taskInfo);

      const taskDueDate = document.createElement('p');
      taskDueDate.innerText = "Due date: " + format(task.dueDate, 'yyyy-MM-dd');
      wrapper2.appendChild(taskDueDate);
      
      wrapper1.appendChild(wrapper2);

      const wrapper3 = document.createElement("div");
      wrapper3.classList.add("task-setting-container");

      const editBtn = document.createElement('button');
      editBtn.innerText = "⚙︎";
      editBtn.onclick = () => {
        const editTaskForm = document.getElementById("edit-task");
        editTaskForm.classList.add("show");

        editTaskForm['edit-task-name'].value = task.name;
        editTaskForm['edit-task-info'].value = task.info;
        editTaskForm['edit-task-due-date'].value = format(task.dueDate, 'yyyy-MM-dd');
        editTaskForm['edit-task-id'].value = task.ID;
        editTaskForm.addEventListener('submit',e => {
          e.preventDefault();
          editTaskForm.classList.remove("show");

          let name = editTaskForm['edit-task-name'].value;
          let info = editTaskForm['edit-task-info'].value;
          let dueDate = Date.parse(editTaskForm['edit-task-due-date'].value);
          let taskID = editTaskForm['edit-task-id'].value;
          const editedTask = Task(name, info, dueDate);

          const taskList = document.querySelector(".task-list");
          let displayProjectID = taskList.getAttribute('projectid');

          App.projects.forEach((project) => {
            if(project.ID == displayProjectID) {
              project.editTask(taskID, editedTask);
              taskList.parentNode.replaceChild(renderTaskList(project), taskList);
              return;
            }
          })

          storeApp();
          return;
        })
        return;
      }
      wrapper3.appendChild(editBtn);
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "🗑";
      deleteBtn.onclick = () => {
        project.removeTask(task.ID);
        taskList.parentNode.replaceChild(renderTaskList(project), taskList);
        
        storeApp();
      }

      wrapper3.appendChild(deleteBtn);
      wrapper1.appendChild(wrapper3);
      taskItem.appendChild(wrapper1);

      if(task.isComplete) {
        completedTasks.appendChild(taskItem);
      } else {
        taskList.appendChild(taskItem);
      }
    })

    taskList.appendChild(completedTasks);

    return taskList;
  }

  const newTaskForm = document.getElementById("new-task");
  newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    newTaskForm.classList.remove("show");
    // Create new task
    let name = newTaskForm['new-task-name'].value;
    let info = newTaskForm['new-task-info'].value;
    let dueDate = Date.now();
    if(newTaskForm['new-task-due-date'].value != "") {
      dueDate = Date.parse(newTaskForm['new-task-due-date'].value);
    }
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

    storeApp()
    return;
  })

  const newProjectForm = document.getElementById("new-project");
  newProjectForm.addEventListener('submit', e => {
    e.preventDefault();
    newProjectForm.classList.remove('show');
    let name = newProjectForm['new-project-name'].value;
    const newProject = Project(name);

    App.addProject(newProject);
    location.reload();

    storeApp();
    return;
  })

  const addNewProjectBtn = document.getElementById("add-project")
  addNewProjectBtn.onclick = () => {
    newProjectForm.classList.add("show");
  }

  const changeProjectNameBtn = document.getElementById("change-project-name");
  changeProjectNameBtn.onclick = () => {
    const taskList = document.querySelector(".task-list");
    let displayProjectID = taskList.getAttribute('projectid');

    const oldEditProjectForm = document.getElementById("edit-project");
    const editProjectForm = oldEditProjectForm.cloneNode(true);
    oldEditProjectForm.parentNode.replaceChild(editProjectForm, oldEditProjectForm);
    
    const currentProject = App.projects.find(project => {
      return project.ID == displayProjectID;
    })

    editProjectForm["edit-project-name"].value = currentProject.name;

    editProjectForm.classList.add("show");

    editProjectForm.addEventListener('submit', e => {
      e.preventDefault();
      editProjectForm.classList.remove("show");
      let newName = editProjectForm['edit-project-name'].value;

      App.editProject(displayProjectID, newName);

      const projectList = document.querySelector(".project-list");
      projectList.parentNode.replaceChild(renderProjectList(App.projects), projectList);

      storeApp();
      return;
    })

    return;
  } 

  const deleteProjectBtn = document.getElementById("delete-project");
  deleteProjectBtn.onclick = () => {
    const taskList = document.querySelector(".task-list");
    let displayProjectID = taskList.getAttribute('projectid');
    App.removeProject(displayProjectID);
    storeApp();
    location.reload();
  }

  // Add some CSS to allow toggle form when add new task and edit projects

  const addTaskBtn = document.getElementById("add-task");
  addTaskBtn.onclick = () => {
    newTaskForm.classList.add('show');
  }

  const projectSettingBtn = document.getElementById("project-setting");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  projectSettingBtn.onclick = () => {
    dropdownMenu.classList.toggle("show-dropdown");
  }

  return { renderProjectList, renderTaskList }
}

const DOMController = RenderController()

export { DOMController }
