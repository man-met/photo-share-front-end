import { ref } from '@vue/reactivity';
import axios from 'axios';
const url = process.env.VUE_APP_BACK_END_URL;

const currentPage = ref(0);
// shift to add a record at the beginning of the array
export const namespaced = true;

export const state = {
  areAllCommentsRetrieved: false,
  comments: [],
  error: null,
};

export const mutations = {
  setAreAllCommentsRetrieved(state) {
    state.areAllCommentsRetrieved = true;
  },

  setComments(state, payload) {
    state.comments = payload;
  },

  addNewCommentToArray(state, payload) {
    state.comments.shift(payload);
  },

  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  async submitComment({ commit, dispatch }, payload) {
    // currentPage.value++;
    try {
      console.log(payload);
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/comment`,
        data: payload,
        withCredentials: true,
      });

      console.log(response);

      // CRITICAL: Add the new comment to the array if status code  = 201 || 200
      // commit('addNewCommentToArray', )

      dispatch('getCommentsAction', payload.postId);

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

  async getCommentsAction({ commit }, payload) {
    try {
      console.log(payload);
      const response = await axios({
        method: 'GET',
        // add the payload at the end of the url
        url: `${url}api/v1/comment?postId=${payload}&limit=20&page=${currentPage.value}`,
        withCredentials: true,
      });

      // console.log(response);
      commit('setComments', response.data.data);
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getAreAllCommentsRetrievedValue(state) {
    return state.areAllCommentsRetrieved;
  },
  getComments(state) {
    return state.comments;
  },
};
