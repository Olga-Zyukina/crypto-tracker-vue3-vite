<script setup lang="ts">
import { watch } from "vue";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend
);
const $props = defineProps({
  data: { type: Object, default: () => { } }
});

let chartLabels: any = [];
let chartData: any = [];
let data = {
  labels: chartLabels,
  datasets: [{
    label: 'MarketCap, $1M',
    data: chartData,
    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#E46651', '#00D8FF', '#DD1B16'],
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: false
};

const updateRadarData = () => {
  chartLabels.length = 0
  chartData.length = 0
  $props.data.forEach((item: any) => {
    chartLabels.push(item.id);
    chartData.push(parseInt(item.cap));
  });
  data = {
    labels: chartLabels,
    datasets: [{
      label: 'MarketCap, $1M',
      data: chartData,
    backgroundColor: ['#01befe', '#ffdd00', '#ff7d00', '#ff006d', '#adff02', '#8f00ff', '#ffdd00'],

    }]
  };
};

updateRadarData();

watch(() => $props.data, () => {
  updateRadarData();
});
</script>

<template>
  <div class="card">
    <div class="card-body h-400 mb-6">
      <h5 class="card-title">Doughnut Chart <span>| All time</span></h5>
      <Doughnut :data="data" :options="options" />
    </div>
  </div>
</template>

<style scoped>
.h-400 {
  max-height: 400px;
}
.mb-6 {
  margin-bottom: 5rem !important;
}
</style>
