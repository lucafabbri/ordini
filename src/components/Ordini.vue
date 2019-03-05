<template>
    <div>
        <div class="uk-background-secondary uk-padding" uk-sticky>
            <img src="https://www.higrow.it/images/higrow-logo-1024-light.png" style="width:150px; max-width:150px;">
            <router-link :to="{ name: 'Ordine', params:{id:'nuovo'}}" class="uk-button uk-button-default"><span uk-icon="icon: plus"></span>  Nuovo ordine/preventivo</router-link>
        </div>
        <div class="uk-padding">
        <ul class="uk-list uk-list-divider">
            <li v-bind:key="id" v-for="ordine in orderedOrdini">
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
import lodash from "lodash";
export default {
  name: "Ordini",
    props: ['auth','authenticated'],
    beforeMount:function(){
      if(!this.authenticated){
        router.push('/');
      }
    },
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
  mounted: async function() {
      await this.getOrdini();
      this.$parent.title = 'Elenco ordini';
  },
  computed: {
    orderedOrdini: function () {
        return lodash.orderBy(this.ordini, 'id','desc')
    }
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getOrdini: function() {
      axios
        .get("https://api.ordini.zepfiro.com/ordini")
        .then(function(response) {
            this.ordini = response.data;
        }.bind(this))
        .catch(function(error) {});
    },
    eliminaOrdine: function(ordine){
        axios
        .delete("https://api.ordini.zepfiro.com/ordini/"+ordine.id)
        .then(function(response){
            this.getOrdini();
        }.bind(this))
        .catch(function(error) {});
    }
  }
}
</script>
<style>

</style>
