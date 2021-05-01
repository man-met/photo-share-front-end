<template>
  <div class="comments-container">
    <div class="comments-head-wrapper">
      <div class="comments-banner">
        <span @click="goBack"
          ><ion-icon name="arrow-back-outline"></ion-icon
        ></span>
        <h2 class="nmb">Comments</h2>
      </div>
      <div class="comments-header">
        <img
          class="profile-page-pic-small"
          :src="post.user.photo"
          alt=""
          tabindex="0"
        />
        <p>{{ post.caption }}</p>
      </div>
    </div>
    <div id="comments-body" v-if="allComments">
      <div
        v-for="comment in allComments"
        :key="comment._id"
        class="mb each-comment"
      >
        <span class="mr">
          <img
            class="profile-page-pic-small"
            :src="comment.user.photo"
            alt=""
            tabindex="0"
          />
        </span>
        <span class="b mr"
          >{{ comment.user.first_name }} {{ comment.user.last_name }}</span
        >
        <span>{{ comment.comment }}</span>
        <span>
          <p>
            {{ timeSince(comment.createdAt) }}
          </p>
        </span>
      </div>
    </div>
    <p v-else class="error">Oops... Something went wrong! Try again later.</p>
    <div class="comments-box-container" id="absolute-zero">
      <input
        type="text"
        class="input-bar"
        id="comments-box"
        placeholder="Write a Comment..."
        @keyup.enter="submitComment"
        v-model="comment"
      />
      <div @click="submitComment" class="send-button">
        <ion-icon name="send-outline"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import { timeSince } from '../composables/utils';

export default {
  props: { jsonPost: { type: String, required: true } },
  setup(props) {
    const router = useRouter();
    const post = ref(JSON.parse(props.jsonPost));
    const store = useStore();
    const comment = ref('');

    const allComments = computed(() => {
      return store.getters['comment/getComments'];
    });

    store.dispatch('comment/getCommentsAction', post.value._id);

    const goBack = () => {
      router.back();
    };

    const submitComment = () => {
      if (comment.value.length) {
        const commentData = {
          postId: post.value._id,
          comment: comment.value,
        };

        store.dispatch('comment/submitComment', commentData);

        comment.value = '';
      }
    };

    return {
      post,
      goBack,
      comment,
      allComments,
      submitComment,
      timeSince,
    };
  },
};
</script>

<style>
.comments-head-wrapper {
  position: fixed;
  top: 60px;
  background: black;
  width: 600px;
  border-bottom: 1px solid rgb(36, 36, 36);
  padding: 10px 0;
  z-index: 4;
}

.comments-banner {
  display: flex;
  align-items: center;
  /* padding: 10px 0; */
}

.nmb {
  margin-top: -5px;
}

.profile-page-pic-small {
  width: 30px;
  height: 30px;
  clip-path: circle(15px at center);
  /* z-index: -1; */
}

.comments-header {
  display: flex;
  align-items: center;
  /* margin: 15px 0; */
  /* border: 1px solid white; */
}

.comments-header > *,
.comments-banner > * {
  margin-left: 15px;
}

#comments-body {
  margin-top: 100px;
  margin-bottom: 70px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: left;
}

.each-comment {
  padding: 5px;
}

.comments-box-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: black;
  position: absolute;
  bottom: 48px;
  left: 0;
  top: auto;
  width: 100%;
}

#comments-box {
  width: 80%;
}

.send-button {
  margin-top: 5px;
  margin-right: 5px;
}
</style>
