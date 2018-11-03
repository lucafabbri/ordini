<template>
  <div id="app">
      <router-view></router-view>
    <footer class="uk-margin">
      <div class="uk-container">Copyright ©{{ new Date().getFullYear() }} Higrow Srl</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
</style>
