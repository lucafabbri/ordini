<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Scegli un tipo di manutenzione</label>             
            <button type="button" v-bind:class="[ mainteneance.isSmart ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsSmart()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: lock"></span> 
                Manuntezione di Sicurezza</button>
            <button type="button" v-bind:class="[ mainteneance.isOrdinaria ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsOrdinaria()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: nut"></span> 
                Bug, sicurezza e piccoli aggiornamenti</button>
            <button type="button" v-bind:class="[ mainteneance.isPerfettiva ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsPerfettiva()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: bolt"></span> 
                Bug, sicurezza, aggiornamenti e nuove funzionalità</button>
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
    toggleIsSmart: function(){
        this.mainteneance.isSmart=!this.mainteneance.isSmart;
        if(this.mainteneance.isSmart){
            this.mainteneance.isOrdinaria=!this.mainteneance.isSmart;
            this.mainteneance.isPerfettiva=!this.mainteneance.isSmart;
        }
    },
    toggleIsOrdinaria: function(){
        this.mainteneance.isOrdinaria=!this.mainteneance.isOrdinaria;
        if(this.mainteneance.isOrdinaria){
            this.mainteneance.isSmart=!this.mainteneance.isOrdinaria;
            this.mainteneance.isPerfettiva=!this.mainteneance.isOrdinaria;
        }
    },
    toggleIsPerfettiva: function(){
        this.mainteneance.isPerfettiva=!this.mainteneance.isPerfettiva;
        if(this.mainteneance.isPerfettiva){
            this.mainteneance.isSmart=!this.mainteneance.isPerfettiva;
            this.mainteneance.isOrdinaria=!this.mainteneance.isPerfettiva;
        }
    }
  }
};
</script>
<style>
</style>
