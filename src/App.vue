<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useRootStore } from './stores/root';
import { API_CONFIG } from './constants/config';

import AppHeader from "./components/Header.vue";
import AppSidebar from "./components/Sidebar.vue";
import AppFooter from "./components/Footer.vue";

const rootStore = useRootStore();
let interval: number;

const startInterval = async () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    // rootStore.getNews();
    rootStore.getCryptoData();
  }, API_CONFIG.REFRESH_INTERVAL);
};

startInterval();

onMounted(() => { 
  // rootStore.getNews();
  rootStore.getCryptoData();
})
</script>

<template>

  <AppHeader />
  <AppSidebar />
  <main id="main" class="main">
    <RouterView />
  </main>

  <AppFooter />
  
  <!-- Back to top button -->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>

</template>

<style scoped></style>
