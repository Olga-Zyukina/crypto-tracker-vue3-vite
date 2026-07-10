import { ref } from "vue";
import { defineStore } from "pinia";
import { CRYPTO_INFO } from "../constants/utils";
import type { CryptoData, ErrorData } from "../types/index";
import { commonService } from "../services";

export const useRootStore = defineStore("root", () => {
  // const news = ref<[] | null>(null);
  const error = ref<ErrorData | null>(null);
  const symbolFullData = ref<[] | null>(null);
  const cryptoList = ref<CryptoData[] | []>([]);

  // async function getNews() {
  //   const data = await commonService.getNews();
  //   if (data.hasOwnProperty("error")) {
  //     error.value = data;
  //   } else {
  //     news.value = data;
  //   }
  // }

  async function transformData() {
    try {
      const dataArray: CryptoData[] = [];
      if (symbolFullData.value) {
        Object.values(symbolFullData.value).forEach((value: any) => {
          const baseSymbol = value.symbol.toUpperCase();
          const info = CRYPTO_INFO[baseSymbol];
          let data = {
            id: baseSymbol,
            symbol: baseSymbol,
            name: info.name,
            image: value.image || '',
            current_price: value.current_price || 0,
            market_cap: value.market_cap || 0,
            price_change_percentage_24h: value.price_change_percentage_24h || 0,
          };
          dataArray.push(data);
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

  // return { news, error, symbolFullData, cryptoList, getNews, getCryptoData };
    return { error, symbolFullData, cryptoList, getCryptoData };

});
