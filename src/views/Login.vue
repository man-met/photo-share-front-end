<template>
  <form id="signup-container" @submit.prevent="loginAction">
    <div class="form-group">
      <h1 id="h1-heading-text">Login</h1>
      <input
        id="email"
        type="email"
        placeholder="Email"
        v-model="email"
        required
      />
      <input
        class="password"
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />

      <p class="error">{{ error }}</p>

      <div class="flex-space-between-items">
        <router-link :to="{ name: 'Signup' }">Signup instead</router-link>
        <button class="primary" ref="signupButton">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onBeforeMount } from '@vue/runtime-core';

export default {
  setup() {
    const email = ref('me@gmail.com');
    const password = ref('test123');
    const store = useStore();

    const error = computed(() => {
      return store.getters['auth/getError'];
    });

    const loginAction = async () => {
      const user = {
        email: email.value,
        password: password.value,
      };
      // console.log(store);
      await store.dispatch('auth/loginAction', user);
    };

    onBeforeMount(() => {
      store.commit('auth/setError', null);
    });

    return {
      email,
      password,
      loginAction,
      error,
    };
  },
};
</script>

<style></style>
