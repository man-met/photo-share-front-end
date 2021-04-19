<template>
  <Header />
  <main>
    <router-view />
  </main>
  <!-- Show only if the user is logged in -->
  <MobileFooter v-if="getUser" />
</template>

<script>
import Header from './components/Header';
import MobileFooter from './components/MobileFooter';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, watch } from '@vue/runtime-core';
import axios from 'axios';

export default {
  components: { Header, MobileFooter },
  setup() {
    const router = useRouter();
    const store = useStore();

    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${store.getters['auth/getToken']}`;

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    const getPublicPosts = computed(() => {
      return store.getters['post/getPublicPosts'];
    });

    const getLoggedInUsersPosts = computed(() => {
      return store.getters['user/getLoggedInUsersPosts'];
    });

    if (getUser.value) {
      if (getPublicPosts.value.length === 0) {
        store.dispatch('post/retrieveAllPosts', getUser.value);
        watch([getUser.value, getPublicPosts.value], () => {
          if (getUser.value && getPublicPosts.value.length === 0) {
            console.log('invoked');
            store.dispatch('post/retrieveAllPosts', getUser.value);
          }
        });
      }

      if (getLoggedInUsersPosts.value.length === 0) {
        store.dispatch('user/getLoggedInUsersPosts', getUser.value);
        watch([getUser.value, getLoggedInUsersPosts.value], () => {
          console.log('YOU HAVE WORK TO DO HERE');
          // console.clear();
        });
      }
    }

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
