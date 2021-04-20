import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/styles.css';
import router from './router';
import store from './store';

if (
  process.env.NODE_ENV === 'production' &&
  !window.location.href.startsWith('https')
) {
  window.location.replace('https://manmetquickchat.herokuapp.com');
}

const app = createApp(App);

const authenticateUser = async () => {
  await store.dispatch('auth/isUserAuthenticated');
  app.use(store).use(router).mount('#app');
};

authenticateUser();
