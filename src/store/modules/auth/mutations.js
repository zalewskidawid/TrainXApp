export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
    state.email = payload.email;
    state.userData = payload.userData;
    state.userType = payload.userType;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};