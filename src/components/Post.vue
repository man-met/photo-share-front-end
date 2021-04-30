<template>
  <div>
    <div v-for="post in posts" :key="post._id">
      <div class="post-card" v-if="getUser.user._id != post.user._id">
        <div class="post-header">
          <router-link
            :to="{
              name: 'ProfileExternalUser',
              params: { userId: post.user._id },
            }"
          >
            <img
              class="profile-pic"
              :src="post.user.photo"
              alt=""
              tabindex="0"
            />
          </router-link>
          <router-link
            :to="{
              name: 'ProfileExternalUser',
              params: { userId: post.user._id },
            }"
          >
            <p class="username b">
              {{ post.user.first_name }} {{ post.user.last_name }}
            </p>
          </router-link>
        </div>
        <div class="post-content">
          <img class="" :src="post.postImage" alt="placeholder" tabindex="0" />
        </div>
        <div class="post-footer">
          <section class="action-icons-container">
            <router-link
              :to="{
                name: 'Comments',
                params: { jsonPost: JSON.stringify(post) },
              }"
              class="action-icon"
              ><ion-icon name="chatbubble-outline" tabindex="0"></ion-icon
            ></router-link>
            <a :href="post.postImage" download>
              <span class="action-icon"
                ><ion-icon name="download-outline" tabindex="0"></ion-icon
              ></span>
            </a>
          </section>
          <div class="caption-container m-sm">
            <router-link :to="{ name: 'Home' }"
              ><span class="b"
                >{{ post.user.first_name }} {{ post.user.last_name }}</span
              ></router-link
            >
            <span class="ml">{{ post.caption }}</span>
            <section class="m-small">
              <router-link
                :to="{
                  name: 'Comments',
                  params: { jsonPost: JSON.stringify(post) },
                }"
                class="m"
              >
                <p>View All Comments</p>

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
            </section>
            <p>
              <b>{{ timeSince(post.createdAt) }}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeSince } from '../composables/utils';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
  props: ['posts'],
  setup(props) {
    const store = useStore();

    console.log(props.posts);

    const getUser = computed(() => {
      return store.getters['auth/getUser'];
    });
    return {
      timeSince,
      getUser,
    };
  },
};
</script>

<style>
.align-items {
  display: flex;
  align-items: center;
}

.align-right {
  text-align: right;
}
</style>
