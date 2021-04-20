<template>
  <div class="comments-container" v-if="post">
    <div class="comments-head-wrapper">
      <div class="comments-banner">
        <span @click="goBack"
          ><ion-icon name="arrow-back-outline"></ion-icon
        ></span>
        <h2 class="nmb">Post</h2>
      </div>
    </div>
    <div class="post-container-wrapper">
      <div class="post-header">
        <img class="profile-pic" :src="post.user.photo" alt="" tabindex="0" />
        <p class="username">
          {{ post.user.first_name }} {{ post.user.last_name }}
        </p>
      </div>
      <div class="post-content">
        <img class="" :src="post.postImage" alt="placeholder" tabindex="0" />
      </div>
      <div class="post-footer">
        <section class="action-icons-container">
          <span @click="heartClickTest" class="action-icon"
            ><ion-icon name="download-outline"></ion-icon
          ></span>
          <router-link
            :to="{
              name: 'Comments',
              params: { jsonPost: JSON.stringify(post) },
            }"
            class="action-icon"
            ><ion-icon name="chatbubble-outline" tabindex="0"></ion-icon
          ></router-link>
          <span @click="sendClickTest" class="action-icon"
            ><ion-icon name="send-outline" tabindex="0"></ion-icon
          ></span>
        </section>
        <section class="mb-sm">
          <router-link :to="{ name: 'Home' }" class="b"
            ><span>{{ post.likesQuantity }}</span> likes
          </router-link>
        </section>
        <div class="caption-container m-sm">
          <router-link :to="{ name: 'Home' }"
            ><span class="b"
              >{{ post.user.first_name }} {{ post.user.last_name }}</span
            ></router-link
          >
          <span class="ml">{{ post.caption }}</span>
          <!-- commented
          <br />
          <br />
          <router-link
            :to="{ name: 'Home' }"
            class="mr ib"
            v-for="(tag, index) in post.tags"
            :key="index"
            >#{{ tag }}</router-link
          >
          commented -->
          <section class="m-small">
            <router-link
              :to="{
                name: 'Comments',
                params: { jsonPost: JSON.stringify(post) },
              }"
              class="m"
            >
              <p>View All <span>#</span> Comments</p>

              <!-- <p>{{ post.last_comment }}</p> -->
              <div v-if="post.last_comment" class="m">
                <div class="mb align-items">
                  <span class="mr">
                    <img
                      class="profile-page-pic-small"
                      :src="post.last_comment.user.photo"
                      alt=""
                      tabindex="0"
                    />
                  </span>
                  <span class="b mr"
                    >{{ post.last_comment.user.first_name }}
                    {{ post.last_comment.user.last_name }}</span
                  >
                  <span>{{ post.last_comment.comment }}</span>
                </div>
                <span>
                  <p>
                    {{ timeSince(post.last_comment.createdAt) }}
                  </p>
                </span>
              </div>
            </router-link>

            <!-- <div class="mb" v-for="comment in post.comments" :key="comment.id">
              <router-link :to="{ name: 'Home' }">
                <span class="b mr">{{ comment.username }}</span>
              </router-link>
              <span>
                {{ comment.comment }}
              </span>
            </div> -->
          </section>
          <p>
            <b>{{ timeSince(post.createdAt) }}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
  <p v-else>There was an error!</p>
</template>

<script>
import { computed, onUnmounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { timeSince } from '../composables/utils';

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    let getUserFrom = 'auth/getUser';
    let getPostsFrom = 'user/getLoggedInUsersPosts';
    let dispatchFrom = 'user/getLoggedInUsersPosts';

    console.log(store.getters['utilsStore/getTrackRoute']);

    if (store.getters['utilsStore/getTrackRoute'] === 'ProfileExternalUser') {
      getUserFrom = 'externalUser/getExternalUserDetails';
      getPostsFrom = 'externalUser/getExternalUserPosts';
      dispatchFrom = 'externalUser/getExternalUserPosts';
    }

    // console.log(getPostsFrom, dispatchFrom, getUserFrom);

    const getUser = computed(() => {
      return store.getters[getUserFrom];
    });

    if (store.getters[getPostsFrom].length === 0) {
      store.dispatch(dispatchFrom, getUser.value);
    }

    const post = computed(() => {
      return store.getters[getPostsFrom].find((currentPost) => {
        return currentPost._id === props.postId;
      });
    });

    onUnmounted(() => {});

    const goBack = () => {
      router.back();
    };

    return {
      post,
      goBack,
      timeSince,
    };
  },
};
</script>

<style>
.post-container-wrapper {
  margin-top: 60px;
}
</style>
