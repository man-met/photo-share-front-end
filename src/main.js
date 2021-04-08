import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/styles.css';
import router from './router';
import store from './store';

console.log('✅ App Initialized');
console.log('URL: ');
// console.log(process.env);
// console.log(process.env.VUE_APP_BACK_END_URL);

const app = createApp(App);
// console.log(store);

const authenticateUser = async () => {
  // INFO: wait to check if the user is authenticated
  // it only gets involved when the user refreshes or the user opens the page from search bar
  await store.dispatch('user/isUserAuthenticated');

  // console.log(store);
  // initiate the app
  app.use(store).use(router).mount('#app');
};

// INFO: invoke the function
authenticateUser();
// app.config.isCustomElement = (tag) => tag.startsWith('ion-');
// app.use(store).use(router).mount('#app');

// createApp(App).use(store).use(router).mount('#app');
