import { createStore } from 'vuex';
import * as auth from './modules/auth';
import * as user from './modules/user';
import * as externalUser from './modules/externalUser';
import * as post from './modules/post';
import * as comment from './modules/comment';
import * as utilsStore from './modules/utilsStore';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
// import { displayGrantedNotification } from '../composables/utils';

const url = process.env.VUE_APP_BACK_END_URL;

export default createStore({
  plugins: [
    createPersistedState({
      paths: ['auth', 'externalUser', 'utilsStore'],
    }),
  ],

  state: {
    processingRequest: false,
  },

  mutations: {
    setProcessingRequest(state) {
      if (state.processingRequest) {
        state.processingRequest = false;
      } else {
        state.processingRequest = true;
      }
    },
  },

  actions: {
    async storePushSubscriptionAction({ commit }, payload) {
      try {
        console.log(payload);
        const response = await axios({
          method: 'POST',
          url: `${url}api/v1/push-notification`,
          data: {
            subscriptionData: payload,
          },
          withCredentials: true,
        });
        console.log(response);

        // display subscribed notification once subscribed
      } catch (err) {
        return commit(
          'setError',
          'There was some error creating the subscription!'
        );
      }
    },
  },

  getters: {
    getProcessingRequestValue(state) {
      return state.processingRequest;
    },
  },
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
