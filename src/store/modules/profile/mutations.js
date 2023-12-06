export default {
    setUser(state, payload) {
        state.userInfo = [payload]
    },
    setUpdate(state, payload) {
        state.shouldUpdate = payload
    },
    updateUser(state, payload) {
        state.userInfo[0].firstName = payload.firstName;
        state.userInfo[0].lastName = payload.lastName;
        state.userInfo[0].description = payload.description;
        state.userInfo[0].rate = payload.rate;
    }
}