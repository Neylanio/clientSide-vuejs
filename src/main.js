import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import axios from "axios";

import router from "./router";

Vue.use(VueRouter);

Vue.prototype.$http = axios;

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
