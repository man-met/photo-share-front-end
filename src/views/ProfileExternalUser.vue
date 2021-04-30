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
        <p>2</p>
        <p>Followers</p>
      </div>
      <div class="profile-stats">
        <p>5</p>
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
      <div v-for="post in externalUserPosts" :key="post._id">
        <router-link
          :to="{ name: 'SinglePost', params: { postId: post._id } }"
          class="post-image"
        >
          <img class="" :src="post.postImage" alt="an image" tabindex="0" />
        </router-link>
      </div>
    </div>
  </div>
  <Spinner v-if="loading" />
</template>

<script>
import { useStore } from 'vuex';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from '@vue/runtime-core';
import Spinner from '../components/Spinner';

export default {
  props: { userId: { type: String, required: true } },
  components: { Spinner },
  setup(props) {
    const store = useStore();
    const isLoading = ref(false);

    const loading = ref(false);

    const processingRequest = computed(() => {
      return store.getters['getProcessingRequestValue'];
    });

    watch(processingRequest, () => {
      loading.value = !loading.value;
    });

    store.commit('externalUser/deleteExternalUserData');
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

    onBeforeUnmount(() => {
      store.commit('utilsStore/setTrackRoute', 'ProfileExternalUser');
    });

    onUnmounted(() => {
      unwatch();
      // it is important to remove the event listener to avoid memory leaks
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      externalUser,
      externalUserPosts,
      startFollowing,
      loading,
    };
  },
};
</script>

<style></style>
