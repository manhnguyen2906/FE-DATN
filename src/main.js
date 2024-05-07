import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import { DatePicker } from 'ant-design-vue';
import swal from 'vue-sweetalert2'
import "sweetalert2/dist/sweetalert2.min.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'

// import 'ant-design-vue/dist/reset.css';
// import axios from 'axios'
// window.axios=axios;


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(swal)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Vue.use(DatePicker);
Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  HighchartsVue,

  render: h => h(App)
}).$mount('#app')
