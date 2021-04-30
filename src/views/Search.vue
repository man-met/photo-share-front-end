<template>
  <input
    type="text"
    placeholder="Search for Accounts..."
    class="input-bar"
    v-model="searchKeyword"
  />

  <div class="users-profiles-container" v-if="queryResult">
    <div v-for="item in queryResult" :key="item._id">
      <router-link
        :to="{ name: 'ProfileExternalUser', params: { userId: item._id } }"
      >
        <div class="item-wrapper">
          <p class="item-heading">{{ item.first_name }} {{ item.last_name }}</p>
          <img :src="item.photo" class="profile-page-pic" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onUnmounted, watch } from '@vue/runtime-core';

export default {
  setup() {
    const searchKeyword = ref('');
    const store = useStore();

    const queryResult = computed(() => {
      return store.getters['user/getUserProfiles'];
    });

    const unwatch = watch(searchKeyword, () => {
      if (searchKeyword.value.length) {
        store.dispatch('user/getUserProfiles', searchKeyword.value);
      } else {
        store.commit('user/setUserProfiles');
      }
    });

    onUnmounted(() => {
      unwatch();
      store.commit('user/setUserProfiles');
      searchKeyword.value = '';
    });

    return {
      searchKeyword,
      queryResult,
    };
  },
};
</script>

<style>
.input-bar {
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 10px;
  width: 90%;
  border: 2px solid white;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
}

.users-profiles-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.item-wrapper {
  padding: 10px;
  border: 2px solid #dfdfdf;
}

.item-heading {
  font-weight: bold;
  padding: 10px;
}
</style>
