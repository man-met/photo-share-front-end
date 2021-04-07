import { ref } from 'vue';
import axios from 'axios';
import router from '../../router';

const url = process.env.BACK_END_URL;

const error = ref(null);

export const namespaced = true;

export const state = {
  user: null,
  // INFO: token is stored in the cookie instead
  // token: null,
  error: null,
};

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  async signupAction({ commit }, payload) {
    error.value = null;

    try {
      const response = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/users/signup',
        data: payload.newUser,
        withCredentials: true,
      });
      // console.log(response);
      // INFO: token is sent into the cookie instead
      // commit('setToken', response.data.token);
      commit('setUser', response.data.data);
      router.push({ name: 'Home' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
    // TODO: Instead of routing to the Home page from vuex, route it from here.
  },

  async loginAction({ commit }, payload) {
    // console.log(commit);
    // console.log(payload);

    try {
      const response = await axios({
        method: 'POST',
        url: `${url}/api/v1/users/login`,
        data: payload,
        withCredentials: true,
      });
      commit('setUser', response.data.data);
      router.push({ name: 'Home' });
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },

  async logoutAction({ commit }) {
    try {
      await axios({
        method: 'GET',
        url: `${url}/api/v1/users/logout`,
        withCredentials: true,
      });
      // console.log(response);
      commit('setUser', null);
      router.push({ name: 'Login' });
    } catch (err) {
      console.log(err);
      return commit('setError', err.message);
    }
  },

  async isUserAuthenticated({ commit }) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}/api/v1/users/isUserAuth`,
        withCredentials: true,
      });
      if (response.data.data) {
        commit('setUser', response.data.data);
      }
    } catch (err) {
      console.log(err.message);
      return commit('setError', err.message);
    }
  },
};

export const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.token;
  },
  getError(state) {
    return state.error;
  },
};

// const getUserDetails = async (email, password) => {
//   console.log(email);
//   console.log(password);
// };
