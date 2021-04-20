import { createStore } from 'vuex';
import * as auth from './modules/auth';
import * as user from './modules/user';
import * as externalUser from './modules/externalUser';
import * as post from './modules/post';
import * as comment from './modules/comment';
import * as utilsStore from './modules/utilsStore';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [
    createPersistedState({
      paths: ['auth', 'externalUser', 'utilsStore'],
    }),
  ],

  state: {},

  mutations: {},

  actions: {},

  getters: {},
  // use these modules
  modules: {
    auth,
    post,
    user,
    externalUser,
    comment,
    utilsStore,
  },
});
