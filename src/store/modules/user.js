import axios from 'axios';
import router from '../../router';

const url = process.env.VUE_APP_BACK_END_URL;

export const namespaced = true;

export const state = {
  userPosts: [],
  error: null,
};

export const mutations = {
  setuserPosts(state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
      state.userPosts.push(payload.data[i]);
    }
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
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

export const getters = {};
