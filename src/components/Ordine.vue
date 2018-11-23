<template>
<div>
  <div class="uk-background-secondary uk-padding" uk-sticky>
            <img src="https://www.zepfiro.com/wp-content/uploads/2018/08/zepfiro-logo-or-or-white.png" style="width:150px; max-width:150px;">
       <button v-if="total||totalperyear" type="button" class="uk-button uk-button-primary" v-on:click="saveOrder()"><span uk-icon="icon: push"></span>  Salva preventivo</button>
    <router-link :to="{ name: 'ElencoOrdini'}" class="uk-button uk-button-default"><span uk-icon="icon: list"></span>  Elenco</router-link>
       <router-link :to="{ name: 'RiepilogoOrdine', params: { id: ordineId }}" v-if="ordineId!=0"  class="uk-button uk-button-default"><span uk-icon="icon: file-text"></span>  Riepilogo</router-link>
       <span v-if="ordine.fileid">{{ordine.fileid}}</span>
  </div>
  <form class="uk-form-stacked uk-padding">
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
        <Ecommerce class="uk-accordion-content" :ordine="ordine" />
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
        <span v-if="total">{{formatPrice(total+totalperyear)}}€</span>
        <span v-if="totalperyear"> (di cui {{formatPrice(totalperyear)}}€/anno)</span>
        <span v-if="(total||totalperyear)&&seo_totalpermonth"> + </span>
        <span v-if="seo_totalpermonth">Seo: {{formatPrice(seo_totalpermonth)}}€/mese</span>
        <br>
        <strong v-if="formulaZero>0">Offerta formula zero: </strong>
        <span v-if="formulaZero>0">{{formatPrice(formulaZero)}}€/mese</span>
        <span v-if="(formulaZero>0)&&seo_totalpermonth"> + </span>
        <span v-if="(formulaZero>0)&&seo_totalpermonth">Seo: {{formatPrice(seo_totalpermonth)}}€/mese</span>
      </p>
    </div>
  </form>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import UIkit from "uikit";
import Anagrafica from "./Anagrafica.vue";
import Progetto from "./Progetto.vue";
import WebHosting from "./WebHosting.vue";
import WebDesign from "./WebDesign.vue";
import Ecommerce from "./Ecommerce.vue";
import Seo from "./Seo.vue";
import SocialMedia from "./SocialMedia.vue";
import Graphics from "./Graphics.vue";
import Mainteneance from "./Mainteneance.vue";
import router from "../router";

export default {
  name: "Ordine",
  components: {
    axios,
    router,
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
  created: async function() {
    if (this.$route.params.id && this.$route.params.id != "nuovo") {
      this.ordineId = this.$route.params.id;
      await this.getOrdine(this.$route.params.id);
      this.$parent.title = "Crea o Modifica Ordine";
    }
  },
  data: function() {
    return {
      date:new Date(),
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
          page: { price: 99, recurrent: false, frequency: "" },
          content: { price: 69, recurrent: false, frequency: "" },
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
          perproduct: { price: 9.9, recurrent: false, frequency: "" },
          dataentry: { price: 19.9, recurrent: false, frequency: "" }
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
          coordinato: {
            setup: { price: 999, recurrent: false, frequency: "" }
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
      isEdit: false,
      saving: false,
      ordineId: 0,
      ordine: {
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
          isLogo: false,
          isCoordinato: false,
          isMainteneance: false
        },
        webhosting: {
          domain: {
            names: ""
          },
          hosting: {
            host: {},
            mailbox: { isCaselle: false, qty: 0 }
          },
          exchange: {
            setup: {},
            mailuser: { qty: 0 }
          }
        },
        webdesign: {
          setup: {},
          modules: { names: "" },
          translations: {},
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
          modules: { qty: 0 },
          marketplaces: { qty: 0 },
          products: { qty: 0 },
          setup: {}
        },
        privacy: {
          licenses: {
            setup: {}
          }
        },
        seo: {
          keywords: 0
        },
        socialmedia: {
          isGoogle: false,
          isFacebook: false,
          isYoutube: false,
          isLinkedin: false,
          isInstagram: false,
          isPinterest: false
        },
        graphics: {
          logo: {},
          coordinato: {}
        },
        mainteneance: {
          isOrdinaria: false,
          isPerfettiva: false
        }
      }
    };
  },
  computed: {
    webhosting_domain_qty: function() {
      if (this.ordine.webhosting.domain.names == "") {
        return 0;
      }
      return (this.ordine.webhosting.domain.qty = this.ordine.webhosting.domain.names.split(
        ","
      ).length);
    },
    webhosting_domain_total: function() {
      return 0;
    },
    webhosting_domain_totalperyear: function() {
      return (this.ordine.webhosting.domain.totalperyear = this.ordine.progetto
        .isDomain
        ? this.pricelist.domain.price * this.webhosting_domain_qty
        : 0);
    },
    webhosting_hosting_host_total: function() {
      return 0;
    },
    webhosting_hosting_host_totalperyear: function() {
      return (this.ordine.webhosting.hosting.host.totalperyear = this.ordine
        .progetto.isHosting
        ? this.webhosting_domain_qty > 1
          ? this.pricelist.hosting.multihost.price
          : this.pricelist.hosting.host.price
        : 0);
    },
    webhosting_hosting_mailbox_totalperyear: function() {
      return (this.ordine.webhosting.hosting.mailbox.totalperyear = this.ordine
        .webhosting.hosting.mailbox.isCaselle
        ? this.pricelist.hosting.mailbox.price *
          parseInt(this.ordine.webhosting.hosting.mailbox.qty)
        : 0);
    },
    webhosting_hosting_mailbox_total: function() {
      return 0;
    },
    webhosting_hosting_total: function() {
      return (this.ordine.webhosting.hosting.total = this.ordine.progetto
        .isHosting
        ? this.webhosting_hosting_host_total +
          this.webhosting_hosting_mailbox_total
        : 0);
    },
    webhosting_hosting_totalperyear: function() {
      return (this.ordine.webhosting.hosting.totalperyear = this.ordine.progetto
        .isHosting
        ? this.webhosting_hosting_host_totalperyear +
          this.webhosting_hosting_mailbox_totalperyear
        : 0);
    },
    webhosting_exchange_setup_total: function() {
      return (this.ordine.webhosting.exchange.setup.total = this.ordine.progetto
        .isExchange
        ? this.pricelist.exchange.setup.price
        : 0);
    },
    webhosting_exchange_setup_totalperyear: function() {
      return 0;
    },
    webhosting_exchange_mailuser_totalperyear: function() {
      return (this.ordine.webhosting.exchange.mailuser.totalperyear = this
        .ordine.progetto.isExchange
        ? this.pricelist.exchange.mailuser.price *
          parseInt(this.ordine.webhosting.exchange.mailuser.qty)
        : 0);
    },
    webhosting_exchange_mailuser_total: function() {
      return 0;
    },
    webhosting_exchange_total: function() {
      return (this.ordine.webhosting.exchange.total = this.ordine.progetto
        .isExchange
        ? this.webhosting_exchange_setup_total +
          this.webhosting_exchange_mailuser_total
        : 0);
    },
    webhosting_exchange_totalperyear: function() {
      return (this.ordine.webhosting.exchange.totalperyear = this.ordine
        .progetto.isExchange
        ? this.webhosting_exchange_setup_totalperyear +
          this.webhosting_exchange_mailuser_totalperyear
        : 0);
    },
    webhosting_total: function() {
      return (this.ordine.webhosting.total =
        this.webhosting_domain_total +
        this.webhosting_hosting_total +
        this.webhosting_exchange_total);
    },
    webhosting_totalperyear: function() {
      return (this.ordine.webhosting.totalperyear =
        this.webhosting_domain_totalperyear +
        this.webhosting_hosting_totalperyear +
        this.webhosting_exchange_totalperyear);
    },
    webdesign_setup_total: function() {
      return (this.ordine.webdesign.setup.total = this.ordine.progetto.isWeb
        ? this.pricelist.webdesign.setup.price +
          (this.ordine.progetto.isMultilanguage
            ? parseInt(this.ordine.progetto.languages.qty) *
              this.pricelist.webdesign.language.price
            : 0)
        : 0);
    },
    webdesign_setup_totalperyear: function() {
      return 0;
    },
    webdesign_modules_qty: function() {
      this.ordine.webdesign.modules.names = "";
      if (this.ordine.webdesign.hasBlog) {
        this.ordine.webdesign.modules.names += "Blog";
      }
      if (this.ordine.webdesign.hasPortfolio) {
        if (this.ordine.webdesign.hasBlog) {
          this.ordine.webdesign.modules.names += ", ";
        }
        this.ordine.webdesign.modules.names += "Portfolio";
      }
      if (this.ordine.webdesign.hasJob) {
        if (
          this.ordine.webdesign.hasBlog ||
          this.ordine.webdesign.hasPortfolio
        ) {
          this.ordine.webdesign.modules.names += ", ";
        }
        this.ordine.webdesign.modules.names += "Lavora con noi";
      }
      if (this.ordine.webdesign.hasEvents) {
        if (
          this.ordine.webdesign.hasBlog ||
          this.ordine.webdesign.hasPortfolio ||
          this.ordine.webdesign.hasJob
        ) {
          this.ordine.webdesign.modules.names += ", ";
        }
        this.ordine.webdesign.modules.names += "Eventi";
      }
      if (this.ordine.webdesign.hasNewsletter) {
        if (
          this.ordine.webdesign.hasBlog ||
          this.ordine.webdesign.hasPortfolio ||
          this.ordine.webdesign.hasJob ||
          this.ordine.webdesign.hasEvents
        ) {
          this.ordine.webdesign.modules.names += ", ";
        }
        this.ordine.webdesign.modules.names += "Newsletter";
      }
      return (this.ordine.webdesign.modules.qty =
        (this.ordine.webdesign.hasBlog ? 1 : 0) +
        (this.ordine.webdesign.hasPortfolio ? 1 : 0) +
        (this.ordine.webdesign.hasJob ? 1 : 0) +
        (this.ordine.webdesign.hasEvents ? 1 : 0) +
        (this.ordine.webdesign.hasNewsletter ? 1 : 0));
    },
    webdesign_modules_total: function() {
      return (this.ordine.webdesign.modules.total = this.ordine.progetto.isWeb
        ? this.pricelist.webdesign.module.price * this.webdesign_modules_qty
        : 0);
    },
    webdesign_modules_totalperyear: function() {
      return 0;
    },
    webdesign_pages_total: function() {
      return (this.ordine.webdesign.pages.total = this.ordine.progetto.isWeb
        ? parseInt(this.ordine.webdesign.pages.qty) > 3
          ? (parseInt(this.ordine.webdesign.pages.qty) - 3) *
            this.pricelist.webdesign.page.price
          : 0
        : 0);
    },
    webdesign_pages_totalperyear: function() {
      return 0;
    },
    webdesign_contents_total: function() {
      return (this.ordine.webdesign.contents.total = this.ordine.progetto.isWeb
        ? parseInt(this.ordine.webdesign.contents.qty) > 3
          ? (parseInt(this.ordine.webdesign.contents.qty) - 3) *
            this.pricelist.webdesign.content.price
          : 0
        : 0);
    },
    webdesign_contents_totalperyear: function() {
      return 0;
    },
    webdesign_translations_qty: function() {
      return (this.ordine.webdesign.translations.qty = this.ordine.progetto
        .isMultilanguage
        ? parseInt(this.ordine.progetto.languages.qty) *
          (parseInt(this.ordine.webdesign.pages.qty) +
            parseInt(this.ordine.webdesign.contents.qty) +
            parseInt(this.webdesign_modules_qty))
        : 0);
    },
    webdesign_translations_total: function() {
      return (this.ordine.webdesign.translations.total =
        this.ordine.progetto.isWeb && this.ordine.progetto.isMultilanguage
          ? this.webdesign_translations_qty *
            this.pricelist.webdesign.translation.price
          : 0);
    },
    webdesign_translations_totalperyear: function() {
      return 0;
    },
    webdesign_total: function() {
      return (this.ordine.webdesign.total = this.ordine.progetto.isWeb
        ? this.webdesign_setup_total +
          this.webdesign_modules_total +
          this.webdesign_pages_total +
          this.webdesign_contents_total +
          this.webdesign_translations_total
        : 0);
    },
    webdesign_totalperyear: function() {
      return (this.ordine.webdesign.totalperyear = this.ordine.progetto.isWeb
        ? this.webdesign_setup_totalperyear +
          this.webdesign_modules_totalperyear +
          this.webdesign_pages_totalperyear +
          this.webdesign_contents_totalperyear +
          this.webdesign_translations_totalperyear
        : 0);
    },
    privacy_licenses_qty: function() {
      return (this.ordine.privacy.licenses.qty =
        parseInt(this.ordine.progetto.languages.qty) +
        (this.webhosting_domain_qty > 0
          ? parseInt(this.webhosting_domain_qty)
          : 1));
    },
    privacy_licenses_total: function() {
      return 0;
    },
    privacy_licenses_totalperyear: function() {
      return (this.ordine.privacy.licenses.totalperyear = this.ordine.progetto
        .isPrivacy
        ? this.pricelist.privacy.iubenda.price * this.privacy_licenses_qty
        : 0);
    },
    privacy_setup_total: function() {
      return (this.ordine.privacy.licenses.setup.total = this.ordine.progetto
        .isPrivacy
        ? this.pricelist.privacy.setup.price
        : 0);
    },
    privacy_setup_totalperyear: function() {
      return 0;
    },
    privacy_total: function() {
      return (this.ordine.privacy.total =
        this.privacy_setup_total + this.privacy_licenses_total);
    },
    privacy_totalperyear: function() {
      return (this.ordine.privacy.totalperyear =
        this.privacy_setup_totalperyear + this.privacy_licenses_totalperyear);
    },
    ecommerce_setup_total: function() {
      return (this.ordine.ecommerce.setup.total = this.ordine.progetto
        .isEcommerce
        ? this.pricelist.ecommerce.setup.price
        : 0);
    },
    ecommerce_modules_total: function() {
      return (this.ordine.ecommerce.modules.total = this.ordine.progetto
        .isEcommerce
        ? this.pricelist.ecommerce.module.price *
          this.ordine.ecommerce.modules.qty
        : 0);
    },
    ecommerce_marketplaces_total: function() {
      return (this.ordine.ecommerce.marketplaces.total = this.ordine.progetto
        .isEcommerce
        ? this.pricelist.ecommerce.marketplace.price *
          this.ordine.ecommerce.marketplaces.qty
        : 0);
    },
    ecommerce_products_total: function() {
      return (this.ordine.ecommerce.products.total = this.ordine.progetto
        .isEcommerce
        ? this.pricelist.ecommerce.perproduct.price *
            this.ordine.ecommerce.products.qty +
          (this.ordine.ecommerce.isDataEntry
            ? this.pricelist.ecommerce.dataentry.price *
              this.ordine.ecommerce.products.qty
            : 0)
        : 0);
    },
    ecommerce_total: function() {
      return (this.ordine.ecommerce.total = this.ordine.progetto.isEcommerce
        ? this.ecommerce_setup_total +
          +this.ecommerce_modules_total +
          +this.ecommerce_marketplaces_total +
          this.ecommerce_products_total
        : 0);
    },
    ecommerce_totalperyear: function() {
      return 0;
    },
    seo_total: function() {
      return (this.ordine.seo.total = this.ordine.progetto.isSEO
        ? this.ordine.progetto.isMultilanguage
          ? parseInt(this.ordine.progetto.languages.qty) +
            1 * this.pricelist.seo.setup.price
          : this.pricelist.seo.setup.price
        : 0);
    },
    seo_totalpermonth: function() {
      var discount =
        this.ordine.seo.keywords * 2 < 40
          ? (100 - this.ordine.seo.keywords * 2) / 100
          : 0.6;
      return (this.ordine.seo.totalpermonth = this.ordine.progetto.isSEO
        ? this.ordine.seo.keywords *
          Math.floor(this.pricelist.seo.keyword.price * discount)
        : 0);
    },
    socialmedia_qty: function() {
      return (this.ordine.socialmedia.qty =
        (this.ordine.socialmedia.isGoogle ? 1 : 0) +
        (this.ordine.socialmedia.isFacebook ? 1 : 0) +
        (this.ordine.socialmedia.isLinkedin ? 1 : 0) +
        (this.ordine.socialmedia.isInstagram ? 1 : 0) +
        (this.ordine.socialmedia.isYoutube ? 1 : 0) +
        (this.ordine.socialmedia.isPinterest ? 1 : 0));
    },
    socialmedia_total: function() {
      return (this.ordine.socialmedia.total = this.ordine.progetto.isSocial
        ? this.pricelist.socialmedia.setup.price +
          this.pricelist.socialmedia.platform.price * this.socialmedia_qty
        : 0);
    },
    socialmedia_totalperyear: function() {
      return 0;
    },
    graphics_logo_total: function() {
      return (this.ordine.graphics.logo.total = this.ordine.progetto.isLogo
        ? this.pricelist.graphics.logo.setup.price
        : 0);
    },
    graphics_coordinato_total: function() {
      return (this.ordine.graphics.coordinato.total = this.ordine.progetto
        .isCoordinato
        ? this.pricelist.graphics.coordinato.setup.price
        : 0);
    },
    graphics_total: function() {
      return (this.ordine.graphics.total =
        this.graphics_logo_total + this.graphics_coordinato_total);
    },
    graphics_totalperyear: function() {
      return 0;
    },
    mainteneance_total: function() {
      return 0;
    },
    mainteneance_totalperyear: function() {
      if (this.ordine.mainteneance.isOrdinaria) {
        return (this.ordine.mainteneance.totalperyear = this.pricelist.mainteneance.web.base.price);
      }
      if (
        this.ordine.mainteneance.isOrdinaria &&
        this.ordine.progetto.isEcommerce
      ) {
        return (this.ordine.mainteneance.totalperyear = this.pricelist.mainteneance.ordine.ecommerce.base.price);
      }
      if (this.ordine.mainteneance.isPerfettiva) {
        return (this.ordine.mainteneance.totalperyear = this.pricelist.mainteneance.web.pro.price);
      }
      if (
        this.ordine.mainteneance.isPerfettiva &&
        this.ordine.progetto.isEcommerce
      ) {
        return (this.ordine.mainteneance.totalperyear = this.pricelist.mainteneance.ordine.ecommerce.pro.price);
      }
      return 0;
    },
    total: function() {
      return (this.ordine.total =
        this.webhosting_total +
        this.webdesign_total +
        this.privacy_total +
        this.ecommerce_total +
        this.seo_total +
        this.socialmedia_total +
        this.graphics_total +
        this.mainteneance_total);
    },
    totalperyear: function() {
      return (this.ordine.totalperyear =
        this.webhosting_totalperyear +
        this.webdesign_totalperyear +
        this.privacy_totalperyear +
        this.ecommerce_totalperyear +
        this.socialmedia_totalperyear +
        this.graphics_totalperyear +
        this.mainteneance_totalperyear);
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
          this.ordine.progetto.isLogo ||
          this.ordine.progetto.isMainteneance
        )
      ) {
        return 0;
      }
      var coefficente =
        this.total + this.totalperyear < 10000
          ? 1.2 + 0.8 * ((this.totalperyear + this.total) / 10000)
          : 2;
      var permonth = (this.totalperyear + this.total / coefficente) / 12;
      result = Math.ceil(permonth / 10) * 10 - 1;

      return (this.ordine.formulaZero =
        result * 10 < this.totalperyear + this.total ? result : 0);
    }
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    saveOrder: function() {
      const vm = this;
      vm.saving = true;
      if (this.isEdit) {
        this.ordine.fileid = this.calculateFileId();
        this.ordine.updatedAt = Date.now();
        if (this.ordine.createdAt == null) {
          this.ordine.createdAt = this.ordine.updatedAt;
        }
        axios
          .put("https://api.ordini.zepfiro.com/ordini/" + vm.ordineId, {
            ordine: JSON.stringify(vm.ordine)
          })
          .then(function(response) {
            vm.saving = false;
          })
          .catch(function(error) {
            vm.saving = false;
          });
      } else {
        this.ordine.createdAt = Date.now();
        this.ordine.fileid = this.calculateFileId();
        axios
          .post("https://api.ordini.zepfiro.com/ordini", {
            ordine: JSON.stringify(vm.ordine)
          })
          .then(function(response) {
            vm.saving = false;
            vm.ordineId = response.data[0].id;
            router.push({ path: "/ordine/" + vm.ordineId });
          })
          .catch(function(error) {
            vm.saving = false;
          });
      }
    },
    calculateFileId: function() {
      var version = "01";
      if (this.isEdit && this.ordine.fileid != null) {
        var fid = this.ordine.fileid.split("-");
        version = this.formatZeroNumber(parseInt(fid[fid.length - 1])+1);
        console.log(fid[fid.length - 1]);
        console.log(version);
      }
      return (
        "FOZ-" +
        this.ordine.anagrafica.azienda.toUpperCase().slice(0, 3) +
        "-" +
        this.date.getFullYear() +
        "-" +
        this.formatZeroNumber(this.date.getMonth() + 1) +
        "-" +
        this.formatZeroNumber(this.date.getUTCDate()) +
        "-" +
        version
      );
    },
    formatZeroNumber: function(number) {
      return ("0" + number).slice(-2);
    },
    getOrdine: function(id) {
      const vm = this;
      this.isEdit = true;

      axios
        .get("https://api.ordini.zepfiro.com/ordini/" + id)
        .then(function(response) {
          vm.date = new Date(parseInt(response.data.ordine.createdAt));
          vm.ordine.fileid = response.data.ordine.fileid;
          vm.ordine.anagrafica.azienda =
            response.data.ordine.anagrafica.azienda;
          vm.ordine.anagrafica.referente =
            response.data.ordine.anagrafica.referente;
          vm.ordine.anagrafica.telefono =
            response.data.ordine.anagrafica.telefono;
          vm.ordine.anagrafica.email = response.data.ordine.anagrafica.email;
          vm.ordine.progetto.titolo = response.data.ordine.progetto.titolo;
          vm.ordine.progetto.descrizione =
            response.data.ordine.progetto.descrizione;
          vm.ordine.progetto.isMultilanguage =
            response.data.ordine.progetto.isMultilanguage;
          vm.ordine.progetto.languages.qty =
            response.data.ordine.progetto.languages.qty;
          vm.ordine.progetto.isDomain = response.data.ordine.progetto.isDomain;
          vm.ordine.progetto.isHosting =
            response.data.ordine.progetto.isHosting;
          vm.ordine.progetto.isExchange =
            response.data.ordine.progetto.isExchange;
          vm.ordine.progetto.isWeb = response.data.ordine.progetto.isWeb;
          vm.ordine.progetto.isPrivacy =
            response.data.ordine.progetto.isPrivacy;
          vm.ordine.progetto.isEcommerce =
            response.data.ordine.progetto.isEcommerce;
          vm.ordine.progetto.isSEO = response.data.ordine.progetto.isSEO;
          vm.ordine.progetto.isSocial = response.data.ordine.progetto.isSocial;
          vm.ordine.progetto.isLogo = response.data.ordine.progetto.isLogo;
          vm.ordine.progetto.isCoordinato =
            response.data.ordine.progetto.isCoordinato;
          vm.ordine.progetto.isMainteneance =
            response.data.ordine.progetto.isMainteneance;
          vm.ordine.webhosting.domain.names =
            response.data.ordine.webhosting.domain.names;
          vm.ordine.webhosting.hosting.mailbox.isCaselle =
            response.data.ordine.webhosting.hosting.mailbox.isCaselle;
          vm.ordine.webhosting.hosting.mailbox.qty =
            response.data.ordine.webhosting.hosting.mailbox.qty;
          vm.ordine.webhosting.exchange.mailuser.qty =
            response.data.ordine.webhosting.exchange.mailuser.qty;
          vm.ordine.webdesign.hasBlog = response.data.ordine.webdesign.hasBlog;
          vm.ordine.webdesign.hasPortfolio =
            response.data.ordine.webdesign.hasPortfolio;
          vm.ordine.webdesign.hasJob = response.data.ordine.webdesign.hasJob;
          vm.ordine.webdesign.hasEvents =
            response.data.ordine.webdesign.hasEvents;
          vm.ordine.webdesign.hasNewsletter =
            response.data.ordine.webdesign.hasNewsletter;
          vm.ordine.webdesign.pages.qty =
            response.data.ordine.webdesign.pages.qty;
          vm.ordine.webdesign.contents.qty =
            response.data.ordine.webdesign.contents.qty;
          vm.ordine.ecommerce.isImportExport =
            response.data.ordine.ecommerce.isImportExport;
          vm.ordine.ecommerce.isBookings =
            response.data.ordine.ecommerce.isBookings;
          vm.ordine.ecommerce.isEvents =
            response.data.ordine.ecommerce.isEvents;
          vm.ordine.ecommerce.isAmazon =
            response.data.ordine.ecommerce.isAmazon;
          vm.ordine.ecommerce.isEbay = response.data.ordine.ecommerce.isEbay;
          vm.ordine.ecommerce.isDataEntry =
            response.data.ordine.ecommerce.isDataEntry;
          vm.ordine.ecommerce.modules = response.data.ordine.ecommerce.modules;
          vm.ordine.ecommerce.marketplaces =
            response.data.ordine.ecommerce.marketplaces;
          vm.ordine.ecommerce.products =
            response.data.ordine.ecommerce.products;
          vm.ordine.seo.keywords = response.data.ordine.seo.keywords;
          vm.ordine.socialmedia.isGoogle =
            response.data.ordine.socialmedia.isGoogle;
          vm.ordine.socialmedia.isFacebook =
            response.data.ordine.socialmedia.isFacebook;
          vm.ordine.socialmedia.isLinkedin =
            response.data.ordine.socialmedia.isLinkedin;
          vm.ordine.socialmedia.isYoutube =
            response.data.ordine.socialmedia.isYoutube;
          vm.ordine.socialmedia.isInstagram =
            response.data.ordine.socialmedia.isInstagram;
          vm.ordine.socialmedia.isPinterest =
            response.data.ordine.socialmedia.isPinterest;
          vm.ordine.mainteneance.isOrdinaria =
            response.data.ordine.mainteneance.isOrdinaria;
          vm.ordine.mainteneance.isPerfettiva =
            response.data.ordine.mainteneance.isPerfettiva;
        })
        .catch(function(error) {});
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

