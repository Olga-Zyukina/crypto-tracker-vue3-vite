<script setup lang="ts">
import { onMounted } from "vue";
import { commonService } from "../services";

import AppMain from "../components/Main.vue";
import PriceChart from "../components/PriceChart.vue";
import RightSide from "../components/RightSide.vue";

const $props=defineProps(["id"]);

onMounted(commonService.commonFunction);
</script>

<template>
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
</template>

<style scoped></style>