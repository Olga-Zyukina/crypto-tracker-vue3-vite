import { ref } from "vue";
import { defineStore } from "pinia";
import { BASE_URL } from "../constants/api";
import { CRYPTO_INFO } from "../constants/utils";
import type { CryptoData, ErrorData } from "../types/index";
import { commonService } from "../services";

export const useRootStore = defineStore("root", () => {
  const news = ref<[] | null>(null);
  const error = ref<ErrorData | null>(null);
  const symbolFullData = ref<[] | null>(null);
  const cryptoList = ref<CryptoData[] | any>([]);

  async function getNews() {
    const data = await commonService.getNews();
    if (data.hasOwnProperty("error")) {
      error.value = data;
    } else {
      news.value = data;
    }
  }

  async function transformData() {
    try {
      const dataArray: CryptoData[] = [];
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
        cryptoList.value = dataArray;
      } else {
        throw new Error("No cryptodata available");
      }
    } catch (e) {
      throw new Error("No cryptodata available");
    }
  }

  async function getCryptoData() {
    const data = await commonService.getCryptoData();
    if (data.hasOwnProperty("error")) {
      error.value = data;
    } else {
      symbolFullData.value = data;
      await transformData();
    }
  }

  return { news, error, symbolFullData, cryptoList, getNews, getCryptoData };
});
