import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import MugenScroll from "vue-mugen-scroll";
import vSelect from "vue-select";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

Vue.config.productionTip = false;

Vue.component("vue-mugen-scroll", MugenScroll);
Vue.component("v-select", vSelect);
Vue.component("vue-dropzone", vue2Dropzone);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
