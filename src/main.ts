import { createApp } from "vue";
import { createPinia } from 'pinia'

import "bootstrap/dist/css/bootstrap.css";
import './assets/vendor/bootstrap-icons/bootstrap-icons.min.css'
import "simple-datatables/dist/style.css";
import "./style.css";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App);
app.use(createPinia())
app.use(router);
app.mount("#app");
