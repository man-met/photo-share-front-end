import { createStore } from 'vuex';
// INFO: * imports all public items into user namespace
import * as auth from './modules/auth';
import * as user from './modules/user';
import * as externalUser from './modules/externalUser';
import * as post from './modules/post';
import * as comment from './modules/comment';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [
    createPersistedState({
      paths: ['auth'],
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  // use these modules
  modules: {
    auth,
    post,
    user,
    externalUser,
    comment,
  },
});
