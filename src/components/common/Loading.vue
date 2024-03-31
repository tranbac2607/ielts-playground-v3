<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ isLoading: boolean }>();
</script>

<template>
  <div v-if="isLoading" class="loading-container" style="--n: 5">
    <div class="dot" style="--i: 0"></div>
    <div class="dot" style="--i: 1"></div>
    <div class="dot" style="--i: 2"></div>
  </div>
  <div v-else class="hide"></div>
</template>

<style scoped lang="scss">
.hide {
  display: none !important;
}

$d: 2em;
$t: 1.5s;

.loading-container {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(240, 230, 230, 0.5);
}

.dot {
  background: rgb(233, 227, 226);

  &,
  &:after {
    display: inline-block;
    width: $d;
    height: $d;
    border-radius: 50%;
    animation: animation $t calc(((var(--i) + var(--o, 0)) / var(--n) - 1) *#{$t}) infinite;
  }

  &:after {
    --o: 1;
    background: #f0e9e9;
    content: '';
  }
}

@keyframes animation {
  0%,
  50% {
    transform: scale(0);
  }
}
</style>
