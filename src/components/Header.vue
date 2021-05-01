<template>
  <header>
    <div class="header-container">
      <h1 id="logo">Quick Chat</h1>
      <div class="main-footer" v-if="getUser">
        <router-link :to="{ name: 'Home' }"
          ><ion-icon
            :name="
              router.currentRoute.value.name === 'Home'
                ? 'home'
                : 'home-outline'
            "
          ></ion-icon
        ></router-link>
        <router-link :to="{ name: 'Search' }"
          ><ion-icon
            :name="
              router.currentRoute.value.name === 'Search'
                ? 'search-circle'
                : 'search-circle-outline'
            "
          ></ion-icon
        ></router-link>
        <router-link :to="{ name: 'Gallery' }"
          ><ion-icon
            :name="
              router.currentRoute.value.name === 'Gallery'
                ? 'add-circle'
                : 'add-circle-outline'
            "
          ></ion-icon
        ></router-link>
        <router-link :to="{ name: 'Profile' }"
          ><ion-icon
            :name="
              router.currentRoute.value.name === 'Profile'
                ? 'person-circle'
                : 'person-circle-outline'
            "
          ></ion-icon
        ></router-link>
        <router-link :to="{ name: 'Settings' }"
          ><ion-icon
            :name="
              router.currentRoute.value.name === 'Settings'
                ? 'settings'
                : 'settings-outline'
            "
          ></ion-icon
        ></router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

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
header {
  border-bottom: 1px solid rgb(36, 36, 36);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: black;
  z-index: 5;
}
</style>
