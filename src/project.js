const Project = (name) => {
  const ID = (Math.floor(Math.random() * Date.now())).toString();
  let tasks = [];

  const addTask = function(task) {
    this.tasks.push(task);
    return;
  }

  const editTask = function(taskID, editedTask) {
    this.tasks.forEach((task, index) => {
      if(task.ID == taskID){
        this.tasks[index] = editedTask;
        return;
      }
    })
  }

  const removeTask = function(taskID) {
    this.tasks = this.tasks.filter(task => { return task.ID != taskID });
    return;
  }

  const thisProject = { ID, name, tasks, addTask, editTask, removeTask }

  return thisProject;
}

export { Project }
