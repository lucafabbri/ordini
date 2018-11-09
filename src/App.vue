<template>
  <div id="app">
      <router-view v-title="title"></router-view>
    <footer class="uk-margin noprint">
      <div class="uk-container">Copyright ©{{ new Date().getFullYear() }} Higrow Srl</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function(){
    return {
      title:"Modulo ordini Zepfiro"
    }
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
