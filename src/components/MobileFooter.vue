<template>
  <footer>
    <div>
      <router-link :to="{ name: 'Home' }" class="mr ib">
        <ion-icon
          :name="
            router.currentRoute.value.name === 'Home' ? 'home' : 'home-outline'
          "
        ></ion-icon>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Search' }" class="mr ib">
        <ion-icon
          :name="
            router.currentRoute.value.name === 'Search'
              ? 'search-circle'
              : 'search-circle-outline'
          "
        ></ion-icon>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Gallery' }" class="mr ib">
        <ion-icon
          :name="
            router.currentRoute.value.name === 'Camera'
              ? 'camera'
              : 'camera-outline'
          "
        ></ion-icon>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Profile' }" class="mr ib">
        <ion-icon
          :name="
            router.currentRoute.value.name === 'Profile'
              ? 'person-circle'
              : 'person-circle-outline'
          "
        ></ion-icon>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Settings' }" class="mr ib">
        <ion-icon
          :name="
            router.currentRoute.value.name === 'Settings'
              ? 'settings'
              : 'settings-outline'
          "
        ></ion-icon>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style></style>
