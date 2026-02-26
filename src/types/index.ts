export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}
export interface TableData {
  headings: [string, string, string, string, string];
  data: any;
}
export interface ErrorData {
  error: boolean;
  news?: string;
  symbolFullData?: string;
}
export interface NewsData {
  id: string;
  image: string;
  title: string;
  body: string;
}
export interface ChartData {
  id: string;
  cap: number;
}
