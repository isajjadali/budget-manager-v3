import axios from 'axios';

export default {
  async login({ commit }, payload) {
    const response = await axios.post("/login", payload);
    commit("SET_USER", response.data);
  },
  async fetchLoggedInUser({ commit }) {
    const response = await axios.get("/me");
    commit("SET_LOGGED_IN_USER", response.data);
  },
};
