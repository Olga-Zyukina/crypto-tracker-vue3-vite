<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useRootStore } from './stores/root';

const rootStore = useRootStore();
let interval: any;

const startInterval = async () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    rootStore.getNews();
    rootStore.getSymbolFullData();
  }, 10000);
};

startInterval();

onMounted(() => {
  rootStore.getNews();
  rootStore.getSymbolFullData();
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
