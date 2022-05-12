const Task = (name, info, dueDate) => {
  const ID = (Math.floor(Math.random() * Date.now())).toString();
  const isComplete = false;

  return { ID, name, info, dueDate, isComplete }
}

export { Task }
