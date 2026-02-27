export interface CryptoData {
  [key: string]: string | number;
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}
export interface TableData {
  headings: Array<string>;
  data: Array<Array<number | string>>;
}
export interface ErrorData {
  error: boolean;
  news?: string;
  symbolFullData?: string;
}
export interface NewsData {
  id: number;
  image: string;
  title: string;
  body: string;
}
export interface ChartData {
  id: string;
  cap: number;
}
export interface ChartPriceData {
  labels: Array<Date>;
  datasets: Array<{
    label: string;
    data: Array<number>;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    pointRadius: number;
    tension: number;
    fill: boolean;
  }>;
}
export interface RadarChartData {
  labels: Array<Date>;
  datasets: Array<{
    label: string;
    data: Array<number>;
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
  }>
};