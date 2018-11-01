<template>
  <div id="app">
    <div class="uk-container">
      <h1 class="uk-margin-remove-bottom"><img class="uk-border-circle" width="50" height="50" src="./assets/zepfiro-icon-square-color.png">Zepfiro, modulo ordine web</h1>
      <Ordine />
    </div>
    <footer class="uk-margin">
      <div class="uk-container">Copyright ©{{ new Date().getFullYear() }} Higrow Srl</div>
    </footer>
  </div>
</template>

<script>
import Ordine from './components/Ordine.vue';

export default {
  name: 'app',
  components: {
    Ordine
  }
}
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
</style>
