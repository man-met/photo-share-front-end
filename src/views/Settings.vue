<template>
  <button @click="logoutAction" class="primary full-width">Logout</button>
  <div class="spinner-wrapper" v-if="loading">
    <Spinner />
  </div>
</template>

<script>
import { computed, ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import Spinner from '../components/Spinner';

export default {
  components: { Spinner },
  setup() {
    const store = useStore();
    const loading = ref(false);

    const processingRequest = computed(() => {
      return store.getters['getProcessingRequestValue'];
    });

    watch(processingRequest, () => {
      loading.value = !loading.value;
    });

    const logoutAction = async () => {
      await store.dispatch('auth/logoutAction');
    };

    return {
      logoutAction,
      loading,
    };
  },
};
</script>

<style>
.full-width {
  width: 100%;
  text-align: left;
}
</style>
