<template>
    <form class="uk-form-stacked">
            <div class="uk-flex uk-flex-right">
                <small>
                    <span v-if="anagrafica.azienda">{{anagrafica.azienda}}</span>
                    <span v-if="anagrafica.referente && anagrafica.azienda">, </span>
                    <span v-if="anagrafica.referente">{{anagrafica.referente}}</span>
                    <span v-if="anagrafica.telefono || anagrafica.email"> (</span>
                    <span v-if="anagrafica.telefono">t: {{anagrafica.telefono}}</span>
                    <span v-if="anagrafica.telefono && anagrafica.email">, </span>
                    <span v-if="anagrafica.email">e: {{anagrafica.email}}</span>
                    <span v-if="anagrafica.telefono || anagrafica.email">)</span><br>
                </small>
            </div>
            <div>
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Anagrafica cliente<em>*</em></h2>
                    <Anagrafica class="uk-accordion-content" :input="anagrafica" />
                </div>
            </div>
            <div>
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Informazioni sul progetto<em>*</em></h2>
                    <Progetto class="uk-accordion-content" :input="progetto" />
                </div>
            </div>
            <div v-if="progetto.isDomain || progetto.isHosting || progetto.isExchange">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Hosting e Domini</h2>
                    <WebHosting class="uk-accordion-content" :input="webhosting" :progetto="progetto" />
                </div>
            </div>
            <div v-if="progetto.isWeb">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Sito web </h2>
                    <WebDesign class="uk-accordion-content" :input="webdesign" :progetto="progetto" />
                </div>
            </div>
            <div v-if="progetto.isEcommerce">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">E-commerce</h2>
                    <Ecommerce class="uk-accordion-content" :input="ecommerce" :progetto="progetto" />
                </div>
            </div>
            <div v-if="progetto.isSEO">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">SEO</h2>
                    <Seo class="uk-accordion-content" :input="seo" :progetto="progetto" />
                </div>
            </div>
            <div v-if="progetto.isSocial">
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Social Media</h2>
                    <SocialMedia class="uk-accordion-content" :input="socialmedia" :progetto="progetto" />
                </div>
            </div>
            <div v-if="progetto.isMainteneance"> 
                <div class="uk-margin-medium-top uk-margin-medium-right">
                    <h2 class="uk-heading-divider">Manutenzione </h2>
                    <Mainteneance class="uk-accordion-content" :input="mainteneance" :progetto="progetto" />
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
    Mainteneance
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
    };
  },
  watch: {
    progetto: {
      isExchange: function(val) {
        if (this.webhosting.hosting.mailbox.isCaselle && val) {
          this.webhosting.hosting.mailbox.isCaselle = !val;
        }
      }
    },
    webhosting: {
      hosting: {
        mailbox: {
          isCaselle: function(val) {
            if (this.progetto.isExchange && val) {
              this.progetto.isExchange = !val;
            }
          }
        }
      }
    }
  },
  computed: {
    webhosting_domain_qty: function() {
      if (this.webhosting.domain.names == "") {
        return 0;
      }
      return this.webhosting.domain.names.split(",").length;
    },
    webhosting_domain_total: function() {
      return 0;
    },
    webhosting_domain_totalperyear: function() {
      return this.progetto.isDomain
        ? this.pricelist.domain.price * this.webhosting_domain_qty
        : 0;
    },
    webhosting_hosting_host_total: function() {
      return this.progetto.isHosting
        ? this.webhosting_domain_qty > 1
          ? this.pricelist.hosting.multihost.price
          : this.pricelist.hosting.host.price
        : 0;
    },
    webhosting_hosting_host_totalperyear: function() {
      return 0;
    },
    webhosting_hosting_mailbox_totalperyear: function() {
      return this.webhosting.hosting.mailbox.isCaselle
        ? this.pricelist.hosting.mailbox.price *
            parseInt(this.webhosting.hosting.mailbox.qty)
        : 0;
    },
    webhosting_hosting_mailbox_total: function() {
      return 0;
    },
    webhosting_hosting_total: function() {
      return this.progetto.isHosting
        ? this.webhosting_hosting_host_total +
            this.webhosting_hosting_mailbox_total
        : 0;
    },
    webhosting_hosting_totalperyear: function() {
      return this.progetto.isHosting
        ? this.webhosting_hosting_host_totalperyear +
            this.webhosting_hosting_mailbox_totalperyear
        : 0;
    },
    webhosting_exchange_setup_total: function() {
      return this.progetto.isExchange ? this.pricelist.exchange.setup.price : 0;
    },
    webhosting_exchange_setup_totalperyear: function() {
      return 0;
    },
    webhosting_exchange_mailuser_totalperyear: function() {
      return this.progetto.isExchange
        ? this.pricelist.exchange.mailuser.price *
            parseInt(this.webhosting.exchange.mailuser.qty)
        : 0;
    },
    webhosting_exchange_mailuser_total: function() {
      return 0;
    },
    webhosting_exchange_total: function() {
      return this.progetto.isExchange
        ? this.webhosting_exchange_setup_total +
            this.webhosting_exchange_mailuser_total
        : 0;
    },
    webhosting_exchange_totalperyear: function() {
      return this.progetto.isExchange
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
      return this.progetto.isWeb
        ? this.pricelist.webdesign.setup.price +
            (this.progetto.isMultilanguage
              ? parseInt(this.progetto.languages.qty) *
                this.pricelist.webdesign.language.price
              : 0)
        : 0;
    },
    webdesign_setup_totalperyear: function() {
      return 0;
    },
    webdesign_modules_qty: function() {
      return (
        (this.webdesign.hasBlog ? 1 : 0) +
        (this.webdesign.hasPortfolio ? 1 : 0) +
        (this.webdesign.hasJob ? 1 : 0) +
        (this.webdesign.hasEvents ? 1 : 0) +
        (this.webdesign.hasNewsletter ? 1 : 0)
      );
    },
    webdesign_modules_total: function() {
      return this.progetto.isWeb
        ? this.pricelist.webdesign.module.price * this.webdesign_modules_qty
        : 0;
    },
    webdesign_modules_totalperyear: function() {
      return 0;
    },
    webdesign_pages_total: function() {
      return this.progetto.isWeb
        ? parseInt(this.webdesign.pages.qty) > 4
          ? (parseInt(this.webdesign.pages.qty) - 4) *
            this.pricelist.webdesign.page.price
          : 0
        : 0;
    },
    webdesign_pages_totalperyear: function() {
      return 0;
    },
    webdesign_contents_total: function() {
      return this.progetto.isWeb
        ? parseInt(this.webdesign.contents.qty) *
            this.pricelist.webdesign.content.price
        : 0;
    },
    webdesign_contents_totalperyear: function() {
      return 0;
    },
    webdesign_translations_qty: function() {
      return this.progetto.isMultilanguage
        ? parseInt(this.progetto.languages.qty) *
            (parseInt(this.webdesign.pages.qty) +
              parseInt(this.webdesign.contents.qty) +
              parseInt(this.webdesign_modules_qty))
        : 0;
    },
    webdesign_translations_total: function() {
      return this.progetto.isWeb && this.progetto.isMultilanguage
        ? this.webdesign_translations_qty *
            this.pricelist.webdesign.translation.price
        : 0;
    },
    webdesign_translations_totalperyear: function() {
      return 0;
    },
    webdesign_total: function() {
      return this.progetto.isWeb
        ? this.webdesign_setup_total +
            this.webdesign_modules_total +
            this.webdesign_pages_total +
            this.webdesign_contents_total +
            this.webdesign_translations_total
        : 0;
    },
    webdesign_totalperyear: function() {
      return this.progetto.isWeb
        ? this.webdesign_setup_totalperyear +
            this.webdesign_modules_totalperyear +
            this.webdesign_pages_totalperyear +
            this.webdesign_contents_totalperyear +
            this.webdesign_translations_totalperyear
        : 0;
    },
    privacy_licenses_qty: function() {
      return (
        parseInt(this.progetto.languages.qty) +
        (this.webhosting_domain_qty > 0 ? this.webhosting_domain_qty : 1)
      );
    },
    privacy_licenses_total: function() {
      return 0;
    },
    privacy_licenses_totalperyear: function() {
      return this.progetto.isPrivacy
        ? this.pricelist.privacy.iubenda.price * this.privacy_licenses_qty
        : 0;
    },
    privacy_setup_total: function() {
      return this.progetto.isPrivacy ? this.pricelist.privacy.setup.price : 0;
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
      return this.progetto.isEcommerce
        ? this.pricelist.ecommerce.setup.price +
            this.pricelist.ecommerce.module.price * this.ecommerce.modules +
            this.pricelist.ecommerce.marketplace.price *
              this.ecommerce.marketplaces +
            this.pricelist.ecommerce.perproduct.price *
              this.ecommerce.products +
            (this.ecommerce.isDataEntry
              ? this.pricelist.ecommerce.dataentry.price *
                this.ecommerce.products
              : 0)
        : 0;
    },
    ecommerce_totalperyear: function() {
      return 0;
    },
    seo_total: function() {
      return this.progetto.isSEO ? this.pricelist.seo.setup.price : 0;
    },
    seo_totalpermonth: function() {
      var discount =
        this.seo.keywords * 2 < 40 ? (100 - this.seo.keywords * 2) / 100 : 0.6;
      return this.progetto.isSEO
        ? this.seo.keywords *
            Math.floor(this.pricelist.seo.keyword.price * discount)
        : 0;
    },
    socialmedia_qty: function() {
      return (
        (this.socialmedia.isGoogle ? 1 : 0) +
        (this.socialmedia.isFacebook ? 1 : 0) +
        (this.socialmedia.isLinkedin ? 1 : 0) +
        (this.socialmedia.isInstagram ? 1 : 0) +
        (this.socialmedia.isPinterest ? 1 : 0)
      );
    },
    socialmedia_total: function() {
      return this.progetto.isSocial
        ? this.pricelist.socialmedia.setup.price +
            this.pricelist.socialmedia.platform.price * this.socialmedia_qty
        : 0;
    },
    socialmedia_totalperyear: function() {
      return 0;
    },
    graphics_total: function() {
      return this.progetto.isGraphics
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
      if (this.mainteneance.isOrdinaria) {
        return this.pricelist.mainteneance.web.base.price;
      }
      if (this.mainteneance.isOrdinaria && this.progetto.isEcommerce) {
        return this.pricelist.mainteneance.ecommerce.base.price;
      }
      if (this.mainteneance.isPerfettiva) {
        return this.pricelist.mainteneance.web.pro.price;
      }
      if (this.mainteneance.isPerfettiva && this.progetto.isEcommerce) {
        return this.pricelist.mainteneance.ecommerce.pro.price;
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
          this.progetto.isDomain ||
          this.progetto.isHosting ||
          this.progetto.isExchange ||
          this.progetto.isWeb ||
          this.progetto.isEcommerce ||
          this.progetto.isSocial ||
          this.progetto.isGraphics ||
          this.progetto.isMainteneance
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
      this.webhosting.hosting.mailbox.isCaselle =
        !isExchange && this.webhosting.hosting.mailbox.isCaselle;
      this.progetto.isExchange = isExchange && this.progetto.isExchange;
    },
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

