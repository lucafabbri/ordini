<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <div v-if="progetto.isWeb" class="uk-margin-large">
                <div class="uk-margin-large">
                    <label class="uk-form-label">Numero di pagine principali (199€/pagina)
                    <input class="uk-range" type="range" v-model="webdesign.pages.qty" value="3" min="3" max="20" step="1"> <strong>{{webdesign.pages.qty}}</strong></label>
                </div>
                <div class="uk-margin-large">
                    <label class="uk-form-label">Numero di pagine secondarie  (99€/contenuto) (portfolio, servizi, progetti, case studies, prodotti)
                    <input class="uk-range" type="range" v-model="webdesign.contents.qty" value="3" min="3" max="100" step="1"> <strong>{{webdesign.contents.qty}}</strong></label>
                </div>
                <div class="uk-margin-large" uk-grid>
                    <div class="uk-width-1-1">
                        <label class="uk-form-label">Moduli aggiuntivi (199€/modulo)</label>
                        <div>
                            <button type="button" v-bind:class="[ webdesign.hasBlog ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsBlog()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                            <span v-if="!webdesign.hasBlog" uk-icon="icon: plus-circle"></span> 
                            <span v-if="webdesign.hasBlog" uk-icon="icon: minus-circle"></span> 
                            Blog</button>
                            <button type="button" v-bind:class="[ webdesign.hasPortfolio ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsPortfolio()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                            <span v-if="!webdesign.hasPortfolio" uk-icon="icon: plus-circle"></span> 
                            <span v-if="webdesign.hasPortfolio" uk-icon="icon: minus-circle"></span> 
                            Portfolio</button>
                            <button type="button" v-bind:class="[ webdesign.hasJob ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsJob()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                            <span v-if="!webdesign.hasJob" uk-icon="icon: plus-circle"></span> 
                            <span v-if="webdesign.hasJob" uk-icon="icon: minus-circle"></span> 
                            Lavora con noi</button>
                            <button type="button" v-bind:class="[ webdesign.hasEvents ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsEvents()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                            <span v-if="!webdesign.hasEvents" uk-icon="icon: plus-circle"></span> 
                            <span v-if="webdesign.hasEvents" uk-icon="icon: minus-circle"></span> 
                            Eventi</button>
                            <button type="button" v-bind:class="[ webdesign.hasNewsletter ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsNewsletter()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                            <span v-if="!webdesign.hasNewsletter" uk-icon="icon: plus-circle"></span> 
                            <span v-if="webdesign.hasNewsletter" uk-icon="icon: minus-circle"></span> 
                            Newsletter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"WebDesign",
    props:{
        input:Object,
        progetto:Object,
        pricelist:Object
    },
    data:function(){
        return {
            webdesign: this.input,
            listino: this.pricelist
        }
    },
    methods:{
        formatPrice: function(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        toggleIsBlog: function(){
            this.webdesign.hasBlog=!this.webdesign.hasBlog;
        },
        toggleIsPortfolio: function(){
            this.webdesign.hasPortfolio=!this.webdesign.hasPortfolio;
        },
        toggleIsJob: function(){
            this.webdesign.hasJob=!this.webdesign.hasJob;
        },
        toggleIsEvents: function(){
            this.webdesign.hasEvents=!this.webdesign.hasEvents;
        },
        toggleIsNewsletter: function(){
            this.webdesign.hasNewsletter=!this.webdesign.hasNewsletter;
        }
    }
}
</script>
<style>
</style>
