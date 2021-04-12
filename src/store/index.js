import { createStore } from 'vuex';
// INFO: * imports all public items into user namespace
import * as auth from './modules/auth';
import * as user from './modules/user';
import * as post from './modules/post';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  // use these modules
  modules: {
    auth,
    post,
    user,
  },
});
