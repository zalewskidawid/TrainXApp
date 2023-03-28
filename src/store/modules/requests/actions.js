export default {
  async contactCoach(context, payload) {
    const coachId = context.rootGetters.userId;
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
      userIdAddress: coachId,
      userIdRecipient: payload.coachId
    };
    const response = await fetch(
      `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId+payload.coachId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Nie udało się wysłać zapytania.'
      );
      throw error;
    }
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/requests.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        userIdRecipient: responseData[key].userIdRecipient,
        userIdAddress: responseData[key].userIdAddress,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      if(coachId === request.userIdAddress || coachId === request.userIdRecipient) {
        requests.push(request);
      }
    }

    context.commit('setRequests', requests);
  }
};
