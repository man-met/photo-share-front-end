<template>
  <div v-if="externalUser">
    <div class="profile-header">
      <img
        class="profile-page-pic"
        :src="externalUser.user.photo"
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
      <p>
        <b
          >{{ externalUser.user.first_name }}
          {{ externalUser.user.last_name }}</b
        >
      </p>
      <p>{{ externalUser.user.bio }}</p>
    </div>
    <div class="profile-buttons-container">
      <div class="profile-buttons">
        <button class="primary" @click="startFollowing">Follow</button>
      </div>
    </div>
    <div class="post-images-container" v-if="externalUserPosts">
      <div class="post-image" v-for="post in externalUserPosts" :key="post._id">
        <img class="" :src="post.postImage" alt="an image" tabindex="0" />
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from '@vue/runtime-core';

export default {
  props: { userId: { type: String, required: true } },
  setup(props) {
    const store = useStore();
    const isLoading = ref(false);

    store.dispatch('externalUser/getExternalUserProfile', props.userId);
    store.dispatch('externalUser/getExternalUserPosts', props.userId);

    const externalUser = computed(() => {
      return store.getters['externalUser/getExternalUserDetails'];
    });

    const externalUserPosts = computed(() => {
      return store.getters['externalUser/getExternalUserPosts'];
    });

    const areAllPostsRetrieved = computed(() => {
      return store.getters['externalUser/getAreAllPostsRetrievedValue'];
    });

    const unwatch = watch(externalUserPosts.value, () => {
      isLoading.value = false;
    });

    const handleScroll = () => {
      if (areAllPostsRetrieved.value) {
        isLoading.value = false;
        window.removeEventListener('scroll', handleScroll);
      } else if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 3 &&
        !isLoading.value
      ) {
        isLoading.value = true;
        store.dispatch('externalUser/getExternalUserPosts', props.userId);
      }
    };

    const startFollowing = () => {
      store.dispatch('user/startFollowingAction', props.userId);
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      unwatch();
      store.commit('externalUser/deleteExternalUserData');
      // it is important to remove the event listener to avoid memory leaks
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      externalUser,
      externalUserPosts,
      startFollowing,
    };
  },
};
</script>

<style></style>
