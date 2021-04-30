import axios from 'axios';
import router from '../../router';

const url = process.env.VUE_APP_BACK_END_URL;

export const namespaced = true;

export const state = {
  user: null,
  token: null,
  error: null,
};

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
    axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  async signupAction({ commit }, payload) {
    try {
      commit('setProcessingRequest', null, { root: true });
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/users/signup`,
        data: payload.newUser,
        withCredentials: true,
      });

      commit('setToken', response.data.token);
      commit('setUser', response.data.data);
      await commit('setProcessingRequest', null, { root: true });
      router.push({ name: 'Home' });
    } catch (err) {
      let { message } = err;
      if (message.includes('409')) {
        message = 'An account already exists with that email.';
      }
      await commit('setProcessingRequest', null, { root: true });
      return commit('setError', message);
    }
  },

  async loginAction({ commit }, payload) {
    try {
      commit('setProcessingRequest', null, { root: true });
      const response = await axios({
        method: 'POST',
        url: `${url}api/v1/users/login`,
        data: payload,
        withCredentials: true,
      });
      commit('setToken', response.data.token);
      commit('setUser', response.data.data);
      await commit('setProcessingRequest', null, { root: true });
      router.push({ name: 'Home' });
    } catch (err) {
      await commit('setProcessingRequest', null, { root: true });
      return commit('setError', 'Username or Password is incorrect!');
    }
  },

  async logoutAction({ commit }) {
    try {
      commit('setProcessingRequest', null, { root: true });
      await axios({
        method: 'GET',
        url: `${url}api/v1/users/logout`,
        withCredentials: true,
      });
      commit('setUser', null);
      commit('setToken', null);
      await commit('setProcessingRequest', null, { root: true });
      router.push({ name: 'Login' });
    } catch (err) {
      await commit('setProcessingRequest', null, { root: true });
      return commit('setError', err.message);
    }
  },

  async isUserAuthenticated({ commit }) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}api/v1/users/isUserAuth`,
        withCredentials: true,
      });
      if (response.data.data) {
        commit('setUser', response.data.data);
      }
    } catch (err) {
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.token;
  },
  isUserAuth(state) {
    return !!state.token;
  },
  getError(state) {
    return state.error;
  },
};
