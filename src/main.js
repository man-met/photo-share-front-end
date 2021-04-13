import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/styles.css';
import router from './router';
import store from './store';

// console.log('✅ App Initialized');
// console.log('URL: ');
// console.log(process.env);
// console.log(process.env.VUE_APP_BACK_END_URL);

if (
  process.env.NODE_ENV === 'production' &&
  !window.location.href.startsWith('https')
) {
  window.location.replace('https://manmetquickchat.herokuapp.com');
}

const app = createApp(App);
// console.log(store);

const authenticateUser = async () => {
  // INFO: wait to check if the user is authenticated
  // it only gets involved when the user refreshes or the user opens the page from search bar
  await store.dispatch('auth/isUserAuthenticated');

  // CRITICAL: You will dispatch the action here
  // store.dispatch('post/retrieveAllPosts');

  // console.log(store);
  // initiate the app
  app.use(store).use(router).mount('#app');
};

// INFO: invoke the function
authenticateUser();
// app.config.isCustomElement = (tag) => tag.startsWith('ion-');
// app.use(store).use(router).mount('#app');

// createApp(App).use(store).use(router).mount('#app');
