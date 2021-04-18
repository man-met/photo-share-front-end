// import { ref } from '@vue/reactivity';
import axios from 'axios';
const url = process.env.VUE_APP_BACK_END_URL;

// const currentPage = ref(0);

export const namespaced = true;

export const state = {};

export const mutations = {};

export const actions = {
  async submitComment({ commit }, payload) {
    // currentPage.value++;
    try {
      console.log(payload);
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/comment/`,
        data: payload,
        withCredentials: true,
      });

      console.log(response);
      // if (response.data.data.length) {
      //   // console.log('I ran');
      //   commit('setExternalUserPosts', response.data);
      // } else {
      //   console.log('Last Data Retrieved!');
      //   commit('setAreAllPostsRetrieved');
      // }
      // router.push({ name: 'Profile' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },
};

export const getters = {};
