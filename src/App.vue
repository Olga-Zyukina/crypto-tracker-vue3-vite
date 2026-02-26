<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useRootStore } from './stores/root';
import { API_CONFIG } from './constants/config';

const rootStore = useRootStore();
let interval: number;

const startInterval = async () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    rootStore.getNews();
    rootStore.getCryptoData();
  }, API_CONFIG.REFRESH_INTERVAL);
};

startInterval();

onMounted(() => { 
  rootStore.getNews();
  rootStore.getCryptoData();
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
