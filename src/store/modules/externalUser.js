import { ref } from '@vue/reactivity';
import axios from 'axios';
const url = process.env.VUE_APP_BACK_END_URL;

const currentPage = ref(0);

export const namespaced = true;

export const state = {
  areAllPostsRetrieved: false,
  externalUserPosts: [],
  externalUserDetails: null,
  error: null,
};

export const mutations = {
  setAreAllPostsRetrieved(state) {
    state.allPostsRetrieved = true;
  },
  setExternalUserPosts(state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
      state.externalUserPosts.push(payload.data[i]);
    }
  },
  setExternalUserDetails(state, payload) {
    state.externalUserDetails = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },

  deleteExternalUserData(state) {
    state.areAllPostsRetrieved = false;
    state.externalUserPosts.length = 0;
    state.externalUserDetails = null;
    currentPage.value = 0;
  },
};

export const actions = {
  async getExternalUserProfile({ commit }, payload) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/users/${payload}`,
        withCredentials: true,
      });
      commit('setExternalUserDetails', response.data.data);
    } catch (err) {
      return commit('setError', err.message);
    }
  },

  async getExternalUserPosts({ commit }, payload) {
    currentPage.value++;
    try {
      commit('setProcessingRequest', null, { root: true });
      const userId = payload;

      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/posts/get-posts?user=${userId}&limit=12&page=${currentPage.value}`,
        withCredentials: true,
      });
      if (response.data.data.length) {
        commit('setExternalUserPosts', response.data);
      } else {
        commit('setAreAllPostsRetrieved');
      }
      await commit('setProcessingRequest', null, { root: true });
    } catch (err) {
      await commit('setProcessingRequest', null, { root: true });
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getAreAllPostsRetrievedValue(state) {
    return state.areAllPostsRetrieved;
  },
  getExternalUserPosts(state) {
    return state.externalUserPosts;
  },
  getExternalUserDetails(state) {
    return state.externalUserDetails;
  },
  getError(state) {
    return state.error;
  },
};
