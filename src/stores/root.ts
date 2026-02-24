import { ref } from "vue";
import { defineStore } from "pinia";
import type { ErrorData } from "../types/index";
import { commonService } from "../services";

export const useRootStore = defineStore("root", () => {
  const news = ref<[] | null>(null);
  const error = ref<ErrorData |null>(null);
  const symbolFullData = ref<[] | null>(null);

  async function getNews() {
    const data = await commonService.getNews();
    if (data.hasOwnProperty("error")) {
      error.value = data;
    } else {
      news.value = data;
    }
  }

  async function getSymbolFullData() {
    const data = await commonService.getSymbolFullData();
    if (data.hasOwnProperty("error")) {
      error.value = data;
    } else {
      symbolFullData.value = data;
    }
  }

  return { news, error, symbolFullData, getNews, getSymbolFullData };
});
