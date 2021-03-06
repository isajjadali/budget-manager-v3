import axios from 'axios';
import {uniqBy, map, flatMap, sumBy} from 'lodash';

export const state = () => ({
  user: null,
  projects: [],
  employees: [],
  activities: [],
  tasks: [],
  comingProject: {},
  isCreatingProject: false,
  isCreatingEmployee: false,
  project: {
    tasks: [],
  },
  isLoadingData: {
    employees: true,
    activities: false,
    previewPdf: true,
  },
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
    localStorage.setItem('token', payload.token);
  },

  SET_LOGGED_IN_USER(state, payload) {
    state.user = payload.user;
  },

  SET_IS_LOADING_DATA(state, loading) {
    state.isLoadingData[loading.key] = loading.value;
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
    project.tasks.forEach(task => {
      task.labourCost = sumBy(task.descriptions, 'laborCost');
    });
    state.project = project;
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

  //==================================== Activities Mutations
  SET_ACTIVITIES_LIST(state, activities) {
    state.activities = activities;
  },
  //==================================== Tasks and Description Mutations
  SET_TASKS_LIST(state, data) {
    state.tasks = data.tasks;
  },
};

export const actions = {
  async login({commit}, payload) {
    const response = await axios.post('/login', payload);
    commit('SET_USER', response.data);
  },

  async fetchLoggedInUser({commit}, forceRefresh = false) {
    if (!forceRefresh && state.user) {
      return;
    }
    const response = await axios.get('/me');
    commit('SET_LOGGED_IN_USER', response.data);
  },
  //==================================== Projects Actions
  async fetchAllProjects({commit, state}, forceRefresh = false) {
    if (!forceRefresh && state.projects.length) {
      return;
    }
    const response = await axios.get('/admin/project');
    commit('SET_PROJECTS_LIST', response.dataItems);
  },

  async updateProject({commit}, project) {
    const response = await axios.put(`/admin/project/${project.id}`, project);
    commit('UPDATE_PROJECT', response.data);
  },

  async getProject({commit}, id) {
    const response = await axios.get(`/admin/project/${id}`);
    commit('GET_PROJECT_ID', response.data);
    return response.data;
  },

  async createProject({commit, state}, project) {
    commit('SET_IS_CREATING_PROJECT', true);
    const response = await axios.post('/admin/project', project);

    commit('SET_PROJECTS_LIST', [response.data, ...state.projects]);
    commit('SET_IS_CREATING_PROJECT', false);
  },

  async fetchAllTasksAndDescriptions({commit, state}, project) {
    const response = await axios.get('/admin/task', project);

    commit('SET_TASKS_LIST', response.data);
  },

  async fetchPreviewPDF (_, projectId) {
    const loading = {};
    const response = await axios.get(`/admin/project/${projectId}/preview`, {
      responseType: 'arraybuffer',
    });

    var file = new Blob([response], {type: 'application/pdf'});
    var fileURL = window.URL.createObjectURL(file);
    return fileURL;
  },

  async sendForReview (_, project) {
    const response = await axios.post(`/admin/project/${project.id}/send-invoice`, project);
    return response;
  },

  async startProject(_, project) {
    const response = await axios.post(`/admin/project/${project.id}/start`, project);
    return response;
  },

  async completeProject(_, project) {
    const response = await axios.post(`/admin/project/${project.id}/complete`, project);
    return response;
  },
  //==================================== Employees Actions
  async fetchAllEmployees({commit, state}, forceRefresh = false) {
    if (!forceRefresh && state.employees.length) {
      return;
    }
    const loading = {key: 'employees', value: true};
    commit('SET_IS_LOADING_DATA', loading);

    const response = await axios.get('/admin/employee');
    commit('SET_EMPLOYEES_LIST', response.dataItems);
    loading.value = false;
    commit('SET_IS_LOADING_DATA', loading);
  },

  async createEmployee({commit, state}, newEmployee) {
    commit('SET_IS_CREATING_EMPLOYEE', true);
    const response = await axios.post('/admin/employee', newEmployee);

    commit('SET_EMPLOYEES_LIST', [response.data, ...state.employees]);
    commit('SET_IS_CREATING_EMPLOYEE', false);
  },

  async updateEmployee({commit}, employee) {
    const updatedEmployee = await axios.put(
      `/admin/employee/${employee.id}`,
      employee
    );
    commit('UPDATE_EMPLOYEE', updatedEmployee.data);
  },

  async deleteEmployee({ commit }, employee) {
    const response = await axios.delete(
      `/admin/employee/${employee.id}`,
      employee
    )
  },

  //==================================== Activities Actions
  async fetchAllActivities(
    {commit, state},
    {forceRefresh = false, params = {}} = {}
  ) {
    if (!forceRefresh && state.activities.length) {
      return;
    }
    const loading = {key: 'activities', value: true};
    commit('SET_IS_LOADING_DATA', loading);

    const response = await axios.get('/admin/activities', {
      params,
    });
    commit('SET_ACTIVITIES_LIST', response.dataItems);
    loading.value = false;
    commit('SET_IS_LOADING_DATA', loading);
  },

  async createActivity({commit, state}, newActivity) {
    await axios.post('/admin/activities', newActivity);
  },

  async updateActivity({commit}, activity) {
    if (!activity.isPaid) {
      activity = {
        ...activity,
        amount: 0
      };
    }
    const updatedActivity = await axios.put(`/admin/activities/${activity.id}`, activity);
  },

  async deleteActivity({commit}, activity) {
    const response = await axios.delete(
      `/admin/activities/${activity.id}`,
      activity
    );
  },
};

export const getters = {
  descriptions(state) {
    return uniqBy(
      flatMap(map(state.tasks, ({descriptions}) => descriptions)),
      'description'
    );
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
};
