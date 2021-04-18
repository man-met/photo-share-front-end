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
    <div id="comments-body"></div>
    <div class="comments-box-container">
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

export default {
  props: { jsonPost: { type: String, required: true } },
  setup(props) {
    const router = useRouter();
    const post = ref(JSON.parse(props.jsonPost));
    const store = useStore();
    const comment = ref('');

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
      submitComment,
    };
  },
};
</script>

<style>
.comments-head-wrapper {
  position: fixed;
  top: 60px;
  background: black;
  width: 100%;
  border-bottom: 1px solid rgb(36, 36, 36);
}

.comments-banner {
  display: flex;
  align-items: center;
  padding: 10px 0;
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
  margin: 15px 0;
  /* border: 1px solid white; */
}

.comments-header > *,
.comments-banner > * {
  margin-left: 15px;
}

#comments-body {
  margin-top: 120px;
  margin-bottom: 70px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: left;
}

.comments-box-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: black;
  position: fixed;
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
