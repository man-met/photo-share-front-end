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
        minlength="8"
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
  <div class="spinner-wrapper" v-if="loading">
    <Spinner />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onBeforeMount, watch } from '@vue/runtime-core';
import Spinner from '../components/Spinner';

export default {
  components: { Spinner },
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();

    const loading = ref(false);

    const processingRequest = computed(() => {
      return store.getters['getProcessingRequestValue'];
    });

    watch(processingRequest, () => {
      loading.value = !loading.value;
    });

    const error = computed(() => {
      return store.getters['auth/getError'];
    });

    const loginAction = async () => {
      const user = {
        email: email.value,
        password: password.value,
      };
      await store.dispatch('auth/loginAction', user);
    };

    onBeforeMount(() => {
      store.commit('auth/setError', null);
    });

    return {
      email,
      password,
      loginAction,
      loading,
      error,
    };
  },
};
</script>

<style></style>
