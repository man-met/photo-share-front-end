<template>
  <div class="edit-profile form-group">
    <img class="edit-profile-pic" :src="photo" alt="" tabindex="0" />
    <div class="file-input">
      <input
        type="file"
        id="file"
        class="file"
        accept="image/*"
        @change="onInputFileChange($event)"
      />
      <label for="file">Change Profile Picture</label>
    </div>
    <input
      id="edit-first-name"
      type="text"
      placeholder="First Name"
      v-model="firstName"
      required
    />
    <input
      id="edit-last-name"
      type="text"
      placeholder="Last Name"
      v-model="lastName"
      required
    />
    <textarea
      name=""
      id="edit-bio"
      placeholder="Tell your followers about your interests!"
      v-model="bio"
    ></textarea>
    <div>
      <button
        class="mt"
        :class="isActive ? 'disabled' : 'primary'"
        :disabled="isActive"
        @click="submitData"
      >
        Save
      </button>
      <button
        class="mt"
        :class="isActive ? 'disabled' : 'cancel'"
        :disabled="isActive"
        @click="router.push({ name: 'Profile' })"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = store.getters['auth/getUser'];
    const firstName = ref(user.user.first_name);
    const lastName = ref(user.user.last_name);
    const bio = ref(user.user.bio);
    const photo = ref(user.user.photo);
    const newProfilePhoto = ref(null);
    const isActive = ref(false);

    const onInputFileChange = (event) => {
      newProfilePhoto.value = event.target.files[0];
      photo.value = URL.createObjectURL(newProfilePhoto.value);
    };

    console.log(store);

    const submitData = async () => {
      isActive.value = true;
      const form = new FormData();
      form.append('first_name', firstName.value);
      form.append('last_name', lastName.value);
      form.append('bio', bio.value);

      if (newProfilePhoto.value) {
        form.append('postImage', newProfilePhoto.value);
      }

      await store.dispatch('user/editUserProfileAction', form);
    };

    return {
      user,
      firstName,
      lastName,
      bio,
      photo,
      onInputFileChange,
      router,
      submitData,
      isActive,
    };
  },
};
</script>

<style>
.edit-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.edit-profile-pic {
  width: 150px;
  height: 150px;
  clip-path: circle(75px at center);
  margin-bottom: 15px;
}

#edit-first-name,
#edit-last-name {
  width: 90%;
  margin-top: 15px;
}

#edit-bio {
  resize: none;
  width: 90%;
  height: 150px;
  border: 2px solid white;
  background: black;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  margin-top: 10px;
  margin-top: 15px;
}

.mt {
  margin-top: 15px;
}
</style>
