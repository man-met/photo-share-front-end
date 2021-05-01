<template>
  <div class="profile-header">
    <img
      class="profile-page-pic"
      :src="getUser.user.photo"
      alt=""
      tabindex="0"
    />
    <div class="profile-stats">
      <p>{{ followers.length }}</p>
      <p>Followers</p>
    </div>
    <div class="profile-stats">
      <p>{{ followings.length }}</p>
      <p>Following</p>
    </div>
  </div>
  <div class="profile-bio">
    <p>
      <b>{{ getUser.user.first_name }} {{ getUser.user.last_name }}</b>
    </p>
    <p>{{ getUser.user.bio }}</p>
  </div>
  <div class="profile-buttons-container">
    <div class="profile-buttons">
      <router-link :to="{ name: 'ProfileEdit' }"
        ><button class="primary full-w-h">Edit Profile</button></router-link
      >
    </div>
  </div>
  <div class="post-images-container" v-if="posts">
    <div v-for="post in posts" :key="post._id">
      <router-link
        :to="{ name: 'SinglePost', params: { postId: post._id } }"
        class="post-image"
      >
        <img class="" :src="post.postImage" alt="an image" tabindex="0" />
      </router-link>
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
  components: { Spinner },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const loading = ref(false);

    const processingRequest = computed(() => {
      return store.getters['getProcessingRequestValue'];
    });

    watch(processingRequest, () => {
      loading.value = !loading.value;
    });

    store.dispatch('user/getFollowersData');

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    if (store.getters['user/getLoggedInUsersPosts'].length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('First request made at PROFILE: ✅');
      }
      store.dispatch('user/getLoggedInUsersPosts', getUser.value);
    }

    const posts = computed(() => {
      return store.getters['user/getLoggedInUsersPosts'];
    });

    const allPostsRetrieved = computed(() => {
      return store.getters['user/getAllPostsRetrievedValue'];
    });

    const followers = computed(() => {
      return store.getters['user/getFollowers'];
    });

    const followings = computed(() => {
      return store.getters['user/getFollowings'];
    });

    const unwatch = watch(posts.value, () => {
      isLoading.value = false;
    });

    const handleScroll = () => {
      if (allPostsRetrieved.value) {
        isLoading.value = false;
        window.removeEventListener('scroll', handleScroll);
      } else if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 3 &&
        !isLoading.value
      ) {
        isLoading.value = true;
        store.dispatch('user/getLoggedInUsersPosts', getUser.value);
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      store.commit('utilsStore/setTrackRoute', 'Profile');
    });

    onUnmounted(() => {
      unwatch();
      // it is important to remove the event listener to avoid memory leaks
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      getUser,
      posts,
      followers,
      followings,
      loading,
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
  grid-template-columns: 1fr;
}

.profile-buttons > a {
  background-color: white;
  margin: 0 5px;
}

.post-images-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  margin-bottom: 10px;
}

.post-image {
  display: flex;
}

.post-image > img {
  width: 100%;
  height: calc(100vw / 3.5);
  object-fit: cover;
}

.full-w-h {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
