<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRootStore } from "../stores/root";

import { BASE_URL } from "../constants/api";
import { CRYPTO_INFO } from "../constants/utils";
import type { CryptoData } from "../types/crypto";
import type { TableData } from "../types/table";

import PriceChart from "./PriceChart.vue";
import RightSide from "./RightSide.vue";
import { DataTable } from "simple-datatables";

const rootStore = useRootStore();
const news = computed(() => rootStore.news);
const error = computed(() => rootStore.error);
const symbolFullData = computed(() => rootStore.symbolFullData);

const loading = ref(true);
const cryptoList = ref<CryptoData[] | any>([]);
const lastUpdateTime = ref<Date | null>(null);
const tableData: TableData | any = {
    headings: [
      "Id",
      "Name",
      "Cap",
      "Price",
      "Price change 24h"
    ],
    data: []
  };

const totalMarketCap = computed(() => {
  return cryptoList.value.reduce(
    (total: any, crypto: { market_cap: any; }) => total + (crypto.market_cap || 0),
    0
  );
});

const topGainers = computed(() => {
  return [...cryptoList.value]
    .sort(
      (a, b) =>
        (b.price_change_percentage_24h || 0) -
        (a.price_change_percentage_24h || 0)
    )
    .slice(0, 3);
});

const topLosers = computed(() => {
  return [...cryptoList.value]
    .sort(
      (a, b) =>
        (a.price_change_percentage_24h || 0) -
        (b.price_change_percentage_24h || 0)
    )
    .slice(0, 3);
});

const topPrice = computed(() => {
  return [...cryptoList.value]
    .sort(
      (a, b) =>
        (b.current_price || 0) -
        (a.current_price || 0)
    )
    .slice(0, 10);
});

const formatTotalMarketCap = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatMarketCap = (value: number) => {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatLastUpdate = () => {
  if (!lastUpdateTime.value) return '';
  return new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(lastUpdateTime.value);
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
    return [];
  }
};

const fetchCryptoData = async () => {
  try {
    loading.value = true;
    cryptoList.value = await transformData();
    lastUpdateTime.value = new Date();
    loading.value = false;
  } catch (e) {
    throw new Error("No news data available");
  }
};

const getTableData = () => {
  if (cryptoList.value.length > 1) {
    for (let i = 0; i < cryptoList.value.length; i++) {
      tableData.data[i] = [];
      for (let p of ["id", "name", "market_cap", "current_price", "price_change_percentage_24h"]) {
        if (cryptoList.value[i].hasOwnProperty(p)) {
          if (p === "price_change_percentage_24h") {
            tableData.data[i].push(cryptoList.value[i][p].toFixed(2));
          } else {
            tableData.data[i].push(cryptoList.value[i][p]);
          }
        } else {
          tableData.data[i].push('');
        }
      }
    }
  }
};

const createTable = () => {
  if (document.querySelector(".cap-title")) {
    let capTitle: any = document.querySelector(".cap-title");
    let datatableWrapper: any = document.querySelector(".datatable-wrapper");
    if (datatableWrapper) {
      datatableWrapper.remove();
    }
    let capTable = document.createElement("table");
    capTable.id = 'datatable';
    capTable.className += 'table table-borderless datatable';
    capTitle.after(capTable);
  }
};

const createTopMarketCapTable = async () => {
  getTableData();
  createTable();
  new DataTable("#datatable", {
    data: tableData,
    perPageSelect: [5, 10, 15, ["All", -1]],
    columns: [
      {
        select: [0, 1, 3, 4],
        sortable: false
      },
      {
        select: [0, 2],
        cellClass: "text-primary",
      },
      {
        select: [2],
        type: 'number',
        cellClass: "text-primary text-end fw-bold",
        sort: 'desc',
        render: function (data: any) {
          return new Intl.NumberFormat("ru", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(data);
        }
      },
      {
        select: [3],
        type: 'number',
        render: function (data: any) {
          return new Intl.NumberFormat("ru", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }).format(data);
        }
      },
      {
        select: [4],
        render: function (data: any, cell: any) {
          const cellTextNode = cell.childNodes[0]
          const currencyNode = {
            nodeName: "SPAN",
            attributes: {
              class: "price-change-percentage"
            },
            childNodes: [cellTextNode]
          }
          cell.childNodes = [currencyNode]

          if (data[0].data < 0) {
            currencyNode.attributes.class += " bg-danger"
          } else if (data[0].data >= 0) {
            currencyNode.attributes.class += " bg-success"
          }
        }
      },
    ],
  });
};

const startFetching = async () => {
  await fetchCryptoData();
  await createTopMarketCapTable();
};

watch(() => [news.value, symbolFullData.value], () => {
  startFetching();
});

onMounted(() => {
  startFetching();
});

</script>

<template>
  <section class="section dashboard">

    <div v-if="loading && !error" class="d-flex align-items-center justify-content-center py-5">
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>
    <!-- End Loading States -->

    <div v-else class="row">
      <div class="col-lg-8">
        <div class="row">

          <!-- TotalMarketCap -->
          <div class="col-xxl-4 col-md-6">
            <div v-if="error && error.symbolFullData" class="danger">
              <p v-if="error.symbolFullData">{{ error.symbolFullData }}</p>
            </div>
            <!-- End Error States -->
            <div v-else class="card info-card cap-card">
              <div class="card-body h-195">
                <h5 class="card-title">Total Market Cap <span>| All time</span></h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-trophy"></i>
                  </div>
                  <div class="ps-3">
                    <h6>{{ formatTotalMarketCap(totalMarketCap) }}</h6>
                  </div>
                </div>
                <div class="last-updated mt-2">
                  Last updated:
                  <span>
                    {{ formatLastUpdate() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- End TotalMarketCap -->

          <!-- Top Gainers (24h) -->
          <div class="col-xxl-4 col-md-6">
            <div v-if="error && error.symbolFullData" class="danger">
              <p v-if="error.symbolFullData">{{ error.symbolFullData }}</p>
            </div>
            <!-- End Error States -->
            <div v-else class="card info-card gainers-card">
              <div class="card-body">
                <h5 class="card-title">Top Gainers <span>| 24h</span></h5>
                <div class="d-flex align-items-center">
                  <ul class="gainers-list">
                    <li v-for="crypto in topGainers" :key="crypto.id"
                      class="d-flex justify-content-between align-items-center mt-2">
                      <div class="d-flex align-items-center">
                        <img :src="crypto.image" :alt="crypto.name" />
                        <span>{{ crypto.name }}</span>
                      </div>
                      <span class="text-success fw-bold">
                        {{ crypto.price_change_percentage_24h?.toFixed(2) }}%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- End Top Gainers (24h) -->

          <!-- Top Losers (24h) -->
          <div class="col-xxl-4 col-xl-12">
            <div v-if="error" class="danger">
              <p v-if="error && error.symbolFullData">{{ error.symbolFullData }}</p>
            </div>
            <!-- End Error States -->
            <div v-else class="card info-card losers-card">

              <div class="card-body">
                <h5 class="card-title">Top Losers <span>| 24h</span></h5>
                <div class="d-flex align-items-center">
                  <ul class="losers-list">
                    <li v-for="crypto in topLosers" :key="crypto.id"
                      class="d-flex justify-content-between align-items-center mt-2">
                      <div class="d-flex align-items-center">
                        <img :src="crypto.image" :alt="crypto.name" />
                        <span>{{ crypto.name }}</span>
                      </div>
                      <span class="text-danger fw-bold">
                        {{ crypto.price_change_percentage_24h?.toFixed(2) }}%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- End Top Losers (24h) -->

          <!-- PriceReports (24h) -->
          <PriceChart id="BTC" :home=true />
          <!-- End Reports (24h) -->

          <!-- Top Market Cap -->
          <div class="col-12">
            <!-- <div v-if="error" class="danger">
              <p v-if="error && error.symbolFullData">{{ error.symbolFullData }}</p>
            </div> -->
            <!-- End Error States -->
            <div class="card top-market-cap overflow-auto">
              <div class="card-body">
                <h5 class="card-title cap-title">Top Market Cap <span>| All time</span></h5>
              </div>
            </div>
          </div>
          <!-- End Top Market Cap -->

          <!-- Top Price -->
          <div class="col-12">
            <div v-if="error" class="danger">
              <p v-if="error && error.symbolFullData">{{ error.symbolFullData }}</p>
            </div>
            <!-- End Error States -->
            <div v-else class="card top-price overflow-auto">
              <div class="card-body pb-0">
                <h5 class="card-title">Top Price <span>| Today</span></h5>
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
          <!-- End Top Price -->
        </div>
      </div>
      <!-- End Left side columns -->
      <div class="col-lg-4">
        <RightSide />
      </div>
      <!-- End Right side columns -->
    </div>
    <!-- End Crypto Grid -->

  </section>
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
.h-195 {
  min-height:195px;
}
.last-updated span {
  color: #4154f1;
}
</style>