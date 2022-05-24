import axios from "axios";

export const state = () => ({
  user: null,
  projects: [],
  employees: [],
  activities: [],
  payins: [],
  tasks: [],
  descriptions: [],
  comingProject: {},
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
    state.projects = [project, ...allProjects];
  },

  SET_IS_CREATING_PROJECT(state, isCreatingProject) {
    state.isCreatingProject = isCreatingProject;
  },

  GET_PROJECT_ID(state, project) {
    state.comingProject = project;
  },
  //==================================== Employees Mutations
  SET_EMPLOYEES_LIST(state, employees) {
    state.employees = employees;
  },

  UPDATE_EMPLOYEE(state, updatedEmployee) {
    const allEmployees = state.employees.filter(
      (employee) => employee.id !== updatedEmployee.id
    );
    state.employees = [updatedEmployee, ...allEmployees];
  },

  SET_IS_CREATING_EMPLOYEE(state, isCreatingEmployee) {
    state.isCreatingEmployee = isCreatingEmployee;
  },
  //==================================== Activities Mutations
  SET_ACTIVITIES_LIST(state, activities) {
    state.activities = activities;
  },
  //==================================== Payins Mutations
  SET_PAYINS_LIST(state, allPayins) {
    state.payins = allPayins;
  },

  UPDATE_PAYIN(state, updatedPayin) {
    const allPayins = state.payins.filter(
      (payins) => payins.id !== updatedPayin.id
    );
    state.payins = [updatedPayin, ...allPayins];
  },
  //==================================== Tasks and Description Mutations
  SET_TASK_DESCRIPTION_LIST(state, data) {
    state.tasks = data.tasks;
    state.descriptions = data.descriptions;
  },
};

export const actions = {
  async login({ commit }, payload) {
    const response = await axios.post("/login", payload);
    commit("SET_USER", response.data);
  },

  async fetchLoggedInUser({ commit }) {
    const response = await axios.get("/me");
    commit("SET_LOGGED_IN_USER", response.data);
  },
  //==================================== Projects Actions
  async fetchAllProjects({ commit, state }, forceRefresh = false) {
    if (!forceRefresh && state.projects.length) {
      return;
    }
    const response = await axios.get("/admin/project");
    commit("SET_PROJECTS_LIST", response.dataItems);
  },

  async updateProject({ commit }, project) {
    const response = await axios.put(`/admin/project/${project.id}`, project);
    commit("UPDATE_PROJECT", response.data);
  },

  async getProject({ commit }, id) {
    const response = await axios.get(`/admin/project/${id}`);
    commit("GET_PROJECT_ID", response.data);
  },

  async createProject({ commit, state }, project) {
    commit("SET_IS_CREATING_PROJECT", true);
    const response = await axios.post("/admin/project", project);

    commit("SET_PROJECTS_LIST", [response.data, ...state.projects]);
    commit("SET_IS_CREATING_PROJECT", false);
  },
  //==================================== Employees Actions
  async fetchAllEmployees({ commit, state }, forceRefresh = false) {
    if (!forceRefresh && state.employees.length) {
      return;
    }
    const response = await axios.get("/admin/employee");
    commit("SET_EMPLOYEES_LIST", response.dataItems);
  },

  async createEmployee({ commit, state }, newEmployee) {
    commit("SET_IS_CREATING_EMPLOYEE", true);
    const response = await axios.post("/admin/employee", newEmployee);

    commit("SET_EMPLOYEES_LIST", [response.data, ...state.employees]);
    commit("SET_IS_CREATING_EMPLOYEE", false);
  },

  async updateEmployee({ commit }, employee) {
    const updatedEmployee = await axios.put(
      `/admin/employee/${employee.id}`,
      employee
    );
    commit("UPDATE_EMPLOYEE", updatedEmployee.data);
  },
  //==================================== Activities Actions
  async fetchAllActivities({ commit, state }, forceRefresh = false) {
    if (!forceRefresh && state.activities.length) {
      return;
    }
    const response = await axios.get("/admin/activities");
    commit("SET_ACTIVITIES_LIST", response.dataItems);
  },

  async createActivity({ commit, state }, newActivity) {
    const response = await axios.post("/admin/activities", newActivity);
    commit("SET_ACTIVITIES_LIST", [response.data, ...state.activities]);
  },

  async updateActivity({ commit }, activity) {
    const updatedActivity = await axios.put(
      `/admin/activities/${activity.id}`,
      activity
    );
  },

  async deleteActivity({ commit, state }, activity) {
    const response = await axios.delete(
      `/admin/activities/${activity.id}`,
      activity
    );
  },
  //==================================== Payins Actions
  async fetchAllPayins({ commit, state }, forceRefresh = false) {
    if (!forceRefresh && state.payins.length) {
      return;
    }
    const response = await axios.get("/admin/payins");
    commit("SET_PAYINS_LIST", response.dataItems);
  },

  async createPayin({ commit, state }, newPayin) {
    const response = await axios.post("/admin/payins", newPayin);
    commit("SET_PAYINS_LIST", [response.data, ...state.payins]);
  },

  async updatePayin({ commit }, updatedPayin) {
    commit("UPDATE_PAYIN", updatedPayin);
  },

  async deletePayin({ commit, state }, payin) {
    state.payins = state.payins.filter((p) => p.id !== payin.id);
  },

  //==================================== Task and Description Actions

  async fetchAllTasksAndDescriptions({ commit, state }, forceRefresh = false) {
    console.log("Me chala hn bay");
    if (!forceRefresh && state.tasks.length) {
      return;
    }
    const response = await axios.get("/admin/task");
    commit("SET_TASK_DESCRIPTION_LIST", response.data);
  },
};

export default {
  state,
  mutations,
  actions,
};
