<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRootStore } from "../stores/root";
import type { TableData } from "../types/index";
import { commonService } from "../services";
import { DataTable } from "simple-datatables";

import AppHeader from "../components/Header.vue";
import AppSidebar from "../components/Sidebar.vue";
import AppMain from "../components/Main.vue";
import AppFooter from "../components/Footer.vue";
import RightSide from "../components/RightSide.vue";

const rootStore = useRootStore();
const symbolFullData = computed(() => rootStore.symbolFullData);
const error = computed(() => rootStore.error);
const cryptoList = computed(() => rootStore.cryptoList);

const loading = ref(true);
let tableData: TableData = { headings: ["id", "name", "market_cap", "current_price", "price_change_percentage_24h"], data: [], }

const fetchCryptoData = async () => {
  try {
    loading.value = true;
    if (cryptoList.value.length >= 1) {
      loading.value = false;
    }
    loading.value = false;
  } catch (e) {
    console.error('API Error:', e);
    throw new Error("No news data available");
  }
};

const getTableData = () => {
  if (cryptoList.value.length > 1) {
    tableData.data = [];
    for (let i = 0; i < cryptoList.value.length; i++) {
      tableData.data[i] = [];
      for (let p of ["id", "name", "market_cap", "current_price", "price_change_percentage_24h"]) {
        if (cryptoList.value[i].hasOwnProperty(p)) {
          if (p === "price_change_percentage_24h" ) {
            tableData.data[i].push(cryptoList.value[i][p].toFixed(2));
          } else {
            tableData.data[i].push(cryptoList.value[i][p]);
          }
        }
      }
    }
  }
};

const createTable = () => {
  if (document.querySelector(".cap-title")) {
    let capTitle: Element | null = document.querySelector(".cap-title");
    let datatableWrapper: Element | null = document.querySelector(".datatable-wrapper");
    if (datatableWrapper) {
      datatableWrapper.remove();
    }
    let capTable = document.createElement("table");
    capTable.id = 'datatable';
    capTable.className += 'table table-borderless datatable';
    if (capTitle) {
      capTitle.after(capTable);
    }
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

watch(() => symbolFullData.value, () => {
  fetchCryptoData();
});

onMounted(async () => {
  commonService.commonFunction();
  await fetchCryptoData();
  await createTopMarketCapTable();
});
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <AppMain>
    <template #title>Market Cap</template>
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
            <div v-else class="card top-market-cap overflow-auto">
              <div class="card-body">
                <h5 class="card-title cap-title">Top Market Cap <span>| All time</span></h5>
              </div>
            </div>
          </div>
          <!-- End Left side columns -->
          <div class="col-lg-4">
            <RightSide />
          </div>
          <!-- End Right side columns -->
        </div>
        <!-- End Cap Grid -->
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