<template>
  <button @click="logoutAction" class="primary">Logout</button>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const logoutAction = async () => {
      await store.dispatch('user/logoutAction');
    };

    return {
      logoutAction,
    };
  },
};
</script>

<style></style>
