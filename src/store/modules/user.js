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
  followers: [],
  followings: [],
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
  setFollowers(state, payload) {
    if (payload.length > 0) {
      state.followers = payload;
    } else {
      state.followers.length = 0;
    }
  },
  setFollowings(state, payload) {
    if (payload) {
      state.followings = payload;
    } else {
      state.followings.length = 0;
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
      commit('setProcessingRequest', null, { root: true });
      const { user } = payload;

      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/posts/get-posts?user=${user._id}&limit=12&page=${currentPage.value}`,
        withCredentials: true,
      });
      if (response.data.data.length) {
        commit('setUserPosts', response.data);
      } else {
        commit('setAllPostsRetrieved');
      }
      await commit('setProcessingRequest', null, { root: true });
    } catch (err) {
      await commit('setProcessingRequest', null, { root: true });
      return commit('setError', err.message);
    }
  },

  async getUserProfiles({ commit }, payload) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/users?searchKeyword=${payload}`,
        withCredentials: true,
      });

      commit('setUserProfiles', response.data);
    } catch (err) {
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

      await commit('auth/setUser', response.data, { root: true });
      router.push({ name: 'Profile' });
    } catch (err) {
      return commit('setError', err.message);
    }
  },

  async getFollowersData({ commit }) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/followers/`,
        withCredentials: true,
      });

      commit('setFollowers', response.data.data.followers);
      commit('setFollowings', response.data.data.followings);
    } catch (err) {
      return commit('setError', err.message);
    }
  },

  async startFollowingAction({ commit, dispatch }, payload) {
    try {
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/followers/`,
        data: {
          userToFollow: payload,
        },
        withCredentials: true,
      });

      if (response && response.status === 201) {
        dispatch('getFollowersData');
      }
    } catch (err) {
      return commit('setError', err.message);
    }
  },

  async stopFollowingAction({ commit, dispatch }, payload) {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${url}api/v1/followers/`,
        data: {
          documentId: payload,
        },
        withCredentials: true,
      });

      if (response && response.status === 204) {
        dispatch('getFollowersData');
      }
    } catch (err) {
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
  getFollowers(state) {
    return state.followers;
  },
  getFollowings(state) {
    return state.followings;
  },
};
