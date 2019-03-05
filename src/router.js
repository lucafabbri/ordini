import Vue from 'vue';
import Router from 'vue-router';
import Ordine from './components/Ordine.vue';
import Riepilogo from './components/Riepilogo.vue';
import Ordini from './components/Ordini.vue';
import Callback from './components/Callback.vue';
import HelloWorld from './components/HelloWorld.vue';
import AuthService from './auth/AuthService';

const auth = new AuthService();

const { login, logout, authenticated, authNotifier } = auth;

const ifNotAuthenticated = (to, from, next) => {
  if (authenticated) {
    next();
    return;
  }
  next('/');
};

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ordini',
      name: 'ElencoOrdini',
      component: Ordini,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/ordine/:id',
      name: 'Ordine',
      component: Ordine,
      beforeEnter: ifNotAuthenticated
    },
    {
        path: '/ordine/:id/riepilogo',
        name: 'RiepilogoOrdine',
        component: Riepilogo,
        beforeEnter: ifNotAuthenticated
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})