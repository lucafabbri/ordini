import Vue from 'vue'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import App from './App.vue'
import store from './store'
import router from './router'

UIkit.use(Icons);

Vue.config.productionTip = false
Vue.directive('title', {
  inserted: (el, binding) => document.title = binding.value,
  update: (el, binding) => document.title = binding.value
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
