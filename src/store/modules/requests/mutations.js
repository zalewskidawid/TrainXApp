export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  addMessage(state, payload) {
    const originalRequest = state.requests[0].request;
    const lastIndex = Object.keys(originalRequest).reduce((maxIndex, currentIndex) => {
      const numericIndex = parseInt(currentIndex, 10);
      return numericIndex > maxIndex ? numericIndex : maxIndex;
    }, -1);

    const newIndex = (lastIndex + 1).toString();
    originalRequest[newIndex] = payload;
    state.requests[0].request = originalRequest;
  }
};