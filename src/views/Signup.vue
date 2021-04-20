<template>
  <form id="signup-container" @submit.prevent="signupAction">
    <div class="form-group">
      <h1 id="h1-heading-text">Create your Account</h1>
      <input
        id="first-name"
        type="text"
        placeholder="First Name"
        v-model="firstName"
        required
      />
      <input
        id="last-name"
        type="text"
        placeholder="Last Name"
        v-model="lastName"
        required
      />
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
      <input
        class="password"
        type="password"
        placeholder="Confirm Password"
        v-model="passwordConfirm"
        required
      />

      <p class="error">{{ error }}</p>

      <div class="flex-space-between-items">
        <router-link :to="{ name: 'Login' }">Log in instead</router-link>
        <button class="primary" ref="signupButton">Signup</button>
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
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const signupButton = ref(null);
    const store = useStore();

    const error = computed(() => {
      return store.getters['auth/getError'];
    });

    const signupAction = async () => {
      if (password.value === passwordConfirm.value) {
        let newUser = {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        };
        await store.dispatch('auth/signupAction', { newUser });
      } else {
        store.commit('auth/setError', 'Passwords do not match');
      }
    };

    onBeforeMount(() => {
      store.commit('auth/setError', null);
    });

    return {
      signupAction,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      signupButton,
      error,
    };
  },
};
</script>

<style>
#signup-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0 5%;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: left;
  margin: 0 auto;
}

#h1-heading-text {
  display: block;
  font-size: 24px;
  text-align: left;
  align-self: flex-start;
}

.form-group > input {
  display: block;
  font-size: 16px;
  width: 100%;
  padding: 6px 8px;
  border-radius: 4px;
  outline: none;
  border: 3px solid rgba(223, 223, 223, 0);
  box-sizing: border-box;
}

.form-group > input:focus {
  border: 3px solid rgb(29, 114, 231);
}

#first-name {
  margin-top: 25px;
}

#last-name {
  margin-top: 25px;
}

#email {
  margin-top: 25px;
}

.password {
  margin-top: 25px;
}

.flex-space-between-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 25px;
}
</style>
