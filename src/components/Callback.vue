
<template>
  <div class="uk-spinner">
  </div>
</template>

<script>
import router from "../router";
  export default {
    name: 'Callback',
    props: ['auth'],
    data () {
      this.auth.handleAuthentication()
      return {}
    }
  }
</script>

<style>
  .uk-sspinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>