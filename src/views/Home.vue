<template>
  <div class="container">
    <!-- <h1>{{ getUser.user.email }}</h1> -->
    <Post :posts="posts" v-if="posts.length" />
    <div v-else>Loading...</div>
    <h1 v-if="allPostsRetrieved">No more posts!</h1>
    <p v-if="isLoading">Loading...</p>
  </div>
</template>

<script>
// import { getPosts } from '../composables/axiosCalls';
import Post from '../components/Post';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted, watch } from '@vue/runtime-core';
import { orderBy } from 'natural-orderby';

export default {
  components: { Post },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    if (store.getters['post/getPublicPosts'].length === 0) {
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'development') {
        console.log('First request made at Home: ✅');
      }
      store.dispatch('post/retrieveAllPosts', getUser.value);
    }

    const posts = computed(() => {
      return orderBy(store.getters['post/getPublicPosts'], (a) => a.createdAt, [
        'desc',
      ]);
    });

    const unwatch = watch(posts, () => {
      isLoading.value = false;
    });

    const allPostsRetrieved = computed(() => {
      return store.getters['post/getAllPostsRetrievedValue'];
    });

    const handleScroll = () => {
      if (allPostsRetrieved.value) {
        // console.log('Beta');
        isLoading.value = false;
        window.removeEventListener('scroll', handleScroll);
      } else if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 &&
        !isLoading.value
      ) {
        isLoading.value = true;
        store.dispatch('post/retrieveAllPosts', getUser.value);
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      // it is important to remove the event listener to avoid memory leaks
      unwatch();
      window.removeEventListener('scroll', handleScroll);
    });

    // console.log(posts.value);
    return {
      posts,
      getUser,
      allPostsRetrieved,
      isLoading,
    };
  },
};
</script>

<style></style>
