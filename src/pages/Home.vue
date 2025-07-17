<script setup lang="ts">
import { onMounted } from "vue";
import { commonService } from "../services";
import AppHeader from "../components/Header.vue";
import AppSidebar from "../components/Sidebar.vue";
import AppMain from "../components/Main.vue";
import AppFooter from "../components/Footer.vue";
import CryptoInfo from '../components/CryptoInfo.vue';

onMounted(commonService.commonFunction);
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <AppMain>
    <template #title>Dashboard</template>
    <template #home>
      <CryptoInfo />
    </template>
  </AppMain>
  <AppFooter />
  <!-- Back to top button -->
  <a
    href="#"
    class="back-to-top d-flex align-items-center justify-content-center"
  >
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<style scoped></style>