import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from "./store";
import ax from './utils/sdkreq'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './mock' // simulation data generator

import * as filters from './filters' // global filter
var appVue = {};
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;

Vue.directive('auth', {
  bind: function (el, binding) {
    if(appVue.$root && appVue.$root.auth){
      if(!appVue.$root.auth.includes(binding.value)){
        el.style.display = 'none';
      }
    }else{
      el.style.display = 'none';
    }
  }
})


appVue = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  data: {
    bus: new Vue(),
    ax: ax,
    auth: ''
  },
  template: "<App/>",
  components: {App}
});


