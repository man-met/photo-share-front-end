<template>
  <div class="container">
    <!-- <h1>{{ getUser.user.email }}</h1> -->
    <Post :posts="posts" v-if="posts" />
    <div v-else>No data to display!</div>
  </div>
</template>

<script>
// import { getPosts } from '../composables/axiosCalls';
import Post from '../components/Post';
// import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import { orderBy } from 'natural-orderby';

export default {
  components: { Post },
  setup() {
    const store = useStore();

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    const posts = computed(() => {
      return orderBy(store.getters['post/getPost'], (a) => a.createdAt, [
        'desc',
      ]);
    });

    // console.log(posts.value);
    return {
      posts,
      getUser,
    };
  },
};
</script>

<style></style>
