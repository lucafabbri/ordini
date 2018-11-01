import Vue from 'vue'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import App from './App.vue'

UIkit.use(Icons);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
