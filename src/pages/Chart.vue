<script setup lang="ts">
import { onMounted } from "vue";
import { commonService } from "../services";

import AppHeader from "../components/Header.vue";
import AppSidebar from "../components/Sidebar.vue";
import AppMain from "../components/Main.vue";
import AppFooter from "../components/Footer.vue";
import PriceChart from "../components/PriceChart.vue";
import RightSide from "../components/RightSide.vue";

const $props=defineProps(["id"]);

onMounted(commonService.commonFunction);
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <AppMain>
    <template #title>{{ $props.id }}</template>
    <template #home>
      <section>
        <div class="row">
          <div class="col-lg-8">
            <PriceChart :id="$props.id" />
          </div>
          <!-- End Left side columns -->

          <div class="col-lg-4">
            <RightSide />
          </div>
          <!-- End Right side columns -->
        </div>
      </section>
    </template>
  </AppMain>
  <AppFooter />
  <!-- Back to top button -->
  <a href="/" class="back-to-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<style scoped></style>