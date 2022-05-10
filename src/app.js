const App = (() => {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
    return;
  }

  const removeProject = (projectID) => {
    projects = projects.filter(project => { project.ID != projectID })
  }

  return { projects, addProject, removeProject }
})();

export { App }
