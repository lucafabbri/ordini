<template>
    <div>
        <div class="uk-background-secondary uk-padding" uk-sticky>
            <img src="https://www.zepfiro.com/wp-content/uploads/2018/08/zepfiro-logo-or-or-white.png" style="width:150px; max-width:150px;">
            <router-link :to="{ name: 'Ordine', params:{id:'nuovo'}}" class="uk-button uk-button-default"><span uk-icon="icon: plus"></span>  Nuovo ordine/preventivo</router-link>
        </div>
        <div class="uk-padding">
        <ul class="uk-list uk-list-divider">
            <li v-for="ordine in ordini">
                <div uk-grid>
                    <div class="uk-width-auto">
                        <h4>#{{ordine.id}} </h4>
                    </div>    
                    <div class="uk-width-expand">
                        <h4 v-if="ordine.ordine.progetto!=undefined">[{{ordine.ordine.fileid}}] - {{ordine.ordine.progetto.titolo}}</h4>
                        <p v-if="ordine.ordine.progetto!=undefined">{{ordine.ordine.progetto.descrizione}}</p>
                    </div>
                    <div class="uk-width-auto">
                        <ul v-if="!ordine.deleting" class="uk-iconnav">
                            <li><router-link :to="{ name: 'Ordine', params: { id: ordine.id }}" uk-icon="icon: file-edit"> Modifica</router-link></li>
                            <li><router-link :to="{ name: 'RiepilogoOrdine', params: { id: ordine.id }}" uk-icon="icon: file-text"> Riepilogo</router-link></li>
                            <li><a v-on:click="eliminaOrdine(ordine)" uk-icon="icon: trash"> Elimina</a></li>
                        </ul>
                        <div v-else uk-spinner></div>
                    </div>
                </div>
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
      this.$parent.title = 'Elenco ordini';
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
