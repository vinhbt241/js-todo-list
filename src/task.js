const Task = (name, info, dueDate) => {
  const ID = Math.floor(Math.random() * Date.now());

  return { ID, name, info, dueDate }
}

export { Task }
