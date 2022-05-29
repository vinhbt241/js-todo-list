import { storeApp, loadProjects } from "./utils";


const App = (() => {
  const projects = loadProjects();

  const addProject = function(project) {
    this.projects.push(project);
    storeApp();
    return;
  }

  const editProject = function(projectID, newName) {
    this.projects.forEach((project, index) => {
      if(project.ID == projectID) {
        this.projects[index].name = newName;
        storeApp();
        return;
      }
    })
  }

  const removeProject = function(projectID) {
    this.projects = this.projects.filter(project => { return project.ID != projectID })
    return;
  }

  return { projects, addProject, editProject, removeProject }
})();

export { App }
