export default {
  userId(state) {
    return state.userId;
  },
  userEmail(state) {
    return state.email
  },
  userData(state) {
    return state.userData
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};