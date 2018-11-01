<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Scegli un tipo di manutenzione</label>             
            <button type="button" v-bind:class="[ mainteneance.isOrdinaria ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsOrdinaria()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: nut"></span> 
                Bug e piccoli aggiornamenti</button>
            <button type="button" v-bind:class="[ mainteneance.isPerfettiva ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsPerfettiva()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: bolt"></span> 
                Bug, aggiornamenti e nuove funzionalità</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "Mainteneance",
  props: {
    input: Object,
        progetto:Object
  },
  data: function() {
    return {
      mainteneance: this.input
    };
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toggleIsOrdinaria: function(){
        this.mainteneance.isOrdinaria=!this.mainteneance.isOrdinaria;
        this.mainteneance.isPerfettiva=!this.mainteneance.isOrdinaria;
    },
    toggleIsPerfettiva: function(){
        this.mainteneance.isPerfettiva=!this.mainteneance.isPerfettiva;
        this.mainteneance.isOrdinaria=!this.mainteneance.isPerfettiva;
    }
  }
};
</script>
<style>
</style>
