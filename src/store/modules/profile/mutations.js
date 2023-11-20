export default {
    setUser(state, payload) {
        state.userInfo = [payload]
    },
    setUpdate(state, payload) {
        state.shouldUpdate = payload
    }
}