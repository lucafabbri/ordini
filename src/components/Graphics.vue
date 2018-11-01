<template>
    <div class="uk-child-width-expand@s" uk-grid>
    </div>
</template>
<script>
export default {
  name: "Graphics",
  props: {
    input: Object,
        progetto:Object
  },
  data: function() {
    return {
      graphics: this.input
    };
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>
<style>
</style>
