import Vue from 'vue'
import Router from 'vue-router'
import Ordine from './components/Ordine.vue'
import Riepilogo from './components/Riepilogo.vue'
import Ordini from './components/Ordini.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'ElencoOrdini',
      component: Ordini
    },
    {
      path: '/ordine/nuovo',
      name: 'NuovoOrdine',
      component: Ordine
    },
    {
      path: '/ordine/:id',
      name: 'ModificaOrdine',
      component: Ordine
    },
    {
        path: '/ordine/:id/riepilogo',
        name: 'RiepilogoOrdine',
        component: Riepilogo
    }
  ]
})