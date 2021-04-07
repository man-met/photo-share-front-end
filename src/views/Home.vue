<template>
  <div class="container">
    <!-- <h1>{{ getUser.user.email }}</h1> -->
    <Post :posts="posts" />
  </div>
</template>

<script>
import { getPosts } from '../composables/axiosCalls';
import Post from '../components/Post';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
  components: { Post },
  setup() {
    const posts = ref(null);
    const store = useStore();

    const getUser = computed(() => {
      return store.getters['user/getUser'];
    });

    const retrievePosts = async () => {
      posts.value = await getPosts();
    };
    // console.log(store);
    retrievePosts();
    return {
      posts,
      getUser,
    };
  },
};
</script>

<style></style>
