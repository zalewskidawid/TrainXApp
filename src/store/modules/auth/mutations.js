export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
    state.email = payload.email;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};