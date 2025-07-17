<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRootStore } from "../stores/root";

import { BASE_URL } from "../constants/api";
import { CRYPTO_INFO } from "../constants/utils";
import type { CryptoData } from "../types/crypto";

import RadarChart from "./RadarChart.vue";
import DoughnutChart from "./DoughnutChart.vue";

const rootStore = useRootStore();
const news = computed(() => rootStore.news);
const error = computed(() => rootStore.error);
const symbolFullData = computed(() => rootStore.symbolFullData);

const cryptoList = ref<CryptoData[] | any>([]);
const newsList: any = ref([]);
const loading = ref(true);
const chartData = ref([]);

const getChartData: any = () => {
  if (cryptoList) {
    chartData.value = cryptoList.value
    .filter((item: { market_cap: number; }) => item.market_cap < 200000000000 && item.market_cap > 10000000000)
    .map((crypto: any) => ({
      id: crypto.id,
      cap: crypto.market_cap / 1000000})
    )
  }
};

const transformData = async (): Promise<CryptoData[]> => {
  try {
    const dataArray:
      | PromiseLike<CryptoData[]>
      | {
        id: any;
        symbol: any;
        name: string;
        image: string;
        current_price: any;
        market_cap: any;
        price_change_percentage_24h: any;
      }[] = [];
    if (symbolFullData.value) {
      Object.values(symbolFullData.value).forEach((value: any) => {
        Object.values(value).forEach((val: any) => {
          const baseSymbol = val.FROMSYMBOL;
          const info = CRYPTO_INFO[baseSymbol];
          let data = {
            id: baseSymbol,
            symbol: baseSymbol,
            name: info.name,
            image: BASE_URL + val.IMAGEURL,
            current_price: val.PRICE,
            market_cap: val.MKTCAP,
            price_change_percentage_24h: val.CHANGEPCT24HOUR,
          };
          dataArray.push(data);
        });
      });
      return dataArray;
    } else {
      throw new Error("No price data available");
    }
  } catch (e) {
    return [];
  }
};

const fetchCryptoData = async () => {
  try {
    loading.value = true;
    cryptoList.value = await transformData();
    getChartData();
    loading.value = false;
  } catch (e) {
    throw new Error("No news data available");
  }
};

const fetchNewsData = async () => {
  loading.value = true;
  if (news.value) {
    Object.values(news.value.slice(0, 5)).forEach((value: any) => {
      const newsItem: any = {
        id: value.id,
        image: value.imageurl,
        title: value.title,
        body: value.body.slice(0, 150) + "..."
      };
      newsList.value.push(newsItem);
    });
    loading.value = false;
  } else {
    throw new Error("No news data available");
  }
};

const startFetching = () => {
  fetchCryptoData();
  fetchNewsData();
};

watch(() => [news.value, symbolFullData.value], () => {
  startFetching();
});

onMounted(() => {
  startFetching();
});
</script>

<template>
  <div v-if="loading && !error" class="d-flex align-items-center justify-content-center py-5">
    <div class="spinner-border text-primary" role="status">
    </div>
  </div>
  <!-- End Loading & Error States -->

  <div v-else>
    <div class="card">
      <div class="filter">
        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li class="dropdown-header text-start">
            <h6>Filter</h6>
          </li>

          <li><a class="dropdown-item" href="#">Today</a></li>
          <li><a class="dropdown-item" href="#">This Month</a></li>
          <li><a class="dropdown-item" href="#">This Year</a></li>
        </ul>
      </div>

      <div class="card-body">
        <h5 class="card-title">Recent Activity <span>| Today</span></h5>

        <div class="activity">
          <div class="activity-item d-flex">
            <div class="activite-label">32 min</div>
            <i class="bi bi-circle-fill activity-badge text-success align-self-start"></i>
            <div class="activity-content">
              Quia quae rerum
              <a href="#" class="fw-bold text-dark">explicabo officiis</a>
              beatae
            </div>
          </div>
          <!-- End activity item-->

          <div class="activity-item d-flex">
            <div class="activite-label">56 min</div>
            <i class="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
            <div class="activity-content">
              Voluptatem blanditiis blanditiis eveniet
            </div>
          </div>
          <!-- End activity item-->

          <div class="activity-item d-flex">
            <div class="activite-label">2 hrs</div>
            <i class="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
            <div class="activity-content">
              Voluptates corrupti molestias voluptatem
            </div>
          </div>
          <!-- End activity item-->

          <div class="activity-item d-flex">
            <div class="activite-label">1 day</div>
            <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
            <div class="activity-content">
              Tempore autem saepe
              <a href="#" class="fw-bold text-dark">occaecati voluptatem</a>
              tempore
            </div>
          </div>
          <!-- End activity item-->

          <div class="activity-item d-flex">
            <div class="activite-label">2 days</div>
            <i class="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
            <div class="activity-content">
              Est sit eum reiciendis exercitationem
            </div>
          </div>
          <!-- End activity item-->

          <div class="activity-item d-flex">
            <div class="activite-label">4 weeks</div>
            <i class="bi bi-circle-fill activity-badge text-muted align-self-start"></i>
            <div class="activity-content">
              Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
            </div>
          </div>
          <!-- End activity item-->
        </div>
      </div>
    </div>
    <!-- End Recent Activity -->

    <div v-if="error && error.symbolFullData" class="danger">
      <p v-if="error.symbolFullData">{{ error.symbolFullData }}</p>
    </div>
    <!-- End Error SymbolFullData States -->

    <div v-else>
      <RadarChart :data="chartData" />
      <!-- End Radar Chart -->
      <DoughnutChart :data="chartData" />
      <!-- End DoughnutChart Chart -->
    </div>
    <!-- End SymbolFullData Chart -->

    <div v-if="error && error.news" class="danger">
      <p v-if="error.news">{{ error.news }}</p>
    </div>
    <!-- End Error News States -->

    <div v-else class="card">
      <div class="card-body pb-0">
        <h5 class="card-title">Latest News Articles <span>| All time</span></h5>
        <div class="news">
          <div v-for="news in newsList" :key="news.id" class="post-item clearfix">
            <img :src="news.image" :alt="news.title" />
            <h4><a href="/">{{ news.title }}</a></h4>
            <p>
              {{ news.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- End Latest News Articles -->

  </div>
  <!-- End RightSide Grid -->

</template>

<style scoped></style>