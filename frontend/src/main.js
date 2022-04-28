import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import routes from "./routes";
import store from "./store";

Vue.config.productionTip = false;

// Vue Router Documentation https://v3.router.vuejs.org/installation.html#npm
const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => !rec.meta.authNotRequired)) {
    if (localStorage.getItem("token")) return next();
    return next({ name: "login" });
  } else if (to.matched.every((rec) => rec.meta.authNotRequired)) {
    if (localStorage.getItem("token"))
      return next({ name: from.name || "dashboard" });
    return next();
  }
  next();
});

Vue.use(VueRouter);
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
