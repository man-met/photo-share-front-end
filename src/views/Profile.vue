<template>
  <div class="profile-header">
    <img
      class="profile-page-pic"
      src="@/assets/profile-pic.png"
      alt=""
      tabindex="0"
    />
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
    <p><b>Muhammad Qasim Awan</b></p>
    <p>My interests...</p>
  </div>
  <div class="profile-buttons-container">
    <div class="profile-buttons">
      <button>Edit Profile</button>
      <button>Saved</button>
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
import { computed, ref } from '@vue/runtime-core';
// import { computed } from '@vue/runtime-core';

export default {
  setup() {
    const store = useStore();
    const userPosts = ref([]);
    const user = store.getters['user/getUser'];
    console.log(user.user._id);
    const posts = computed(() => {
      return store.getters['post/getPost'].filter((post) => {
        return user.user._id === post.user;
      });
    });

    console.log(store.getters['user/getUser']);
    console.log(posts.value);

    return {
      posts,
      userPosts,
    };
  },
};
</script>

<style></style>
