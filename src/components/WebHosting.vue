<template>
    
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <div v-if="progetto.isDomain">
                <label class="uk-form-label">Nome domini separati da virgola</label>
                <input class="uk-input" v-model="webhosting.domain.names" type="text" placeholder="Nome dominio" pattern="^\s*(?:(?:\w+(?:-+\w+)*\.)+[a-z]+)\s*(?:,\s*(?:(?:\w+(?:-+\w+)*\.)+[a-z]+)\s*)*$">
            </div>
        </div>
        <div v-if="progetto.isHosting && !progetto.isExchange" class="uk-width-1-1">
            <button type="button" v-bind:class="[ webhosting.hosting.mailbox.isCaselle ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsCaselle()" class="uk-button uk-margin-top uk-margin-right">
                <span v-if="!webhosting.hosting.mailbox.isCaselle" uk-icon="icon: plus-circle"></span> 
                <span v-if="webhosting.hosting.mailbox.isCaselle" uk-icon="icon: minus-circle"></span> 
                Caselle di posta aggiuntive <small>da 9,90€/anno a casella</small>
            </button>
            <div v-if="webhosting.hosting.mailbox.isCaselle" class="uk-margin-small-top">
                <label class="uk-form-label">Specifica il numero di caselle di posta 
                    <input class="uk-range" type="range" v-model="webhosting.hosting.mailbox.qty" value="0" min="0" max="15" step="1">  <strong>{{webhosting.hosting.mailbox.qty}}</strong></label>
            </div>
        </div>
        <div class="uk-width-1-1">
            <div v-if="progetto.isExchange" class="uk-margin-small-top">
                <label class="uk-form-label">[Microsoft Exchange] - Specifica il numero di utenti
                    <input class="uk-range" type="range" v-model="webhosting.exchange.mailuser.qty" value="0" min="0" max="15" step="1">  <strong>{{webhosting.exchange.mailuser.qty}}</strong></label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"WebHosting",
    props:{
        input:Object,
        progetto:Object
    },
    data:function(){
        return {
            webhosting: this.input
        }
    },
    methods:{
        formatPrice: function(value) {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        toggleIsCaselle: function(){
            this.webhosting.hosting.mailbox.isCaselle = !this.webhosting.hosting.mailbox.isCaselle;
            if(this.webhosting.hosting.mailbox.isCaselle&&this.progetto.isExchange){
                this.progetto.isExchange=false;
            }
        },
    }
}
</script>
<style>
</style>
