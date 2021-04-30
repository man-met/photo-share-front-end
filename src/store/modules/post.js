import { ref } from '@vue/reactivity';
import axios from 'axios';
import router from '../../router';

const url = process.env.VUE_APP_BACK_END_URL;
const currentPage = ref(0);
const limit = 5;

export const namespaced = true;

export const state = {
  publicPosts: [],
  allPostsRetrieved: false,
  error: null,
};

export const mutations = {
  setPublicPosts(state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
      state.publicPosts.push(payload.data[i]);
    }
  },
  setAllPostsRetrieved(state) {
    state.allPostsRetrieved = true;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  async createPostAction({ commit }, payload) {
    try {
      commit('setProcessingRequest', null, { root: true });
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/posts/create-post`,
        data: payload,
        withCredentials: true,
      });

      commit('setPublicPosts', response.data);
      await commit('setProcessingRequest', null, { root: true });
      router.push({ name: 'Profile' });
    } catch (err) {
      await commit('setProcessingRequest', null, { root: true });
      return commit(
        'setError',
        'Oops... Something went wrong, try again later...'
      );
    }
  },

  async retrieveAllPosts({ commit }) {
    currentPage.value++;
    try {
      commit('setProcessingRequest', null, { root: true });
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/posts/get-posts?limit=${limit}&page=${currentPage.value}`,
        withCredentials: true,
      });
      if (response.data && response.data.data.length) {
        commit('setPublicPosts', response.data);
      } else {
        commit('setAllPostsRetrieved');
      }
      await commit('setProcessingRequest', null, { root: true });
    } catch (err) {
      await commit('setProcessingRequest', null, { root: true });
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getPublicPosts(state) {
    return state.publicPosts;
  },
  getAllPostsRetrievedValue(state) {
    return state.allPostsRetrieved;
  },
};
