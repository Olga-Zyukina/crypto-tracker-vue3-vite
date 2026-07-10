# Crypto Tracker

A real-time cryptocurrency price tracking application created using **Vue 3 + TypeScript + Vite**.
The application extracts current data from the **Cryptocompare API** and provides an interactive interface for monitoring cryptocurrency prices, market capitalization, and trends.

## Features

- Multi-page website
- Real-time price updates
- Interactive price charts with different time intervals (1 hour, 24 hours, 7 days, 30 days)
- Adaptive design
- A market overview indicating the total market capitalization
- Tracking the most profitable and unprofitable currencies
- Personal account
- Registration/entry form

## Technologies Used

-  Vue 3
-  TypeScript
-  Vite
-  API Cryptocompare
-  Bootstrap v5.3.7
-  Vue-router
-  Axios
-  Pinia
-  Chart.js
-  Vue-chartjs
-  Simple-datatables
-  Docker

## Live Demo

Check out the live demo: [Crypto Tracker](https://olga-zyukina.github.io/crypto-tracker-vue3-vite/dist/)

## Project Structure

```
src/
├── components/     # Vue components
├── pages/          # Vue pages
├── types/          # TypeScript type definitions
├── services/       # Functions
├── assets/         # Static assets
└── App.vue         # Root component
```

## Features in Detail

### Real-time price updates
- Automatic price updates every 10 seconds.

### Interactive graphics
- Price charts with different time intervals;
- Smooth animation;
- Adaptive design;
- Tooltips.

### Market Overview
- Total market capitalization;
- Top currencies by price rise/fall;
- Statistics on individual currencies.

### User Interface
- Clean and modern design;
- Adaptive layout for all screen sizes;
- Smooth transitions and animations.

## Development
- Make sure you have Node.js installed.
- Clone the repo to your machine.
- Install all dependencies
`npm install`
- Development:
`npm run dev`
- Production:
`npm run build`

## Docker
- Building image
`docker build .`
- Building images & run containers
`docker compose up`<br/>
Open browser in Development mode: localhost:5173<br/>
Open browser in Production mode: localhost:5174

<div><img src="https://github.com/Olga-Zyukina/crypto-tracker-vue3-vite/blob/master/Screenshot.png" title="crypto-tracker-vue3-vite" alt="crypto-tracker-vue3-vite"/></div>
