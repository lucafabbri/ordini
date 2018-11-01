<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Quante parole chiave all'incirca si vorrebbe indicizzare?
            <input class="uk-range" type="range" v-model="seo.keywords" value="0" min="0" max="20" step="1">   <strong>{{seo.keywords}}</strong></label>              
        </div>
    </div>
</template>
<script>
export default {
  name: "Seo",
  props: {
    input: Object,
        progetto:Object
  },
  data: function() {
    return {
      seo: this.input
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
