const Project = (name) => {
  const ID = (Math.floor(Math.random() * Date.now())).toString();
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
    return;
  }

  const editTask = (taskID, editedTask) => {
    tasks.forEach((task, index) => {
      if(task.ID == taskID){
        tasks[index] = editedTask;
        return;
      }
    })
  }

  const removeTask = (taskID) => {
    tasks = tasks.filter(task => { task.ID != taskID });
    return;
  }

  return { ID, name, tasks, addTask, editTask, removeTask };
}

export { Project }
