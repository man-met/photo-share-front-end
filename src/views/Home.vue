<template>
  <div class="container">
    <Post :posts="posts" />
  </div>
</template>

<script>
import { getPosts } from '../composables/axiosCalls';
import Post from '../components/Post';
import { ref } from '@vue/reactivity';

export default {
  components: { Post },
  setup() {
    const posts = ref(null);

    const retrievePosts = async () => {
      posts.value = await getPosts();
    };

    retrievePosts();
    return {
      posts,
    };
  },
};
</script>

<style></style>
