<script setup lang="ts">
import { onMounted } from "vue";
import { commonService } from "../services";
import AppMain from "../components/Main.vue";
import CryptoInfo from '../components/CryptoInfo.vue';

onMounted(commonService.commonFunction);
</script>

<template>
  <AppMain>
    <template #title>Dashboard</template>
    <template #home>
      <CryptoInfo />
    </template>
  </AppMain>
</template>

<style scoped></style>