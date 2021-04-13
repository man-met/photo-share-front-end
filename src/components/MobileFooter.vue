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
            router.currentRoute.value.name === 'Gallery'
              ? 'images'
              : 'images-outline'
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

<style>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: black;
  border-top: 1px solid rgb(36, 36, 36);
}

footer > div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
}

#logo {
  font-family: 'Lobster', cursive;
  padding: 10px 0px 10px 15px;
  text-align: left;
}

ion-icon {
  font-size: 28px;
  margin: 0;
  padding: 0;
}
</style>
