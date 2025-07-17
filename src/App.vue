<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useRootStore } from './stores/root';

const rootStore = useRootStore();

onMounted(() => {
  rootStore.getNews();
  rootStore.getSymbolFullData();
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
