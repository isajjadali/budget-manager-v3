import axios from 'axios';

export const state = () => ({
  user: null,
  projects: [],
  employees: [],
  activities: [],
  payins: [],
  isCreatingProject: false,
  isCreatingEmployee: false,
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
    localStorage.setItem('token', payload.token);
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

  UPDATE_ACTIVITY(state, updatedActivity) {
    const allActivities = state.activities.filter(
      (activity) => activity.id !== updatedActivity.id
    );
    state.activities = [updatedActivity, ...allActivities];
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
};

export const actions = {

  async login({ commit }, payload) {
    const response = await axios.post('/login', payload);
    commit('SET_USER', response.data);
  },

  async fetchLoggedInUser({ commit }) {
    const response = await axios.get('/me');
    commit('SET_LOGGED_IN_USER', response.data);
  },
  //==================================== Projects Actions
  async fetchAllProjects({ commit, state }, forceRefresh = false) {
    if(!forceRefresh && state.projects.length) {
      return;
    }
    const response = await axios.get('/admin/project');
    commit('SET_PROJECTS_LIST', response.dataItems);
  },

  async updateProject({ commit }, project) {
    const response = await axios.put(`/admin/project/${project.id}`, project);
    commit('UPDATE_PROJECT', response.data);
  },

  async createProject({ commit, state }, project) {
    commit('SET_IS_CREATING_PROJECT', true);
    const response = await axios.post('/admin/project', project);

    commit('SET_PROJECTS_LIST', [response.data, ...state.projects]);
    commit('SET_IS_CREATING_PROJECT', false);
  },
  //==================================== Employees Actions
  async fetchAllEmployees({ commit, state }, forceRefresh = false) {
    if (!forceRefresh && state.employees.length) {
      return;
    }
    const response = await axios.get('/admin/employee');
    commit('SET_EMPLOYEES_LIST', response.dataItems);
  },

  async createEmployee({ commit, state }, newEmployee) {
    commit('SET_IS_CREATING_EMPLOYEE', true);
    const response = await axios.post('/admin/employee', newEmployee);

    commit('SET_EMPLOYEES_LIST', [response.data, ...state.employees]);
    commit('SET_IS_CREATING_EMPLOYEE', false);
  },

  async updateEmployee({ commit }, employee) {
    const updatedEmployee = await axios.put(
      `/admin/employee/${employee.id}`,
      employee
    );
    commit('UPDATE_EMPLOYEE', updatedEmployee.data);
  },
  //==================================== Activities Actions
  async fetchAllActivities({ commit, state }, forceRefresh = false) {
    if(!forceRefresh && state.activities.length) {
      return;
    }
    const response = await axios.get('/admin/activities');
    const allActivities = response.dataItems.reduce((acc, dateItem) => {
      acc.push(
        ...dateItem.Activities.map((activity) => ({
          ...activity,
          date: dateItem.date,
        }))
      );
      return acc;
    }, []);
    commit('SET_ACTIVITIES_LIST', allActivities);
  },

  async createActivity({ commit, state }, newActivity) {
    const response = await axios.post('/admin/activities', newActivity);
    commit('SET_ACTIVITIES_LIST', [response.data, ...state.activities]);
  },

  async updateActivity({ commit }, activity) {
    const updatedActivity = await axios.put(`/admin/activities/${activity.id}`, activity);
    commit('UPDATE_ACTIVITY', updatedActivity.data);
  },
  //==================================== Payins Actions
  async fetchAllPayins({ commit, state }, forceRefresh = false) {
    if(!forceRefresh && state.payins.length) {
      return;
    }
    const response = await axios.get('/admin/payins');
    const allPayins = response.dataItems.reduce((acc, dateItem) => {
      acc.push(
        ...dateItem.Activities.map((activity) => ({
          ...activity,
          date: dateItem.date,
        }))
      );
      return acc;
    }, []);
    commit('SET_PAYINS_LIST', allPayins);
  },

  async createPayin({ commit, state }, newPayin) {
    const response = await axios.post('/admin/payins', newPayin);
    commit('SET_PAYINS_LIST', [response.data, ...state.payins]);
  },

  async updatePayin({ commit }, updatedPayin) {
    commit('UPDATE_PAYIN', updatedPayin);
  },
};

export default {
  state,
  mutations,
  actions,
};
