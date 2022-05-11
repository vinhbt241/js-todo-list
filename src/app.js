const App = (() => {
  const projects = [];

  const addProject = function(project) {
    this.projects.push(project);
    return;
  }

  const editProject = function(projectID, newName) {
    this.projects.forEach((project, index) => {
      if(project.ID == projectID) {
        this.projects[index].name = newName;
        return;
      }
    })
  }

  const removeProject = function(projectID) {
   this.projects = this.projects.filter(project => { project.ID != projectID })
  }

  return { projects, addProject, editProject, removeProject }
})();

export { App }
