// import { ref } from '@vue/reactivity';

// const url = process.env.VUE_APP_BACK_END_URL;

// const currentPage = ref(0);

export const namespaced = true;

export const state = {
  allPostsRetrieved: false,
  externalUserPosts: [],
  userDetails: [],
  error: null,
};

export const mutations = {
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {};

export const getters = {};
