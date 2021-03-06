<template>
  <div class="container">
    <!-- <h1>{{ getUser.user.email }}</h1> -->
    <Post :posts="posts" v-if="posts.length" />
    <Spinner v-if="loading" />
    <h1 v-if="allPostsRetrieved">No more posts!</h1>
  </div>
</template>

<script>
// import { getPosts } from '../composables/axiosCalls';
import Post from '../components/Post';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted, watch } from '@vue/runtime-core';
import { orderBy } from 'natural-orderby';
import { urlBase64ToUint8Array } from '../composables/utils';
import Spinner from '../components/Spinner';
// import qs from 'qs';

export default {
  components: { Post, Spinner },
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

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });

    if (store.getters['post/getPublicPosts'].length === 0) {
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

    // PUSH NOTIFICATIONS -> Get permission

    const isServiceWorkerSupported = computed(() => {
      if ('serviceWorker' in navigator) return true;
      return false;
    });

    const isPushNotificationsSupported = computed(() => {
      if ('PushManager' in window) return true;
      return false;
    });

    const enableNotifications = () => {
      if (isPushNotificationsSupported.value) {
        Notification.requestPermission((result) => {
          if (result == 'granted') {
            // displayGrantedNotification();
            checkForExistingPushNotification();
          }
        });
      }
    };

    const checkForExistingPushNotification = () => {
      if (
        isServiceWorkerSupported.value &&
        isPushNotificationsSupported.value
      ) {
        let reg;
        navigator.serviceWorker.ready
          .then((swreg) => {
            reg = swreg;
            return swreg.pushManager.getSubscription();
          })
          .then((sub) => {
            // check if subscription exists
            if (!sub) {
              createPushSubscription(reg);
            }
          });
      }
    };

    const createPushSubscription = (reg) => {
      const vapidPublicKey = process.env.VUE_APP_VAPID_PUBLIC_KEY;
      const vapidPublicKeyConverted = urlBase64ToUint8Array(vapidPublicKey);
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidPublicKeyConverted,
        })
        .then((newSub) => {
          store.dispatch('storePushSubscriptionAction', newSub);
        });
    };

    enableNotifications();

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      // it is important to remove the event listener to avoid memory leaks
      unwatch();
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      posts,
      getUser,
      allPostsRetrieved,
      loading,
      isLoading,
    };
  },
};
</script>

<style></style>
