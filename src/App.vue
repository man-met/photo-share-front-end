<template>
  <Header v-if="router.currentRoute.value.name !== 'Camera'" />
  <main>
    <router-view />
  </main>
  <MobileFooter v-if="router.currentRoute.value.name !== 'Camera'" />
</template>

<script>
import Header from './components/Header';
import MobileFooter from './components/MobileFooter';
import { useRouter } from 'vue-router';

export default {
  components: { Header, MobileFooter },
  setup() {
    const router = useRouter();
    return {
      router,
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
}
</style>
