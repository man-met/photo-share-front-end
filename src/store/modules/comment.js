import { ref } from '@vue/reactivity';
import axios from 'axios';
const url = process.env.VUE_APP_BACK_END_URL;

const currentPage = ref(0);
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
    try {
      console.log(payload);
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/comment`,
        data: payload,
        withCredentials: true,
      });

      console.log(response);

      dispatch('getCommentsAction', payload.postId);
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
        url: `${url}api/v1/comment?postId=${payload}&limit=20&page=${currentPage.value}`,
        withCredentials: true,
      });

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
