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

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();

    const loginAction = async () => {
      // console.log('I am triggered');
      const user = {
        email: email.value,
        password: password.value,
      };
      // console.log(store);
      await store.dispatch('user/loginAction', user);
    };

    return {
      email,
      password,
      loginAction,
    };
  },
};
</script>

<style></style>
