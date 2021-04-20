export const namespaced = true;

export const state = {
  trackRoute: '',
};

export const mutations = {
  setTrackRoute(state, payload) {
    state.trackRoute = payload;
  },
};

export const getters = {
  getTrackRoute(state) {
    return state.trackRoute;
  },
};
