<script setup lang="ts">
import Layout from './components/layout/layout.vue';
import GlobalCss from '../scss/global.vue';
</script>

<template>
  <Layout>
    <RouterView />
    <GlobalCss />
  </Layout>
</template>

<style></style>
