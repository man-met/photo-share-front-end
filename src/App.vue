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
import { computed } from '@vue/runtime-core';

export default {
  components: { Header, MobileFooter },
  setup() {
    const router = useRouter();
    const store = useStore();

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    // console.log(getUser.value);

    store.watch((state) => {
      // console.log(' invoked');
      if (state.auth.user) {
        store.dispatch('post/retrieveAllPosts');
      }
    });
    // console.log(store);

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
