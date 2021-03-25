import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/styles.css';
import router from './router';
import store from './store';

const app = createApp(App);
// app.config.isCustomElement = (tag) => tag.startsWith('ion-');

app.use(store).use(router).mount('#app');

// createApp(App).use(store).use(router).mount('#app');
