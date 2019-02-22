import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/cat/:catId",
      name: "Cat Details",
      component: () => import("./views/Cat-Details.vue")
    },
    {
      path: "/upload",
      name: "Upload Cat Image",
      component: () => import("./views/Upload.vue")
    }
  ]
});
