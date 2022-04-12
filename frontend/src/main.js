import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.config.productionTip = false;

// Vue Router Documentation https://v3.router.vuejs.org/installation.html#npm

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');

