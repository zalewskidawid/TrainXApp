export default {
    setNewPlan(state, payload) {
        state.plans.push(payload);
    },
    setAllPlans(state, payload) {
        state.plans = payload
    },
    updateStorePlan(state, payload) {
        const index = state.plans.findIndex((plan) => plan.id === [payload].id);
        if (index !== -1) {
            state.plans[index] = payload;
        }
    }
}