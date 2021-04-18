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
    currentPage.value++;
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/posts/get-posts?limit=${limit}&page=${currentPage.value}`,
        withCredentials: true,
      });
      // console.log(response.data.data);

      if (response.data && response.data.data.length) {
        // console.log('I ran');
        commit('setPublicPosts', response.data);
        // CRITICAL: Instead of having else you should have an else if to check if the length is 0 otherwise set the error
      } else {
        // console.log('Last Data Retrieved!');
        commit('setAllPostsRetrieved');
      }

      // router.push({ name: 'Profile' });
    } catch (err) {
      console.log(err);
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
