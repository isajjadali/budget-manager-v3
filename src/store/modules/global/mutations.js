export default {
  SET_USER(state, payload) {
    state.user = payload.user;
    localStorage.setItem("token", payload.token);
  },
  SET_LOGGED_IN_USER(state, payload) {
    state.user = payload.user;
  },
};
