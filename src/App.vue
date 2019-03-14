<template>
  <div id="app">
    <div v-if="!authenticated">
      <div class="uk-container uk-text-center uk-margin uk-margin-top">
            <button type="button" class="uk-button uk-button-danger" @click="login()"><span uk-icon="icon: sign-in"></span> Login</button>
      </div>
    </div> 
    <router-view 
      :auth="auth" 
      :authenticated="authenticated">
    </router-view>
    <footer class="uk-margin noprint">
      <div class="uk-container uk-text-center">
        <ul class="uk-list uk-list-line">
          <li>
            <a href="/ordini">ordini</a>
          </li>
        </ul>
      </div>
      <div class="uk-container uk-text-center">Copyright ©{{ new Date().getFullYear() }} Higrow Srl </div>
      <div v-if="authenticated" class="uk-container uk-text-center uk-margin uk-margin-top">
            <button type="button" class="uk-button uk-button-danger" @click="logout()"><span uk-icon="icon: sign-out"></span> Logout</button>
      </div>
    </footer>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'
import router from './router'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  data: function(){
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
      if(!this.authenticated){
        router.push('/');
      }else{
        router.push('/ordini');
      }
    })
    return {
      title:"Modulo ordini Zepfiro",
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
@media print {
  .noprint {display:none;}
  @page {
      size: auto;   /* auto is the initial value */
      margin: 0;  /* this affects the margin in the printer settings */
  }
}
</style>
