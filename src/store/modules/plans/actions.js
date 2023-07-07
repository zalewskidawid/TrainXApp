export default {
     async addNewPlan(context, payload) {
         const uniqueId = new Date().getTime().toString()+ Math.floor(Math.random() * (9999 - 1000) + 9999);
        let url = `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/plans/${uniqueId}.json`;
       const planData = {
           planTitle: payload.planTitle,
           planDescription: payload.planDescription,
           planRecipient: payload.planRecipient,
           planRecipientEmail: payload.planRecipientEmail,
           childPlans: payload.childPlans
       }
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(planData)
        });
         const responseData = await response.json();
         if (!response.ok) {
             const error = new Error(
                 responseData.message || 'Failed to add new plan.'
             );
             throw error;
         }
         context.commit('setNewPlan', planData);
    },
    async loadAllPlans(context, payload) {
         if(payload.forceRefresh === false) {
             return true;
         }
        const response = await fetch(
            `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/plans.json`
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        const plans = [];

        for (const key in responseData) {
            const plan = {
                id: key,
                planTitle: responseData[key].planTitle,
                planDescription: responseData[key].planDescription,
                planRecipient: responseData[key].planRecipient,
                childPlans: responseData[key].childPlans
            };
                plans.push(plan);
        }
        context.commit('setAllPlans', plans);
    }
}