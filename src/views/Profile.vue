<template>
  <div class="profile-header">
    <img class="profile-page-pic" :src="user.user.photo" alt="" tabindex="0" />
    <div class="profile-stats">
      <p>#</p>
      <p>Posts</p>
    </div>
    <div class="profile-stats">
      <p>#</p>
      <p>Followers</p>
    </div>
    <div class="profile-stats">
      <p>#</p>
      <p>Following</p>
    </div>
  </div>
  <div class="profile-bio">
    <p>
      <b>{{ user.user.first_name }} {{ user.user.last_name }}</b>
    </p>
    <p>{{ user.user.bio }}</p>
  </div>
  <div class="profile-buttons-container">
    <div class="profile-buttons">
      <router-link :to="{ name: 'ProfileEdit' }">Edit Profile</router-link>
      <router-link :to="{ name: 'Home' }">Saved</router-link>
    </div>
  </div>
  <div class="post-images-container" v-if="posts">
    <div class="post-image" v-for="post in posts" :key="post._id">
      <img class="" :src="post.postImage" alt="an image" tabindex="0" />
    </div>
  </div>
</template>

<script>
// import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
// import { computed } from '@vue/runtime-core';

export default {
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.getters['auth/getUser'];
    });

    // console.log(user.value);
    // console.log(user.value.user._id);

    const posts = computed(() => {
      return store.getters['post/getPost'].filter((post) => {
        return user.value.user._id === post.user;
      });
    });

    return {
      user,
      posts,
    };
  },
};
</script>

<style>
.profile-header {
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  padding: 15px 0;
}

.profile-page-pic {
  width: 84px;
  height: 84px;
  clip-path: circle(42px at center);
  /* z-index: -1; */
}

.profile-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.profile-bio {
  text-align: left;
  padding: 0 15px;
}

.profile-buttons-container {
  padding-bottom: 25px;
  border-bottom: 1px solid rgb(36, 36, 36);
}

.profile-buttons {
  margin: 10px 15px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.profile-buttons > a {
  background-color: white;
  margin: 0 5px;
  padding: 5px;
}

.post-images-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
}

.post-image {
  display: flex;
}

.post-image > img {
  width: 100%;
  height: calc(100vw / 3.5);
  object-fit: cover;
}
</style>
