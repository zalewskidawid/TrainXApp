
export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  addMessage(state, payload) {
    const conversationIndex = state.requests.findIndex(conversation => conversation.id === payload.conversationId);

    if (conversationIndex !== -1) {
      const originalRequest = state.requests[conversationIndex].request;
      const lastIndex = Object.keys(originalRequest).reduce((maxIndex, currentIndex) => {
        const numericIndex = parseInt(currentIndex, 10);
        return numericIndex > maxIndex ? numericIndex : maxIndex;
      }, -1);

      const newIndex = (lastIndex + 1).toString();
      originalRequest[newIndex] = payload;
      state.requests[conversationIndex].request = originalRequest;
    } else {
      console.error('Nie znaleziono konwersacji o podanym conversationId');
    }
  },
  changeMessageStatus(state, payload) {
    const { conversationId, statusMessage } = payload;
    const conversation = state.requests.find(request => request.id === conversationId);
    if (conversation) {
      conversation.statusMessage = statusMessage;
    } else {
      console.error('Nie znaleziono konwersacji o podanym conversationId:', conversationId);
    }
  },
  setHasConversation(state, payload) {
    state.hasConversation = payload;
  }
};