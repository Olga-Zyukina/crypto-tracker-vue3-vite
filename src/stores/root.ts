import { ref } from "vue";
import { defineStore } from "pinia";
import { API_CONFIG } from "../constants/config";
import { commonService } from "../services";

export const useRootStore = defineStore("root", () => {
  const news: any = ref([]);
  const error: any = ref(null);
  const symbolFullData: any = ref([]);

  async function getNews() {
    const data: any = await commonService.getNews();
    if (data.hasOwnProperty("error")) {
      error.value = data;
    } else {
      news.value = data;
    }
  }

  async function getSymbolFullData() {
    const data: any = await commonService.getSymbolFullData();
    if (data.hasOwnProperty("error")) {
      error.value = data;
    } else {
      symbolFullData.value = data;
    }
  }

  return { news, error, symbolFullData, getNews, getSymbolFullData };
});
