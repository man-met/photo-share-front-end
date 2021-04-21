<template>
  <Header />
  <main>
    <router-view />
  </main>
  <MobileFooter v-if="getUser" />
</template>

<script>
import Header from './components/Header';
import MobileFooter from './components/MobileFooter';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import axios from 'axios';

export default {
  components: { Header, MobileFooter },
  setup() {
    const router = useRouter();
    const store = useStore();

    if (process.env.VUE_APP_NODE_ENV === 'development') {
      console.log('🔐 TOKEN: ', store.getters['auth/getToken']);
    }

    if (store.getters['auth/getToken']) {
      if (process.env.VUE_APP_NODE_ENV === 'development') {
        console.log('Token set to Axios: ✅');
      }
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${store.getters['auth/getToken']}`;
    }

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    return {
      router,
      getUser,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
</style>
