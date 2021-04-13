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
      // const { user } = payload;

      // console.log(user._id);
      // console.log(state.publicPosts);
      // console.log(payload);
      const response = await axios({
        method: 'GET',
        // url: `${url}api/v1/posts/get-posts?user=${user._id}`,
        url: `${url}api/v1/posts/get-posts?limit=${limit}&page=${currentPage.value}`,
        withCredentials: true,
      });
      // console.clear();
      // console.log(response.data);

      if (response.data.data.length) {
        // console.log('I ran');
        commit('setPublicPosts', response.data);
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
  getPost(state) {
    return state.publicPosts;
  },
  getAllPostsRetrievedValue(state) {
    return state.allPostsRetrieved;
  },
};
