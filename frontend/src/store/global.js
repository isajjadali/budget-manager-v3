import axios from "axios";

export const state = () => ({
  user: null,
  projects: [],
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
    localStorage.setItem("token", payload.token);
  },

  SET_LOGGED_IN_USER(state, payload) {
    state.user = payload.user;
  },

  SET_PROJECTS_LIST(state, projects) {
    state.projects = projects;
  },

  UPDATE_PROJECT(state, project) {
    const allProjects = state.projects.filter((p) => p.id !== project.id);
    state.todos = [project, ...allProjects];
  },
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
  
};

export default {
  state,
  mutations,
  actions,
}