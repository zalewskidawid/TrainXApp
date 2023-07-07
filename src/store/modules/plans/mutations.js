export default {
    setNewPlan(state, payload) {
        state.plans.push(payload);
    },
    setAllPlans(state, payload) {
        state.plans = payload
    }
}