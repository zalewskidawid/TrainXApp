export default {

  async contactCoach(context, payload) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const coachId = context.rootGetters.userId;
    const newRequest = {
      userEmail: payload.email,
      coachEmail: payload.coachEmail,
      userData: payload.userData,
      coachData: payload.coachData,
      messageStatus: true,
      request: {
        0: {
          messageText: payload.message,
          messageAuthor: coachId,
          messageAuthorData: payload.userData,
          date: formattedDate,
          time: formattedTime
        }
      },
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
        id: key,
        userIdRecipient: responseData[key].userIdRecipient,
        userIdAddress: responseData[key].userIdAddress,
        userEmail: responseData[key].userEmail,
        coachEmail: responseData[key].coachEmail,
        userData: responseData[key].userData,
        coachData: responseData[key].coachData,
        request: responseData[key].request,
        date: responseData[key].date,
        time: responseData[key].time,
        messageStatus: responseData[key].messageStatus
      };
      if(coachId === request.userIdAddress || coachId === request.userIdRecipient) {
        requests.push(request);
      }
    }

    context.commit('setRequests', requests);
  },
  async changeMessageStatus(context, payload) {
    const response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.conversationId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ messageStatus: payload.messageStatus})
    })
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
          responseData.message || 'Nie udało się wysłać zapytania.'
      );
      throw error;
    }
    context.commit('changeMessageStatus', payload)
  },
  async addMessage(context, payload) {
    const existingObjectsResponse = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.conversationId}/request.json`);
    const existingObjectsData = await existingObjectsResponse.json();

    let newIndex = 1;

    if (existingObjectsData) {
      const existingIndexes = Object.keys(existingObjectsData).map(index => parseInt(index, 10));
      newIndex = Math.max(...existingIndexes) + 1;
    }
    const response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.conversationId}/request/${newIndex}.json`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
          responseData.message || 'Nie udało się wysłać zapytania.'
      );
      throw error;
    }
    context.commit('addMessage', payload);
    context.dispatch('changeMessageStatus', {conversationId: payload.conversationId, messageStatus: true });
  },
  async checkConversation(context, payload) {
    const response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.userId + payload.trainerId}.json`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
          responseData.message || 'Nie udało się wysłać zapytania.'
      );
      throw error;
    }
    responseData === null ?  context.commit('setHasConversation', false) :  context.commit('setHasConversation', true)
  }

};
