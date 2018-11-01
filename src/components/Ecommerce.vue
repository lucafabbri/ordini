<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Moduli (299€/cad)</label>             
            <button type="button" v-bind:class="[ ecommerce.isImportExport ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsImportExport()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ecommerce.isImportExport" uk-icon="icon: plus-circle"></span> 
                <span v-if="ecommerce.isImportExport" uk-icon="icon: minus-circle"></span> 
                Import/Export</button>
            <button type="button" v-bind:class="[ ecommerce.isBookings ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsBookings()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ecommerce.isBookings" uk-icon="icon: plus-circle"></span> 
                <span v-if="ecommerce.isBookings" uk-icon="icon: minus-circle"></span> 
                Prenotazioni</button>
            <button type="button" v-bind:class="[ ecommerce.isEvents ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsEventi()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ecommerce.isEvents" uk-icon="icon: plus-circle"></span> 
                <span v-if="ecommerce.isEvents" uk-icon="icon: minus-circle"></span> 
                Eventi</button>
            <button type="button" v-bind:class="[ ecommerce.isAmazon ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsAmazon()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ecommerce.isAmazon" uk-icon="icon: plus-circle"></span> 
                <span v-if="ecommerce.isAmazon" uk-icon="icon: minus-circle"></span> 
                Amazon</button>
            <button type="button" v-bind:class="[ ecommerce.isEbay ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsEbay()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ecommerce.isEbay" uk-icon="icon: plus-circle"></span> 
                <span v-if="ecommerce.isEbay" uk-icon="icon: minus-circle"></span> 
                Ebay</button>
        </div>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Articoli comprese le variazioni
            <input class="uk-range" type="range" v-model="ecommerce.products" value="0" min="0" max="200" step="10">  <strong>{{ecommerce.products}}</strong></label>            
        </div>
        <div class="uk-width-1-1">
            <p>Inserimento articoli (9,90€/articolo)
            <button style="vertical-align: bottom;" type="button" v-bind:class="[ ecommerce.isDataEntry ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsDataEntry()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ecommerce.isDataEntry" uk-icon="icon: check"></span> 
                <span v-if="ecommerce.isDataEntry" uk-icon="icon: close"></span> 
                Si, fa Zepfiro</button>          </p>
        </div>
    </div>
</template>
<script>
export default {
  name: "Ecommerce",
  props: {
    input: Object,
        progetto:Object
  },
  data: function() {
    return {
      ecommerce: this.input
    };
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toggleIsImportExport: function(){
        this.ecommerce.isImportExport=!this.ecommerce.isImportExport;
        this.calculateModules(this.ecommerce.isImportExport);
    },
    toggleIsBookings: function(){
        this.ecommerce.isBookings=!this.ecommerce.isBookings;
        this.calculateModules(this.ecommerce.isBookings);
    },
    toggleIsEventi: function(){
        this.ecommerce.isEvents=!this.ecommerce.isEvents;
        this.calculateModules(this.ecommerce.isEvents);
    },
    toggleIsAmazon: function(){
        this.ecommerce.isAmazon=!this.ecommerce.isAmazon;
        this.calculateModules(this.ecommerce.isAmazon);
    },
    toggleIsEbay: function(){
        this.ecommerce.isEbay=!this.ecommerce.isEbay;
        this.calculateModules(this.ecommerce.isEbay);
    },
    toggleIsDataEntry: function(){
        this.ecommerce.isDataEntry=!this.ecommerce.isDataEntry;
    },
    calculateModules: function(check){
        if(check){
            this.ecommerce.modules++;
        }else{
            if(this.ecommerce.modules>0)
                this.ecommerce.modules--;
        }
    }
  }
};
</script>
<style>
</style>
