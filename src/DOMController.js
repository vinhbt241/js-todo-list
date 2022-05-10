import { format } from "date-fns";

const RenderController = () => {
  const renderProjectList = (projects) => {
    const projectList = document.createElement('div');
  
    projects.forEach(project => {
      const projectItem = document.createElement('button');
      projectItem.id = project.ID;

      const projectName = document.createElement('h2');
      projectName.innerText = project.name;
      projectItem.appendChild(projectName);
  
      projectList.appendChild(projectItem);
    })
  
    return projectList;
  }

  const renderTaskList = (tasks) => {
    const taskList = document.createElement('div');

    tasks.forEach(task => {
      const taskItem = document.createElement('button');
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
      completeBtn.innerText = "Complete"
      taskItem.appendChild(completeBtn);

      const editBtn = document.createElement('button');
      editBtn.innerText = "Edit";
      taskItem.appendChild(editBtn);
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = (e) => {
        const taskID = e.target.parentElement.id;
        // currentProject.tasks.removeTask(taskID)
      }
      taskItem.appendChild(deleteBtn);
  
      taskList.appendChild(taskItem);
    })

    const currentProject = () => {
      
    }

    return taskList
  }
  
  return { renderProjectList, renderTaskList }
}

const DOMController = RenderController()

export { DOMController }
