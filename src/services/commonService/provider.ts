import { ref } from "vue";
import axios from "axios";
import { URL_MULTIPLE_SYMBOL_FULL_DATA, URL_LATEST_NEWS_ARTICLES } from "../../constants/api";
import { CRYPTO_INFO } from "../../constants/utils";

const error: any = ref({"error": true});
const symbols = Object.keys(CRYPTO_INFO).join(",");

export const getNews = async () => {
  try {
    const data = await axios.get(URL_LATEST_NEWS_ARTICLES);
    return data?.data.Data;
  } catch (e) {
    console.error("API Error:", e);
    if (axios.isAxiosError(e)) {
      if (!e.response) {
        error.value['news'] = "Unable to connect to the server. Please try again later";
      } else {
        error.value['news'] = "An error occurred while fetching data. Please try again";
      }
    } else {
      error.value['news'] = "An unexpected error occurred. Please try again";
    }
    return error.value;
  }
};

export const getSymbolFullData = async () => {
  try {
    const data = await axios.get(
      URL_MULTIPLE_SYMBOL_FULL_DATA, {
      params: {
        tsyms: 'USD',
        fsyms: symbols
      },
    }
    );
    return data?.data.RAW;
  } catch (e) {
    console.error("API Error:", e);
    if (axios.isAxiosError(e)) {
      if (!e.response) {
        error.value['symbolFullData'] = "Unable to connect to the server. Please try again later";
      } else {
        error.value['symbolFullData'] = "An error occurred while fetching data. Please try again";
      }
    } else {
      error.value['symbolFullData'] = "An unexpected error occurred. Please try again";
    }
    return error.value;
  }
};