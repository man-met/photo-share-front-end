import axios from 'axios';
import router from '../../router';

const url = process.env.VUE_APP_BACK_END_URL;

export const namespaced = true;

export const state = {
  publicPosts: [],
  error: null,
};

export const mutations = {
  setPublicPosts(state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
      state.publicPosts.push(payload.data[i]);
    }
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  async createPostAction({ commit }, payload) {
    try {
      // console.log('💥💥💥💥💥💥💥');
      // console.log(payload);
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/posts/create-post`,
        data: payload,
        withCredentials: true,
      });

      commit('setPublicPosts', response.data);
      router.push({ name: 'Profile' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },

  async retrieveAllPosts({ commit }) {
    try {
      // console.log(payload);
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/posts/get-posts`,
        withCredentials: true,
      });

      // console.log(response.data);
      commit('setPublicPosts', response.data);
      // router.push({ name: 'Profile' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getPost(state) {
    return state.publicPosts;
  },
};
