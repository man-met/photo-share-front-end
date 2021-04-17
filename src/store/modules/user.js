import { ref } from '@vue/reactivity';
import axios from 'axios';
import router from '../../router';

const url = process.env.VUE_APP_BACK_END_URL;

const currentPage = ref(0);

export const namespaced = true;

export const state = {
  allPostsRetrieved: false,
  currentUsersPosts: [],
  userProfiles: [],
  error: null,
};

export const mutations = {
  setAllPostsRetrieved(state) {
    state.allPostsRetrieved = true;
  },
  setUserPosts(state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
      state.currentUsersPosts.push(payload.data[i]);
    }
  },
  setUserProfiles(state, payload) {
    if (payload && payload.users) {
      state.userProfiles = payload.users;
    } else {
      state.userProfiles.length = 0;
    }
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  async getLoggedInUsersPosts({ commit }, payload) {
    currentPage.value++;
    try {
      const { user } = payload;

      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/posts/get-posts?user=${user._id}&limit=12&page=${currentPage.value}`,
        // url: `${url}api/v1/posts/get-posts?limit=${limit}&page=${currentPage.value}`,
        withCredentials: true,
      });
      console.log(response.data.data.length);
      if (response.data.data.length) {
        // console.log('I ran');
        commit('setUserPosts', response.data);
      } else {
        console.log('Last Data Retrieved!');
        commit('setAllPostsRetrieved');
      }
      // router.push({ name: 'Profile' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },

  async getUserProfiles({ commit }, payload) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/users?searchKeyword=${payload}`,
        // It is a get request, you cannot have a body
        // data: payload,
        withCredentials: true,
      });

      commit('setUserProfiles', response.data);
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },

  async editUserProfileAction({ commit }, payload) {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${url}api/v1/users/update-me`,
        data: payload,
        withCredentials: true,
      });
      // console.log(response);

      await commit('auth/setUser', response.data, { root: true });
      router.push({ name: 'Profile' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getUserProfiles(state) {
    return state.userProfiles;
  },

  getLoggedInUsersPosts(state) {
    return state.currentUsersPosts;
  },
  getAllPostsRetrievedValue(state) {
    return state.allPostsRetrieved;
  },
};
