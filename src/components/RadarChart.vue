<script setup lang="ts">
import { watch } from "vue";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'vue-chartjs';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(220, 53, 69)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }]
}
const options = {
  responsive: true,
  maintainAspectRatio: false
}

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
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(220, 53, 69)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
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
      <h5 class="card-title">Radar Chart <span>| All time</span></h5>
      <Radar :data="data" :options="options" />
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
