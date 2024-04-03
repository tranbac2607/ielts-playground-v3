<script setup lang="ts">
import { useCommonStore } from '@/stores/common';
const commonStore = useCommonStore();

import Header from './Header.vue';
import Loading from '../common/Loading.vue';
</script>

<template>
  <Loading :isLoading="commonStore.isLoading" />
  <Header />
  <div class="main-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.main-container,
.main-container-init {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - $header-outer-height);
  overflow: auto;
  position: relative;
}

.main-container {
  background-color: #e1edf4;
}

.main-container-init {
  background-color: #021027;
}
</style>
