<template>
    <form class="uk-form-stacked">
            <div class="uk-flex uk-flex-right">
                <small>
                    <span v-if="ordine.anagrafica.azienda">{{ordine.anagrafica.azienda}}</span>
                    <span v-if="ordine.anagrafica.referente && ordine.anagrafica.azienda">, </span>
                    <span v-if="ordine.anagrafica.referente">{{ordine.anagrafica.referente}}</span>
                    <span v-if="ordine.anagrafica.telefono || ordine.anagrafica.email"> (</span>
                    <span v-if="ordine.anagrafica.telefono">t: {{ordine.anagrafica.telefono}}</span>
                    <span v-if="ordine.anagrafica.telefono && ordine.anagrafica.email">, </span>
                    <span v-if="ordine.anagrafica.email">e: {{ordine.anagrafica.email}}</span>
                    <span v-if="ordine.anagrafica.telefono || ordine.anagrafica.email">)</span><br>
                </small>
            </div>
            <div>
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Anagrafica cliente<em>*</em></h2>
                    <Anagrafica class="uk-accordion-content" :input="ordine.anagrafica" />
                </div>
            </div>
            <div>
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Informazioni sul progetto<em>*</em></h2>
                    <Progetto class="uk-accordion-content" :input="ordine.progetto" />
                </div>
            </div>
            <div v-if="ordine.progetto.isDomain || ordine.progetto.isHosting || ordine.progetto.isExchange">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Hosting e Domini</h2>
                    <WebHosting class="uk-accordion-content" :input="ordine.webhosting" :progetto="ordine.progetto" />
                </div>
            </div>
            <div v-if="ordine.progetto.isWeb">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Sito web </h2>
                    <WebDesign class="uk-accordion-content" :input="ordine.webdesign" :progetto="ordine.progetto" />
                </div>
            </div>
            <div v-if="ordine.progetto.isEcommerce">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">E-commerce</h2>
                    <Ecommerce class="uk-accordion-content" :input="ordine.ecommerce" :progetto="ordine.progetto" />
                </div>
            </div>
            <div v-if="ordine.progetto.isSEO">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">SEO</h2>
                    <Seo class="uk-accordion-content" :input="ordine.seo" :progetto="ordine.progetto" />
                </div>
            </div>
            <div v-if="ordine.progetto.isSocial">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Social Media</h2>
                    <SocialMedia class="uk-accordion-content" :input="ordine.socialmedia" :progetto="ordine.progetto" />
                </div>
            </div>
            <div v-if="ordine.progetto.isMainteneance"> 
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Manutenzione </h2>
                    <Mainteneance class="uk-accordion-content" :input="ordine.mainteneance" :progetto="ordine.progetto" />
                </div>
            </div>
            <div class="uk-flex uk-flex-left uk-margin-medium-top">
                <p class="uk-text-lead">
                    <strong v-if="total||totalperyear">Totale: </strong>
                    <span v-if="total">{{formatPrice(total)}}€</span>
                    <span v-if="total&&totalperyear"> + </span>
                    <span v-if="totalperyear">{{formatPrice(totalperyear)}}€/anno</span>
                    <span v-if="(total||totalperyear)&&seo_totalpermonth"> + </span>
                    <span v-if="seo_totalpermonth">Seo: {{formatPrice(seo_totalpermonth)}}€/mese</span>
                    <br>
                    <strong v-if="formulaZero>0">Offerta formula zero: </strong>
                    <span v-if="formulaZero>0">{{formatPrice(formulaZero)}}€/mese <small> ({{formatPrice(formulaZero*12)}}€/anno)</small></span>
                    <span v-if="(formulaZero>0)&&seo_totalpermonth"> + </span>
                    <span v-if="(formulaZero>0)&&seo_totalpermonth">Seo: {{formatPrice(seo_totalpermonth)}}€/mese</span>
                </p>
            </div>
            <div class="uk-flex uk-flex-left uk-margin-medium-top">
                <p>
                  <button v-if="total||totalperyear" type="button" class="uk-button uk-button-primary" v-on:click="saveOrder()"><span uk-icon="icon: push"></span>  Salva preventivo</button>
                </p>
            </div>
        </form>
</template>

<script>
import Anagrafica from "./Anagrafica.vue";
import Progetto from "./Progetto.vue";
import WebHosting from "./WebHosting.vue";
import WebDesign from "./WebDesign.vue";
import Ecommerce from "./Ecommerce.vue";
import Seo from "./Seo.vue";
import SocialMedia from "./SocialMedia.vue";
import Graphics from "./Graphics.vue";
import Mainteneance from "./Mainteneance.vue";
import axios from "axios/dist/axios";

export default {
  name: "Ordine",
  components: {
    Anagrafica,
    Progetto,
    WebHosting,
    WebDesign,
    Ecommerce,
    Seo,
    SocialMedia,
    Graphics,
    Mainteneance,
    axios
  },
  data: function() {
    return {
      pricelist: {
        domain: { price: 9.9, recurrent: true, frequency: "year" },
        hosting: {
          host: { price: 29.9, recurrent: true, frequency: "year" },
          multihost: { price: 49.9, recurrent: true, frequency: "year" },
          mailbox: { price: 9.9, recurrent: true, frequency: "year" }
        },
        exchange: {
          setup: { price: 299, recurrent: false, frequency: "" },
          mailuser: { price: 40.8, recurrent: true, frequency: "year" }
        },
        webdesign: {
          setup: { price: 599, recurrent: false, frequency: "" },
          language: { price: 199, recurrent: false, frequency: "" },
          module: { price: 199, recurrent: false, frequency: "" },
          page: { price: 199, recurrent: false, frequency: "" },
          content: { price: 99, recurrent: false, frequency: "" },
          translation: { price: 39, recurrent: false, frequency: "" }
        },
        privacy: {
          setup: { price: 49, recurrent: false, frequency: "" },
          iubenda: { price: 19, recurrent: true, frequency: "year" }
        },
        ecommerce: {
          setup: { price: 799, recurrent: false, frequency: "" },
          module: { price: 299, recurrent: false, frequency: "" },
          marketplace: { price: 499, recurrent: false, frequency: "" },
          perproduct: { price: 3.9, recurrent: false, frequency: "" },
          dataentry: { price: 9.9, recurrent: false, frequency: "" }
        },
        seo: {
          setup: { price: 299, recurrent: false, frequency: "" },
          keyword: { price: 50, recurrent: true, frequency: "month" }
        },
        socialmedia: {
          setup: { price: 99, recurrent: false, frequency: "" },
          platform: { price: 99, recurrent: true, frequency: "" },
          editorial: { price: 99, recurrent: true, frequency: "month" }
        },
        graphics: {
          logo: {
            setup: { price: 299, recurrent: false, frequency: "" },
            revision: { price: 99, recurrent: false, frequency: "" }
          },
          copy: { price: 69, recurrent: false, frequency: "" },
          stockphoto: { price: 69, recurrent: false, frequency: "" },
          shooting: {
            setup: { price: 150, recurrent: false, frequency: "" },
            product: { price: 15, recurrent: false, frequency: "" }
          }
        },
        mainteneance: {
          web: {
            base: { price: 499, recurrent: true, frequency: "year" },
            pro: { price: 999, recurrent: true, frequency: "year" }
          },
          ecommerce: {
            base: { price: 999, recurrent: true, frequency: "year" },
            pro: { price: 1699, recurrent: true, frequency: "year" }
          }
        }
      },
      ordine:{
      anagrafica: {
        azienda: "",
        referente: "",
        telefono: "",
        email: ""
      },
      progetto: {
        titolo: "",
        descrizione: "",
        isMultilanguage: false,
        languages: { qty: 0 },
        isDomain: false,
        isHosting: false,
        isExchange: false,
        isWeb: false,
        isPrivacy: false,
        isEcommerce: false,
        isSEO: false,
        isSocial: false,
        isGraphics: false,
        isMainteneance: false
      },
      webhosting: {
        domain: {
          names: ""
        },
        hosting: {
          mailbox: { isCaselle: false, qty: 0 }
        },
        exchange: {
          mailuser: { qty: 0 }
        }
      },
      webdesign: {
        hasBlog: false,
        hasPortfolio: false,
        hasJob: false,
        hasEvents: false,
        hasNewsletter: false,
        pages: { qty: 4 },
        contents: { qty: 0 }
      },
      ecommerce: {
        isImportExport: false,
        isBookings: false,
        isEvents: false,
        isAmazon: false,
        isEbay: false,
        isDataEntry: false,
        modules: 0,
        marketplaces: 0,
        products: 0
      },
      seo: {
        keywords: 0
      },
      socialmedia: {
        isGoogle: false,
        isFacebook: false,
        isLinkedin: false,
        isInstagram: false,
        isPinterest: false
      },
      mainteneance: {
        isOrdinaria: false,
        isPerfettiva: false
      }
      }
    };
  },
  watch: {
    progetto: {
      isExchange: function(val) {
        if (this.ordine.webhosting.hosting.mailbox.isCaselle && val) {
          this.ordine.webhosting.hosting.mailbox.isCaselle = !val;
        }
      }
    },
    webhosting: {
      hosting: {
        mailbox: {
          isCaselle: function(val) {
            if (this.ordine.progetto.isExchange && val) {
              this.ordine.progetto.isExchange = !val;
            }
          }
        }
      }
    }
  },
  computed: {
    webhosting_domain_qty: function() {
      if (this.ordine.webhosting.domain.names == "") {
        return 0;
      }
      return this.ordine.webhosting.domain.names.split(",").length;
    },
    webhosting_domain_total: function() {
      return 0;
    },
    webhosting_domain_totalperyear: function() {
      return this.ordine.progetto.isDomain
        ? this.pricelist.domain.price * this.webhosting_domain_qty
        : 0;
    },
    webhosting_hosting_host_total: function() {
      return this.ordine.progetto.isHosting
        ? this.webhosting_domain_qty > 1
          ? this.pricelist.hosting.multihost.price
          : this.pricelist.hosting.host.price
        : 0;
    },
    webhosting_hosting_host_totalperyear: function() {
      return 0;
    },
    webhosting_hosting_mailbox_totalperyear: function() {
      return this.ordine.webhosting.hosting.mailbox.isCaselle
        ? this.pricelist.hosting.mailbox.price *
            parseInt(this.ordine.webhosting.hosting.mailbox.qty)
        : 0;
    },
    webhosting_hosting_mailbox_total: function() {
      return 0;
    },
    webhosting_hosting_total: function() {
      return this.ordine.progetto.isHosting
        ? this.webhosting_hosting_host_total +
            this.webhosting_hosting_mailbox_total
        : 0;
    },
    webhosting_hosting_totalperyear: function() {
      return this.ordine.progetto.isHosting
        ? this.webhosting_hosting_host_totalperyear +
            this.webhosting_hosting_mailbox_totalperyear
        : 0;
    },
    webhosting_exchange_setup_total: function() {
      return this.ordine.progetto.isExchange ? this.pricelist.exchange.setup.price : 0;
    },
    webhosting_exchange_setup_totalperyear: function() {
      return 0;
    },
    webhosting_exchange_mailuser_totalperyear: function() {
      return this.ordine.progetto.isExchange
        ? this.pricelist.exchange.mailuser.price *
            parseInt(this.ordine.webhosting.exchange.mailuser.qty)
        : 0;
    },
    webhosting_exchange_mailuser_total: function() {
      return 0;
    },
    webhosting_exchange_total: function() {
      return this.ordine.progetto.isExchange
        ? this.webhosting_exchange_setup_total +
            this.webhosting_exchange_mailuser_total
        : 0;
    },
    webhosting_exchange_totalperyear: function() {
      return this.ordine.progetto.isExchange
        ? this.webhosting_exchange_setup_totalperyear +
            this.webhosting_exchange_mailuser_totalperyear
        : 0;
    },
    webhosting_total: function() {
      return (
        this.webhosting_domain_total +
        this.webhosting_hosting_total +
        this.webhosting_exchange_total
      );
    },
    webhosting_totalperyear: function() {
      return (
        this.webhosting_domain_totalperyear +
        this.webhosting_hosting_totalperyear +
        this.webhosting_exchange_totalperyear
      );
    },
    webdesign_setup_total: function() {
      return this.ordine.progetto.isWeb
        ? this.pricelist.webdesign.setup.price +
            (this.ordine.progetto.isMultilanguage
              ? parseInt(this.ordine.progetto.languages.qty) *
                this.pricelist.webdesign.language.price
              : 0)
        : 0;
    },
    webdesign_setup_totalperyear: function() {
      return 0;
    },
    webdesign_modules_qty: function() {
      return (
        (this.ordine.webdesign.hasBlog ? 1 : 0) +
        (this.ordine.webdesign.hasPortfolio ? 1 : 0) +
        (this.ordine.webdesign.hasJob ? 1 : 0) +
        (this.ordine.webdesign.hasEvents ? 1 : 0) +
        (this.ordine.webdesign.hasNewsletter ? 1 : 0)
      );
    },
    webdesign_modules_total: function() {
      return this.ordine.progetto.isWeb
        ? this.pricelist.webdesign.module.price * this.webdesign_modules_qty
        : 0;
    },
    webdesign_modules_totalperyear: function() {
      return 0;
    },
    webdesign_pages_total: function() {
      return this.ordine.progetto.isWeb
        ? parseInt(this.ordine.webdesign.pages.qty) > 4
          ? (parseInt(this.ordine.webdesign.pages.qty) - 4) *
            this.pricelist.webdesign.page.price
          : 0
        : 0;
    },
    webdesign_pages_totalperyear: function() {
      return 0;
    },
    webdesign_contents_total: function() {
      return this.ordine.progetto.isWeb
        ? parseInt(this.ordine.webdesign.contents.qty) *
            this.pricelist.webdesign.content.price
        : 0;
    },
    webdesign_contents_totalperyear: function() {
      return 0;
    },
    webdesign_translations_qty: function() {
      return this.ordine.progetto.isMultilanguage
        ? parseInt(this.ordine.progetto.languages.qty) *
            (parseInt(this.ordine.webdesign.pages.qty) +
              parseInt(this.ordine.webdesign.contents.qty) +
              parseInt(this.webdesign_modules_qty))
        : 0;
    },
    webdesign_translations_total: function() {
      return this.ordine.progetto.isWeb && this.ordine.progetto.isMultilanguage
        ? this.webdesign_translations_qty *
            this.pricelist.webdesign.translation.price
        : 0;
    },
    webdesign_translations_totalperyear: function() {
      return 0;
    },
    webdesign_total: function() {
      return this.ordine.progetto.isWeb
        ? this.webdesign_setup_total +
            this.webdesign_modules_total +
            this.webdesign_pages_total +
            this.webdesign_contents_total +
            this.webdesign_translations_total
        : 0;
    },
    webdesign_totalperyear: function() {
      return this.ordine.progetto.isWeb
        ? this.webdesign_setup_totalperyear +
            this.webdesign_modules_totalperyear +
            this.webdesign_pages_totalperyear +
            this.webdesign_contents_totalperyear +
            this.webdesign_translations_totalperyear
        : 0;
    },
    privacy_licenses_qty: function() {
      return (
        parseInt(this.ordine.progetto.languages.qty) +
        (this.webhosting_domain_qty > 0 ? this.webhosting_domain_qty : 1)
      );
    },
    privacy_licenses_total: function() {
      return 0;
    },
    privacy_licenses_totalperyear: function() {
      return this.ordine.progetto.isPrivacy
        ? this.pricelist.privacy.iubenda.price * this.privacy_licenses_qty
        : 0;
    },
    privacy_setup_total: function() {
      return this.ordine.progetto.isPrivacy ? this.pricelist.privacy.setup.price : 0;
    },
    privacy_setup_totalperyear: function() {
      return 0;
    },
    privacy_total: function() {
      return this.privacy_setup_total + this.privacy_licenses_total;
    },
    privacy_totalperyear: function() {
      return (
        this.privacy_setup_totalperyear + this.privacy_licenses_totalperyear
      );
    },
    ecommerce_total: function() {
      return this.ordine.progetto.isEcommerce
        ? this.pricelist.ecommerce.setup.price +
            this.pricelist.ecommerce.module.price * this.ordine.ecommerce.modules +
            this.pricelist.ecommerce.marketplace.price *
              this.ordine.ecommerce.marketplaces +
            this.pricelist.ecommerce.perproduct.price *
              this.ordine.ecommerce.products +
            (this.ordine.ecommerce.isDataEntry
              ? this.pricelist.ecommerce.dataentry.price *
                this.ordine.ecommerce.products
              : 0)
        : 0;
    },
    ecommerce_totalperyear: function() {
      return 0;
    },
    seo_total: function() {
      return this.ordine.progetto.isSEO ? this.pricelist.seo.setup.price : 0;
    },
    seo_totalpermonth: function() {
      var discount =
        this.ordine.seo.keywords * 2 < 40 ? (100 - this.ordine.seo.keywords * 2) / 100 : 0.6;
      return this.ordine.progetto.isSEO
        ? this.ordine.seo.keywords *
            Math.floor(this.pricelist.seo.keyword.price * discount)
        : 0;
    },
    socialmedia_qty: function() {
      return (
        (this.ordine.socialmedia.isGoogle ? 1 : 0) +
        (this.ordine.socialmedia.isFacebook ? 1 : 0) +
        (this.ordine.socialmedia.isLinkedin ? 1 : 0) +
        (this.ordine.socialmedia.isInstagram ? 1 : 0) +
        (this.ordine.socialmedia.isPinterest ? 1 : 0)
      );
    },
    socialmedia_total: function() {
      return this.ordine.progetto.isSocial
        ? this.pricelist.socialmedia.setup.price +
            this.pricelist.socialmedia.platform.price * this.socialmedia_qty
        : 0;
    },
    socialmedia_totalperyear: function() {
      return 0;
    },
    graphics_total: function() {
      return this.ordine.progetto.isGraphics
        ? this.pricelist.graphics.logo.setup.price
        : 0;
    },
    graphics_totalperyear: function() {
      return 0;
    },
    mainteneance_total: function() {
      return 0;
    },
    mainteneance_totalperyear: function() {
      if (this.ordine.mainteneance.isOrdinaria) {
        return this.pricelist.mainteneance.web.base.price;
      }
      if (this.ordine.mainteneance.isOrdinaria && this.ordine.progetto.isEcommerce) {
        return this.pricelist.mainteneance.ordine.ecommerce.base.price;
      }
      if (this.ordine.mainteneance.isPerfettiva) {
        return this.pricelist.mainteneance.web.pro.price;
      }
      if (this.ordine.mainteneance.isPerfettiva && this.ordine.progetto.isEcommerce) {
        return this.pricelist.mainteneance.ordine.ecommerce.pro.price;
      }
      return 0;
    },
    total: function() {
      return (
        this.webhosting_total +
        this.webdesign_total +
        this.privacy_total +
        this.ecommerce_total +
        this.seo_total +
        this.socialmedia_total +
        this.graphics_total +
        this.mainteneance_total
      );
    },
    totalperyear: function() {
      return (
        this.webhosting_totalperyear +
        this.webdesign_totalperyear +
        this.privacy_totalperyear +
        this.ecommerce_totalperyear +
        this.socialmedia_totalperyear +
        this.graphics_totalperyear +
        this.mainteneance_totalperyear
      );
    },
    formulaZero: function() {
      var result = 0;
      if (
        !(
          this.ordine.progetto.isDomain ||
          this.ordine.progetto.isHosting ||
          this.ordine.progetto.isExchange ||
          this.ordine.progetto.isWeb ||
          this.ordine.progetto.isEcommerce ||
          this.ordine.progetto.isSocial ||
          this.ordine.progetto.isGraphics ||
          this.ordine.progetto.isMainteneance
        )
      ) {
        return 0;
      }
      var coefficente =
        this.total + this.totalperyear < 15000
          ? 2 - 0.8 * ((this.totalperyear + this.total) / 15000)
          : 1.2;
      var permonth = (this.totalperyear + this.total / coefficente) / 12;
      if (permonth < 150) {
        result = 149;
      } else if (permonth >= 200 && permonth < 250) {
        result = 249;
      } else if (permonth >= 300 && permonth < 350) {
        result = 349;
      } else {
        result = Math.ceil(permonth / 100) * 100 - 1;
      }

      return result * 10 < this.totalperyear + this.total ? result : 0;
    }
  },
  methods: {
    setMailSystem: function(isExchange) {
      this.ordine.webhosting.hosting.mailbox.isCaselle =
        !isExchange && this.ordine.webhosting.hosting.mailbox.isCaselle;
      this.ordine.progetto.isExchange = isExchange && this.ordine.progetto.isExchange;
    },
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    saveOrder: function(){
      var order = this.ordine;
      axios.post('https://api.ordini.zepfiro.com/ordini',{"ordine":JSON.stringify(order)})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log('Payload: '+JSON.stringify(order)+', Error: '+error);
      });
    }
  }
};
</script>

<style scoped>
input:invalid {
  border: thin solid red;
}
.uk-open .hidden-if-open {
  display: none;
}
.uk-card-default {
  background-color: white;
}
</style>

