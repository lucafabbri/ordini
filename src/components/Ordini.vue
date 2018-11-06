<template>
    <div>
        <div class="uk-background-secondary uk-padding" uk-sticky>
            <router-link :to="{ name: 'Ordine'}" class="uk-button uk-button-default"><span uk-icon="icon: plus"></span>  Nuovo ordine/preventivo</router-link>
        </div>
        <div class="uk-padding">
        <ul class="uk-list uk-list-divider">
            <li v-for="ordine in ordini">
                <h4 v-if="ordine.ordine.progetto!=undefined">{{ordine.ordine.progetto.titolo}}</h4>
                <p v-if="ordine.ordine.progetto!=undefined">{{ordine.ordine.progetto.descrizione}}</p>
                <ul v-if="!ordine.deleting" class="uk-iconnav">
                    <li><router-link :to="{ name: 'Ordine', params: { id: ordine.id }}" uk-icon="icon: file-edit"> Modifica</router-link></li>
                    <li><router-link :to="{ name: 'RiepilogoOrdine', params: { id: ordine.id }}" uk-icon="icon: file-text"> Riepilogo</router-link></li>
                    <li><a v-on:click="eliminaOrdine(ordine)" uk-icon="icon: trash"> Elimina</a></li>
                </ul>
                <div v-else uk-spinner></div>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios/dist/axios";
export default {
  name: "Ordini",
  components: {
    axios,
  },
  data: function(){
      return{
        ordini: [{
            id:0,
            ordine:{progetto:{titolo:"loading"}}
        }]
      };
  },
  created: async function() {
      await this.getOrdini();
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getOrdini: function() {
      const vm = this;
      axios
        .get("https://api.ordini.zepfiro.com/ordini")
        .then(function(response) {
            console.log(response.data);
            vm.ordini = response.data
        })
        .catch(function(error) {});
    },
    eliminaOrdine: function(ordine){
      const vm = this;
        axios
        .delete("https://api.ordini.zepfiro.com/ordini/"+ordine.id)
        .then(function(response){
            vm.getOrdini();
        })
        .catch(function(error) {});
    }
  }
}
</script>
<style>

</style>
