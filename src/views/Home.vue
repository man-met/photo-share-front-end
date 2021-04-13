<template>
  <div class="container">
    <!-- <h1>{{ getUser.user.email }}</h1> -->
    <Post :posts="posts" v-if="posts" />
    <div v-else>No data to display!</div>
    <h1 v-if="allPostsRetrieved">No more posts!</h1>
  </div>
</template>

<script>
// import { getPosts } from '../composables/axiosCalls';
import Post from '../components/Post';
// import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted } from '@vue/runtime-core';
import { orderBy } from 'natural-orderby';

export default {
  components: { Post },
  setup() {
    const store = useStore();
    // const isInitialRequestLoading = ref(true);

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    const posts = computed(() => {
      return orderBy(store.getters['post/getPost'], (a) => a.createdAt, [
        'desc',
      ]);
    });

    const allPostsRetrieved = computed(() => {
      return store.getters['post/getAllPostsRetrievedValue'];
    });

    const handleScroll = () => {
      if (allPostsRetrieved.value) {
        // console.log('Beta');
        window.removeEventListener('scroll', handleScroll);
      } else if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        console.log(allPostsRetrieved.value);
        // console.log('Alpha');

        store.dispatch('post/retrieveAllPosts', getUser.value);
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      // it is important to remove the event listener to avoid memory leaks
      window.removeEventListener('scroll', handleScroll);
    });

    // console.log(posts.value);
    return {
      posts,
      getUser,
      allPostsRetrieved,
    };
  },
};
</script>

<style></style>
