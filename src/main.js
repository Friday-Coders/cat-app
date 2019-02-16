import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import MugenScroll from "vue-mugen-scroll";

Vue.config.productionTip = false;

Vue.component("vue-mugen-scroll", MugenScroll);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
