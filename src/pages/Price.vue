<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRootStore } from "../stores/root";
import { commonService } from "../services";

import { BASE_URL } from "../constants/api";
import { CRYPTO_INFO } from "../constants/utils";
import type { CryptoData } from "../types/crypto";

import AppHeader from "../components/Header.vue";
import AppSidebar from "../components/Sidebar.vue";
import AppMain from "../components/Main.vue";
import AppFooter from "../components/Footer.vue";
import RightSide from "../components/RightSide.vue";

const rootStore = useRootStore();
const symbolFullData = computed(() => rootStore.symbolFullData);
const error = computed(() => rootStore.error);

const cryptoList = ref<CryptoData[] | any>([]);
const loading = ref(true);

const topPrice = computed(() => {
  return [...cryptoList.value]
    .sort(
      (a, b) =>
        (b.price_change_percentage_24h || 0) -
        (a.price_change_percentage_24h || 0)
    );
});

const formatMarketCap = (value: number) => {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
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
    console.error('API Error:', e);
    return [];
  }
};

const fetchCryptoData = async () => {
  try {
    loading.value = true;
    cryptoList.value = await transformData();
    loading.value = false;
  } catch (e) {
    console.error('API Error:', e);
    throw new Error("No news data available");
  }
};

watch(() => symbolFullData.value, () => {
  fetchCryptoData();
});

onMounted(async () => {
  commonService.commonFunction();
  fetchCryptoData();
});
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <AppMain>
    <template #title>PriceGainers</template>
    <template #home>
      <section>
        <div class="row">
          <div class="col-lg-8">
            <div v-if="loading && !error" class="d-flex align-items-center justify-content-center py-5">
              <div class="spinner-border text-primary" role="status">
              </div>
            </div>
            <div v-if="error && error.symbolFullData" class="danger">
              <p>{{ error.symbolFullData }}</p>
            </div>
            <!-- End Loading and Error States -->

            <div v-else class="card top-price overflow-auto">
              <div class="card-body pb-0">
                <h5 class="card-title">Price Gainers</h5>
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Icon</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Price change 24h</th>
                      <th scope="col">Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="crypto in topPrice" :key="crypto.id">
                      <th scope="row">
                        <a href="/"><img :src="crypto.image" :alt="crypto.name" /></a>
                      </th>
                      <td>
                        <a href="/">{{ crypto.name }}</a>
                      </td>
                      <td class="fw-bold">{{ formatPrice(crypto.current_price) }}</td>
                      <td>{{ crypto.price_change_percentage_24h.toFixed(2) }}%</td>
                      <td>{{ formatMarketCap(crypto.market_cap) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- End Left side columns -->

          <div class="col-lg-4">
            <RightSide />
          </div>
          <!-- End Right side columns -->
        </div>
        <!-- End PriceGainers columns -->
      </section>
    </template>
  </AppMain>
  <AppFooter />
  <!-- Back to top button -->
  <a href="/" class="back-to-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<style scoped>
.gainers-list,
.losers-list {
  width: 100%;
  padding: 0;
}
.gainers-list img,
.losers-list img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
}
</style>