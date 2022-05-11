const Project = (name) => {
  const ID = (Math.floor(Math.random() * Date.now())).toString();
  let tasks = [];

  const addTask = (task) => {
    thisProject.tasks.push(task);
    return;
  }

  const editTask = (taskID, editedTask) => {
    thisProject.tasks.forEach((task, index) => {
      if(task.ID == taskID){
        thisProject.tasks[index] = editedTask;
        return;
      }
    })
  }

  const removeTask = (taskID) => {
    thisProject.tasks = thisProject.tasks.filter(task => { return task.ID != taskID });
    return;
  }

  const thisProject = { ID, name, tasks, addTask, editTask, removeTask }

  return thisProject;
}

export { Project }
