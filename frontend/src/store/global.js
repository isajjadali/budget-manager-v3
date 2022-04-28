import axios from "axios";

export const state = () => ({
  user: null,
  projects: [],
  employees: [],
  activities: [],
  isCreatingProject: false,
  isCreatingEmployee: false,
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
    localStorage.setItem("token", payload.token);
  },

  SET_LOGGED_IN_USER(state, payload) {
    state.user = payload.user;
  },
  //==================================== Projects Mutations
  SET_PROJECTS_LIST(state, projects) {
    state.projects = projects;
  },
  
  UPDATE_PROJECT(state, project) {
    const allProjects = state.projects.filter((p) => p.id !== project.id);
    state.todos = [project, ...allProjects];
  },
  
  SET_IS_CREATING_PROJECT(state, isCreatingProject) {
    state.isCreatingProject = isCreatingProject;
  },
  //==================================== Employees Mutations
  SET_EMPLOYEES_LIST(state, employees) {
    state.employees = employees;
  },

  SET_IS_CREATING_EMPLOYEE(state, isCreatingEmployee) {
    state.isCreatingEmployee = isCreatingEmployee;
  },
  //==================================== Activities Mutations
  SET_ACTIVITIES_LIST(state, activities) {
    state.activities = activities;
  }
};

export const actions =  {
  async login({ commit }, payload) {
    const response = await axios.post("/login", payload);
    commit("SET_USER", response.data);
  },

  async fetchLoggedInUser({ commit }) {
    const response = await axios.get("/me");
    commit("SET_LOGGED_IN_USER", response.data);
  },
  //==================================== Projects Actions
  async fetchAllProjects({ commit }) {
    const response = await axios.get("/admin/project");
    commit("SET_PROJECTS_LIST", response.dataItems);
  },

  async updateProject({ commit }, project) {
    const response = await axios.put(`${BASE_URL}/${project.id}`, {
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    commit("UPDATE_PROJECT", responseJson);
  },

  async createProject({ commit, state }, project) {
    commit('SET_IS_CREATING_PROJECT', true);
    const response = await axios.post('/admin/project', project);

    commit('SET_PROJECTS_LIST', [response.data, ...state.projects]);
    commit('SET_IS_CREATING_PROJECT', false);
  },
  //==================================== Employees Actions
  async fetchAllEmployees({ commit }) {
    const response = await axios.get("/admin/employee");
    commit("SET_EMPLOYEES_LIST", response.dataItems);
  },
  
  async createEmployee({ commit, state }, newEmployee) {
    commit('SET_IS_CREATING_EMPLOYEE', true);
    const response = await axios.post('/admin/employee', newEmployee);
    
    commit('SET_EMPLOYEES_LIST', [response.data, ...state.employees]);
    commit('SET_IS_CREATING_EMPLOYEE', false);
  },
  //==================================== Activities Actions
  async fetchAllActivities({ commit }) {
    const response = await axios.get("/admin/activities");
    const allActivities = response.dataItems.reduce((acc, dateItem) => {
      acc.push(...dateItem.Activities.map((activity) => ({...activity, date: dateItem.date})));
      return acc;
    }, [])
    commit("SET_ACTIVITIES_LIST", allActivities);
  },

  async createActivity({ commit, state }, newActivity) {
    commit('SET_IS_CREATING_EMPLOYEE', true);
    const response = await axios.post('/admin/activities', newActivity);
    
    commit('SET_ACTIVITIES_LIST', [response.data, ...state.activities]);
    commit('SET_IS_CREATING_EMPLOYEE', false);
  },
};

export default {
  state,
  mutations,
  actions,
}