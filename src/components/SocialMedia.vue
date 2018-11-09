<template>
    <div class="uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-1">
            <label class="uk-form-label">Seleziona le pagine social da creare</label>             
            <button type="button" v-bind:class="[ socialmedia.isGoogle ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsGoogle()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: google"></span> 
                Google</button>
            <button type="button" v-bind:class="[ socialmedia.isFacebook ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsFacebook()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: facebook"></span> 
                Facebook</button>
            <button type="button" v-bind:class="[ socialmedia.isInstagram ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsInstagram()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: instagram"></span> 
                Instagram</button>
            <button type="button" v-bind:class="[ socialmedia.isYoutube ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsYoutube()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: youtube"></span> 
                Youtube</button>
            <button type="button" v-bind:class="[ socialmedia.isLinkedin ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsLinkedin()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: linkedin"></span> 
                LinkedIn</button>
            <button type="button" v-bind:class="[ socialmedia.isPinterest ? 'uk-button-primary': 'uk-button-default' ]" v-on:click="toggleIsPinterest()" class="uk-button uk-button-small uk-margin-top uk-margin-right">
                <span uk-icon="icon: pinterest"></span> 
                Pinterest</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "SocialMedia",
  props: {
    input: Object,
        progetto:Object
  },
  data: function() {
    return {
      socialmedia: this.input
    };
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toggleIsGoogle: function(){
        this.socialmedia.isGoogle=!this.socialmedia.isGoogle;
    },
    toggleIsFacebook: function(){
        this.socialmedia.isFacebook=!this.socialmedia.isFacebook;
    },
    toggleIsLinkedin: function(){
        this.socialmedia.isLinkedin=!this.socialmedia.isLinkedin;
    },
    toggleIsInstagram: function(){
        this.socialmedia.isInstagram=!this.socialmedia.isInstagram;
    },
    toggleIsYoutube: function(){
        this.socialmedia.isYoutube=!this.socialmedia.isYoutube;
    },
    toggleIsPinterest: function(){
        this.socialmedia.isPinterest=!this.socialmedia.isPinterest;
    }
  }
};
</script>
<style>
</style>
