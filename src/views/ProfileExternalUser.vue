<template>
  <div v-if="externalUser">
    <div class="profile-header flex-center">
      <img
        class="profile-page-pic"
        :src="externalUser.user.photo"
        alt=""
        tabindex="0"
      />
      <h1>
        <b
          >{{ externalUser.user.first_name }}
          {{ externalUser.user.last_name }}</b
        >
      </h1>
    </div>
    <div class="profile-bio">
      <p>{{ externalUser.user.bio }}</p>
    </div>
    <div class="profile-buttons-container">
      <div v-if="isFollowed" class="profile-buttons">
        <button class="primary" @click="stopFollowing(isFollowed._id)">
          Following
        </button>
      </div>
      <div v-else class="profile-buttons">
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
    const isFollowed = ref(null);
    const loading = ref(false);

    const processingRequest = computed(() => {
      return store.getters['getProcessingRequestValue'];
    });

    watch(processingRequest, () => {
      loading.value = !loading.value;
    });

    const usersFollowed = computed(() => {
      return store.getters['user/getFollowings'];
    });

    watch(usersFollowed, () => {
      isFollowed.value = usersFollowed.value.find((item) => {
        if (item.is_following === props.userId) {
          return true;
        }
      });
    });

    if (usersFollowed) {
      store.dispatch('user/getFollowersData');
    }

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

    const stopFollowing = (documentId) => {
      store.dispatch('user/stopFollowingAction', documentId);
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
      stopFollowing,
      isFollowed,
      loading,
    };
  },
};
</script>

<style>
.flex-center {
  align-items: center;
  justify-content: space-evenly;
}
</style>
