<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Moduli (299€/cad)</label>             
            <button type="button" v-bind:class="[ ordine.ecommerce.isImportExport ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsImportExport()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ordine.ecommerce.isImportExport" uk-icon="icon: plus-circle"></span> 
                <span v-if="ordine.ecommerce.isImportExport" uk-icon="icon: minus-circle"></span> 
                Import/Export</button>
            <button type="button" v-bind:class="[ ordine.ecommerce.isBookings ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsBookings()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ordine.ecommerce.isBookings" uk-icon="icon: plus-circle"></span> 
                <span v-if="ordine.ecommerce.isBookings" uk-icon="icon: minus-circle"></span> 
                Prenotazioni</button>
            <button type="button" v-bind:class="[ ordine.ecommerce.isEvents ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsEventi()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ordine.ecommerce.isEvents" uk-icon="icon: plus-circle"></span> 
                <span v-if="ordine.ecommerce.isEvents" uk-icon="icon: minus-circle"></span> 
                Eventi</button>
            <button type="button" v-bind:class="[ ordine.ecommerce.isAmazon ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsAmazon()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ordine.ecommerce.isAmazon" uk-icon="icon: plus-circle"></span> 
                <span v-if="ordine.ecommerce.isAmazon" uk-icon="icon: minus-circle"></span> 
                Amazon</button>
            <button type="button" v-bind:class="[ ordine.ecommerce.isEbay ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsEbay()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ordine.ecommerce.isEbay" uk-icon="icon: plus-circle"></span> 
                <span v-if="ordine.ecommerce.isEbay" uk-icon="icon: minus-circle"></span> 
                Ebay</button>
        </div>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Articoli comprese le variazioni
            <input class="uk-range" type="range" v-model="ordine.ecommerce.products.qty" value="0" min="0" max="200" step="10">  <strong>{{ordine.ecommerce.products.qty}}</strong></label>            
        </div>
        <div class="uk-width-1-1">
            <p>Inserimento articoli (9,90€/articolo)
            <button style="vertical-align: bottom;" type="button" v-bind:class="[ ordine.ecommerce.isDataEntry ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsDataEntry()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!ordine.ecommerce.isDataEntry" uk-icon="icon: check"></span> 
                <span v-if="ordine.ecommerce.isDataEntry" uk-icon="icon: close"></span> 
                Si, fa Zepfiro</button>          </p>
        </div>
    </div>
</template>
<script>
export default {
  name: "Ecommerce",
  props: {
    ordine: Object
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toggleIsImportExport: function(){
        this.ordine.ecommerce.isImportExport=!this.ordine.ecommerce.isImportExport;
        this.calculateModules(this.ordine.ecommerce.isImportExport);
    },
    toggleIsBookings: function(){
        this.ordine.ecommerce.isBookings=!this.ordine.ecommerce.isBookings;
        this.calculateModules(this.ordine.ecommerce.isBookings);
    },
    toggleIsEventi: function(){
        this.ordine.ecommerce.isEvents=!this.ordine.ecommerce.isEvents;
        this.calculateModules(this.ordine.ecommerce.isEvents);
    },
    toggleIsAmazon: function(){
        this.ordine.ecommerce.isAmazon=!this.ordine.ecommerce.isAmazon;
        this.calculateModules(this.ordine.ecommerce.isAmazon);
        this.calculateMarketplaces(this.ordine.ecommerce.isAmazon);
    },
    toggleIsEbay: function(){
        this.ordine.ecommerce.isEbay=!this.ordine.ecommerce.isEbay;
        this.calculateModules(this.ordine.ecommerce.isEbay);
        this.calculateMarketplaces(this.ordine.ecommerce.isEbay);
    },
    toggleIsDataEntry: function(){
        this.ordine.ecommerce.isDataEntry=!this.ordine.ecommerce.isDataEntry;
    },
    calculateModules: function(check){
        if(check){
            this.ordine.ecommerce.modules.qty++;
        }else{
            if(this.ordine.ecommerce.modules.qty>0)
                this.ordine.ecommerce.modules.qty--;
        }
    },
    calculateMarketplaces: function(check){
        if(check){
            this.ordine.ecommerce.marketplaces.qty++;
        }else{
            if(this.ordine.ecommerce.marketplaces.qty>0)
                this.ordine.ecommerce.marketplaces.qty--;
        }
    }
  }
};
</script>
<style>
</style>
