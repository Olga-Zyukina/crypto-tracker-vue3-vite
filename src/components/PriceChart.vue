<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import axios from "axios";
import { API_CONFIG } from '../constants/config';
import { URL_SINGLE_SYMBOL_HISTORY } from "../constants/api";
import { CRYPTO_INFO } from "../constants/utils";

import type { ChartPriceData } from "../types/index";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const $props = defineProps({
  id: { type: String, default: "BTC" },
  home: { type: Boolean, default: false }
});
const coin = CRYPTO_INFO[$props.id].id || 'bitcoin';
const URL_SINGLE_SYMBOL_HISTORY_COIN = `${URL_SINGLE_SYMBOL_HISTORY}/${coin}/market_chart`;

let intervalRefresh: number;
let interval: string = '24H';
let chartData: ChartPriceData | null = null;

const error = ref<string | null>(null);
const loading = ref(true);
const selectedInterval = ref<string>("1d");

const intervals = [
  { label: '1H', value: '1h' },
  { label: '24H', value: '1d' },
  { label: '7D', value: '1w' },
  { label: '30D', value: '1M' }
];

const formatPrice = (value: number): string => {
  if (typeof value !== "number" || isNaN(value)) return "$0.00";

  let precision = 2;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
};

const options: any = computed<ChartOptions>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => {
          if (typeof value === "number") {
            return formatPrice(value);
          }
          return value;
        },
        color: "rgb(156, 163, 175)",
      },
      grid: {
        color: "rgba(156, 163, 175, 0.1)",
      },
    },
    x: {
      ticks: {
        color: "rgb(156, 163, 175)",
        maxRotation: 0,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(17, 24, 39, 0.8)",
      titleColor: "rgb(243, 244, 246)",
      // bodyColor: "rgb(243, 244, 246)",
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => {
          if (typeof context.parsed.y === "number") {
            return `Price: ${formatPrice(context.parsed.y)}`;
          }
          return "";
        },
      },
    },
  },
}));

const setIntervalValue = (int: string) => {
  selectedInterval.value = int;
  const getInterval = intervals.find(item => item.value === int);
  interval = getInterval?.label || '24H';
};

const getDays = (interval: string) => {
  switch (interval) {
    case '1h': return 1;
    case '1d': return 1;
    case '1w': return 7;
    case '1M': return 30;
    default: return 1;
  }
};

const getInterval = (interval: string) => {
  switch (interval) {
    case '1h': return 'hourly';
    case '1d': return 'hourly';
    case '1w': return 'daily';
    case '1M': return 'daily';
    default: return 'hourly';
  }
};

const fetchChartData = async () => {
  try {
    loading.value = true;
    error.value = null;
    const url = URL_SINGLE_SYMBOL_HISTORY_COIN;
    const days = getDays(selectedInterval.value);
    const interval = getInterval(selectedInterval.value);
    const response = await axios.get(
      url,
      {
        params: {
          vs_currency: 'usd',
          precision: 10,
          days: days,
          interval: interval
        },
      }
    );
    if (response.data) {
      const prices = response.data.prices.map((candle: any) => ({
        timestamp: candle[0],
        price: parseFloat(candle[1]),
      }));

      chartData = {
        labels: prices.map((price: { timestamp: string | number | Date; }) => {
          const date = new Date(price.timestamp);
          switch (selectedInterval.value) {
            case '1h':
              return format(date, 'HH:mm');
            case '1d':
              return format(date, 'HH:mm');
            case '1w':
              return format(date, 'EEE HH:mm');
            case '1M':
              return format(date, 'MMM dd');
            default:
              return format(date, 'HH:mm');
          }
        }),
        datasets: [
          {
            label: "BITCOIN",
            data: prices.map((price: { price: number }) => price.price),
            backgroundColor: "rgb(255, 255, 255, 0)",
            borderColor: "#0d6efd",
            borderWidth: 2,
            pointRadius: 1,
            tension: 0.4,
            fill: true,
          },
        ],
      };
    loading.value = false;
    } else {
      throw new Error("No price data available");
    }
  } catch (e) {
    console.error('API Error:', e);
    if (axios.isAxiosError(e)) {
      if (!e.response) {
        error.value = 'Unable to connect to the server. Please try again later';
      } else {
        error.value = 'An error occurred while fetching data. Please try again';
      }
    } else {
      error.value = 'An unexpected error occurred. Please try again.';
    }
  }
};

const startInterval = async () => {
  if (intervalRefresh) {
    clearInterval(intervalRefresh);
  }
  intervalRefresh = setInterval(fetchChartData, API_CONFIG.REFRESH_INTERVAL);
};

const startFetching = async () => {
  if (intervalRefresh) {
    clearInterval(intervalRefresh);
  }
  await fetchChartData();
  
  if ($props.home == false) {
    startInterval();
  }
};

watch(() => [selectedInterval.value, $props.id], () => {
  startFetching();
});

onMounted(startFetching);

onUnmounted(() => {
  if (intervalRefresh) clearInterval(intervalRefresh);
  document.body.style.overflow = '';
});

</script>

<template>
  <div v-if="loading && !error" class="d-flex align-items-center justify-content-center py-5">
    <div class="spinner-border text-primary" role="status">
    </div>
  </div>
  <div v-if="error" class="danger">
    <p>{{ error }}</p>
  </div>
  <!-- End Loading and Error States -->

  <div v-else class="col-12">
    <div class="card">
      <div class="filter">
        <a class="icon" href="/" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li class="dropdown-header text-start">
            <h6>Filter</h6>
          </li>
          <li v-for="interval in intervals" class="dropdown-item interval-list" :key="interval.value"
            @click="setIntervalValue(interval.value)">
            {{ interval.label }}
          </li>
        </ul>
      </div>
      <div class="card-body h-300 mb-5">
        <h5 class="card-title">{{ $props.id }} <span>| {{ interval }}</span></h5>
        <Line v-if="chartData && !error" :data="chartData" :options="options" class="h-full" />

        <div v-else class="danger">
          <p v-if="error">{{ error }}</p>
        </div>

      </div>
    </div>
  </div>
  <!-- End Price Chart -->
</template>

<style scoped>
.h-300 {
  max-height: 300px;
}
.interval-list {
  cursor: pointer;
}
</style>
