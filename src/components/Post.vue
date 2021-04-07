<template>
  <div class="post-card" v-for="post in posts" :key="post.id">
    <div class="post-header">
      <img class="profile-pic" :src="post.profilePic" alt="" tabindex="0" />
      <p class="username">{{ post.username }}</p>
    </div>
    <div class="post-content">
      <img class="" :src="post.postImage" alt="placeholder" tabindex="0" />
    </div>
    <div class="post-footer">
      <section class="action-icons-container">
        <span @click="heartClickTest" class="action-icon"
          ><ion-icon name="heart-outline" tabindex="0"></ion-icon
        ></span>
        <span @click="commentClickTest" class="action-icon"
          ><ion-icon name="chatbubble-outline" tabindex="0"></ion-icon
        ></span>
        <span @click="sendClickTest" class="action-icon"
          ><ion-icon name="send-outline" tabindex="0"></ion-icon
        ></span>
      </section>
      <section class="mb-sm">
        <router-link :to="{ name: 'Home' }" class="b"
          ><span>{{ post.likes.length }}</span> likes
        </router-link>
      </section>
      <div class="caption-container m-sm">
        <router-link :to="{ name: 'Home' }"
          ><span class="b">{{ post.username }}</span></router-link
        >
        <span class="ml">{{ post.caption }}</span>
        <!-- <br />
        <br /> -->
        <!-- <router-link
          :to="{ name: 'Home' }"
          class="mr ib"
          v-for="(tag, index) in post.tags"
          :key="index"
          >#{{ tag }}</router-link
        > -->

        <section class="m-small">
          <router-link :to="{ name: 'Home' }" class="b ib m-small">
            <p>
              View All <span>{{ post.comments.length }}</span> Comments
            </p>
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
</template>

<script>
import { timeSince } from '../composables/utils';

export default {
  props: ['posts'],
  setup() {
    const heartClickTest = () => {
      alert('Heart present');
    };

    const commentClickTest = () => {
      alert('Comment present');
    };

    const sendClickTest = () => {
      alert('Send present');
    };

    return {
      heartClickTest,
      commentClickTest,
      sendClickTest,
      timeSince,
    };
  },
};
</script>

<style></style>
