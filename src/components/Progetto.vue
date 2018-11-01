
</<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Titolo progetto</label>
            <input class="uk-input" type="text" v-model="progetto.titolo" placeholder="Titolo progetto">
        </div>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Breve descrizione</label>
            <textarea class="uk-textarea" rows="4" maxlength="600" v-model="progetto.descrizione"></textarea>
        </div>
        <div class="uk-width-1-1">
            <div>
                <button type="button" v-bind:class="[ progetto.isDomain ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsDomain()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isDomain" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isDomain" uk-icon="icon: minus-circle"></span> 
                Dominio <small>da 9,90 €/Anno</small></button>
                <button type="button" v-bind:class="[ progetto.isHosting ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsHosting()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isHosting" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isHosting" uk-icon="icon: minus-circle"></span> 
                Hosting <small>da 39,90 €/Anno</small></button>
                <button type="button" v-bind:class="[ progetto.isExchange ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsExchange()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isExchange" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isExchange" uk-icon="icon: minus-circle"></span> 
                Exchange <small>da 299€</small></button>
                <button type="button" v-bind:class="[ progetto.isWeb ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsWeb()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isWeb" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isWeb" uk-icon="icon: minus-circle"></span> 
                Sito web <small>da 599€</small></button>
                <button type="button" v-bind:class="[ progetto.isEcommerce ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsEcommerce()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isEcommerce" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isEcommerce" uk-icon="icon: minus-circle"></span> 
                Ecommerce <small>da 799€</small></button>
                <button type="button" v-bind:class="[ progetto.isSEO ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsSEO()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isSEO" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isSEO" uk-icon="icon: minus-circle"></span> 
                SEO <small>da 299€</small></button>
                <button type="button" v-bind:class="[ progetto.isSocial ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsSocial()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isSocial" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isSocial" uk-icon="icon: minus-circle"></span> 
                Social <small>da 99€</small></button>
                <button type="button" v-bind:class="[ progetto.isGraphics ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsGraphics()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isGraphics" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isGraphics" uk-icon="icon: minus-circle"></span> 
                Logo <small>da 299€</small></button>
                <button type="button" v-bind:class="[ progetto.isMainteneance ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsMainteneance()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span v-if="!progetto.isMainteneance" uk-icon="icon: plus-circle"></span> 
                <span v-if="progetto.isMainteneance" uk-icon="icon: minus-circle"></span> 
                Manutenzione <small>da 499€/Anno</small></button>
            </div>
        </div>
        <div v-if="progetto.isWeb || progetto.isPrivacy" class="uk-width-1-2">
            <label>
                <input class="uk-checkbox" type="checkbox" id="isMultilanguage" v-model="progetto.isMultilanguage"> Lingue aggiuntive 
            <input v-if="progetto.isMultilanguage" class="uk-range" type="range" v-model="progetto.languages.qty" value="0" min="0" max="5" step="1">  <strong>{{progetto.languages.qty}}</strong></label>
        </div>
        <div v-if="progetto.isWeb || progetto.isMainteneance"  class="uk-width-1-2">
            <label class="uk-form-label"><input class="uk-checkbox" type="checkbox" id="isPrivacy" v-model="progetto.isPrivacy"> Privacy & Cookie Policy by Iubenda</label>
        </div>
    </div>
</template>
<script>
export default {
    name:"Progetto",
    props:{
        input:Object
    },
    data:function(){
        return {
            progetto: this.input
        }
    },
    methods:{
        formatPrice: function(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        toggleIsDomain: function(){
            this.progetto.isDomain=!this.progetto.isDomain;
        },
        toggleIsHosting: function(){
            if(this.progetto.isEcommerce) return;
            this.progetto.isHosting=!this.progetto.isHosting;
        },
        toggleIsExchange: function(){
            this.progetto.isExchange=!this.progetto.isExchange;
        },
        toggleIsWeb: function(){
            if(this.progetto.isEcommerce) return;
            this.progetto.isWeb=!this.progetto.isWeb;
        },
        toggleIsEcommerce: function(){
            this.progetto.isEcommerce=!this.progetto.isEcommerce;
            if(this.progetto.isEcommerce){
                this.progetto.isHosting=true;
                this.progetto.isWeb=true;
            }
        },
        toggleIsSEO: function(){
            this.progetto.isSEO=!this.progetto.isSEO;
        },
        toggleIsSocial: function(){
            this.progetto.isSocial=!this.progetto.isSocial;
        },
        toggleIsGraphics: function(){
            this.progetto.isGraphics=!this.progetto.isGraphics;
        },
        toggleIsMainteneance: function(){
            this.progetto.isMainteneance=!this.progetto.isMainteneance;
        }
    }
}
</script>
<style>

</style>


