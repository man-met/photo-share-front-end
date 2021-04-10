<template>
  <!-- <button @click="accessGallery">Access Gallery</button> -->
  <!-- <input class="custom-file-input" type="file" /> -->
  <div v-if="postImage" class="post-content">
    <img id="post-image" :src="postImageURL" :alt="caption" />
    <button class="remove-image-btn" @click="removeImage">Remove Image</button>
    <textarea
      name=""
      id="post-img-desc"
      placeholder="Write a caption..."
      v-model="caption"
    ></textarea>
    <button class="primary" @click="uploadImage">Share</button>
  </div>
  <div v-if="!postImage" class="file-input">
    <input
      type="file"
      id="file"
      class="file"
      accept="image/*"
      @change="onInputFileChange($event)"
    />
    <label for="file">Select image</label>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  setup() {
    const postImage = ref(null);
    const postImageURL = ref('');
    const caption = ref('');
    const store = useStore();

    const onInputFileChange = (event) => {
      postImage.value = event.target.files[0];
      postImageURL.value = URL.createObjectURL(postImage.value);
    };

    const removeImage = () => {
      postImage.value = null;
      caption.value = '';
    };

    const uploadImage = async () => {
      const form = new FormData();
      form.append('postImage', postImage.value);
      form.append('caption', caption.value);
      // console.log(store);

      await store.dispatch('post/createPostAction', form);
      // console.log('upload image triggered');
    };

    return {
      postImage,
      postImageURL,
      caption,
      onInputFileChange,
      removeImage,
      uploadImage,
    };
  },
};
</script>

<style>
.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.file-input label {
  display: block;
  position: relative;
  width: 200px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 25px;
  background: black;
  border: 2px solid white;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

#post-image {
  max-height: 500px;
}

.remove-image-btn {
  width: 200px;
  padding: 10px;
  border-radius: 25px;
  background: black;
  border: 2px solid white;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

#post-img-desc {
  resize: none;
  width: 90%;
  height: 150px;
  border: 2px solid white;
  background: black;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  margin-top: 10px;
}
</style>
