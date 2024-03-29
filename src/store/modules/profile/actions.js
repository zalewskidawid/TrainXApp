export default {
   async loadUserInfo(context, payload) {
       if(payload.forceRefresh === false) {
           return true;
       }
        const userId = context.rootGetters.userId;
                let response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/trainers/${userId}.json`);
                let responseData = await response.json();
                if(responseData === null) {
                    response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/clients/${userId}.json`);
                    responseData = await response.json();
                }
       if (!response.ok) {
           const error = new Error(responseData.message || 'Failed to fetch!');
           throw error;
       }
       const userData = {
           id: responseData.userId,
           firstName: responseData.firstName,
           lastName: responseData.lastName,
           description: responseData.description,
           email: responseData.email,
           rate: responseData.rate,
           userType: responseData.userType
       };
       context.commit('setUpdate', false);
       context.commit('setUser', userData)
    },
    async updateUserInfo(context, payload) {
       const userType = context.getters.userData[0].userType;
       const userId = context.getters.userData[0].id;
        const userData = {
            firstName: payload.firstname,
            lastName: payload.lastname,
            description: payload.description,
            rate: payload.rate,
            email: payload.email,
            userId: userId,
            userType: userType
        }
        const response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/${userType}s/${userId}.json`, {
                method: 'PUT',
                body: JSON.stringify(userData)
            }
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Nie udało się zaktualizować planu!');
            throw error;
        }
       context.commit('updateUser', userData)
    }
}