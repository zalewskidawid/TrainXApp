export default {
     async addNewPlan(context, payload) {
         const uniqueId = new Date().getTime().toString()+ Math.floor(Math.random() * (9999 - 1000) + 9999);
        let url = `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/plans/${uniqueId}.json`;
         const planData = {
             planTitle: payload.planTitle,
             planDescription: payload.planDescription,
             planRecipient: payload.planRecipient,
             planRecipientEmail: payload.planRecipientEmail,
             planCreator: payload.planCreator,
             childPlans: payload.childPlans,
             planCreatorDisplay: payload.planCreatorDisplay
         }
         async function planRecipient() {
             if(payload.planRecipient === 'forClient') {
                 const response = await fetch('https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/clients.json');
                 const responseData = await response.json();
                 if (!response.ok) {
                     const error = new Error(responseData.message || 'Nie udało się znaleźć klienta z takim adresem email!');
                     throw error;
                 }
                 for(const key in responseData) {
                     if(responseData[key].email === payload.planRecipientEmail) {
                         planData.recipientFirstName = responseData[key].firstName;
                         planData.recipientLastName = responseData[key].lastName;
                     }
                 }
             }
         }
         await planRecipient();
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(planData)
        });
         const responseData = await response.json();
         if (!response.ok) {
             const error = new Error(
                 responseData.message || 'Nie udało się dodać planu.'
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
            const error = new Error(responseData.message || 'Nie udało się!');
            throw error;
        }
        const plans = [];

        for (const key in responseData) {
            const plan = {
                id: key,
                planTitle: responseData[key].planTitle,
                planDescription: responseData[key].planDescription,
                planRecipient: responseData[key].planRecipient,
                childPlans: responseData[key].childPlans,
                planRecipientEmail: responseData[key].planRecipientEmail,
                planCreator: responseData[key].planCreator,
                recipientFirstName: responseData[key].recipientFirstName,
                recipientLastName: responseData[key].recipientLastName,
                planCreatorDisplay: responseData[key].planCreatorDisplay
            };
                plans.push(plan);
        }
        context.commit('setAllPlans', plans);
    },
    async updatePlan(context, payload) {
        const response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/plans/${payload.id}.json`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            }
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Nie udało się zaktualizować planu!');
            throw error;
        }

        context.commit('updateStorePlan', payload)
    }
}