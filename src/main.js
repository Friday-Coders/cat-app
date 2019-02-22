import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import MugenScroll from "vue-mugen-scroll";
import vSelect from "vue-select";

Vue.config.productionTip = false;

Vue.component("vue-mugen-scroll", MugenScroll);
Vue.component("v-select", vSelect);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
