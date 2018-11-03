<template>
    <div>
        <div class="uk-background-secondary uk-padding" uk-sticky>
            <router-link :to="{ name: 'ElencoOrdini'}" class="uk-button uk-button-default"><span uk-icon="icon: list"></span>  Elenco</router-link>
            <router-link :to="{ name: 'ModificaOrdine', params: { id: $route.params.id }}" class="uk-button uk-button-default"><span uk-icon="icon: file-edit"></span>  Modifica</router-link>
            <button type="button" class="uk-button uk-button-default" v-on:click="print()"><span uk-icon="icon: file-pdf"></span>  Stampa PDF</button>
        </div>
        <div class="uk-padding">
        <div>
            <h5 class="uk-text-right" v-if="ordine.anagrafica.azienda">{{ordine.anagrafica.azienda}}</h5>
            <p class="uk-text-right">
                <small>
                <span v-if="ordine.anagrafica.referente">{{ordine.anagrafica.referente}}<br></span>
                <span v-if="ordine.anagrafica.telefono">t: {{ordine.anagrafica.telefono}}</span>
                <span v-if="ordine.anagrafica.telefono && ordine.anagrafica.email"><br></span>
                <span v-if="ordine.anagrafica.email">e: {{ordine.anagrafica.email}}</span>
                </small>
            </p>
        </div>
        <div class="uk-margin-large-bottom">
            <h1>{{ordine.progetto.titolo}}</h1>
            <p class="uk-text-lead">{{ordine.progetto.descrizione}}</p>
        </div>
        <div v-bind:class="{ 'uk-hidden': !(ordine.progetto.isDomain || ordine.progetto.isHosting || ordine.progetto.isExchange)}">
            <h3>Hosting, domini e mail</h3>
            <div v-if="ordine.progetto.isDomain && ordine.webhosting.domain.totalperyear>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webhosting.domain.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Registrazione/Trasferimento dominio ({{ordine.webhosting.domain.names}})</div>
                <div>€{{formatPrice(ordine.webhosting.domain.totalperyear)}}/anno</div>
            </div>
            <div v-if="ordine.progetto.isHosting && ordine.webhosting.hosting.host.totalperyear>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Hosting web <span v-if="ordine.webhosting.domain.qty==1">Singolo Dominio</span><span v-else>Multidominio</span></div>
                <div>€{{formatPrice(ordine.webhosting.hosting.host.totalperyear)}}/anno</div>
            </div>
            <div v-if="ordine.webhosting.hosting.mailbox.isCaselle && ordine.webhosting.hosting.mailbox.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webhosting.hosting.mailbox.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Caselle di posta standard IMAP,POP3,SMTP </div>
                <div>€{{formatPrice(ordine.webhosting.hosting.mailbox.totalperyear)}}/anno</div>
            </div>
            <div v-if="ordine.progetto.isExchange && ordine.webhosting.exchange.total>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Setup una tantum Microsoft Exchange </div>
                <div>€{{formatPrice(ordine.webhosting.exchange.total)}}</div>
            </div>
            <div v-if="ordine.progetto.isExchange && ordine.webhosting.exchange.mailuser.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webhosting.exchange.mailuser.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Account di posta Microsoft Exchange </div>
                <div>€{{formatPrice(ordine.webhosting.exchange.totalperyear)}}/anno</div>
            </div>
            <div v-if="ordine.progetto.isDomain || ordine.progetto.isHosting || ordine.progetto.isExchange" class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per domini, hosting e email </strong></div>
                <div><strong>
                    <span v-if="ordine.webhosting.total>0">€{{formatPrice(ordine.webhosting.total)}}</span>
                    <span v-if="ordine.webhosting.total>0&&ordine.webhosting.totalperyear>0"> + </span>
                    <span v-if="ordine.webhosting.totalperyear>0">€{{formatPrice(ordine.webhosting.totalperyear)}}/anno</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div v-bind:class="{ 'uk-hidden': !ordine.progetto.isWeb}">
            <h3>Web design</h3>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Design sito web (1 bozza + 2 revisioni) 4 pagine incluse</div>
                <div>€{{formatPrice(ordine.webdesign.setup.total)}}</div>
            </div>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webdesign.pages.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Pagine principali</div>
                <div><span v-if="ordine.webdesign.pages.qty<=4">incluse</span><span v-else>€{{formatPrice(ordine.webdesign.pages.total)}}</span></div>
            </div>
            <div v-if="ordine.webdesign.contents.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webdesign.contents.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Pagine secondarie</div>
                <div>€{{formatPrice(ordine.webdesign.contents.total)}}</div>
            </div>
            <div v-if="ordine.webdesign.hasBlog||ordine.webdesign.hasPortfolio||ordine.webdesign.hasJob||ordine.webdesign.hasEvents||ordine.webdesign.hasNewsletter" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webdesign.modules.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Moduli aggiuntivi ({{ordine.webdesign.modules.names}})</div>
                <div>€{{formatPrice(ordine.webdesign.modules.total)}}</div>
            </div>
            <div v-if="ordine.webdesign.translations.total>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.webdesign.translations.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Traduzione contenuti in {{ordine.progetto.languages.qty}} lingue (pagine principali + pagine secondarie + moduli)</div>
                <div>€{{formatPrice(ordine.webdesign.translations.total)}}</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per design sito web </strong></div>
                <div>
                    <strong><span v-if="ordine.webdesign.total>0">€{{formatPrice(ordine.webdesign.total)}}</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div v-bind:class="{ 'uk-hidden': !ordine.progetto.isPrivacy}">
            <h3>Privacy</h3>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.privacy.licenses.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Privacy e Cookie policy by Iubenda {{parseInt(ordine.progetto.languages.qty)+1}} lingue / {{ordine.webhosting.domain.qty}} domini</div>
                <div>€{{formatPrice(ordine.privacy.total)}} + €{{formatPrice(ordine.privacy.totalperyear)}}/anno</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per privacy e cookie</strong></div>
                <div>
                    <strong><span>€{{formatPrice(ordine.privacy.total)}} + €{{formatPrice(ordine.privacy.totalperyear)}}/anno</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div v-bind:class="{ 'uk-hidden': !ordine.progetto.isEcommerce}">
            <h3>Ecommerce</h3>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Setup piattaforma di E-commerce (Gestione Ordini, Carrello, Chekout, Spedizione, Cassa, Area ordini)</div>
                <div>€{{formatPrice(ordine.ecommerce.setup.total)}}</div>
            </div>
            <div v-if="ordine.ecommerce.modules.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.ecommerce.modules.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Moduli aggiuntivi </div>
                <div>€{{formatPrice(ordine.ecommerce.modules.total)}}</div>
            </div>
            <div v-if="ordine.ecommerce.isImportExport" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader>Import/Export</div>
            </div>
            <div v-if="ordine.ecommerce.isBookings" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader>Prenotazioni</div>
            </div>
            <div v-if="ordine.ecommerce.isEvents" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader>Eventi</div>
            </div>
            <div v-if="ordine.ecommerce.isAmazon" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader>Amazon</div>
            </div>
            <div v-if="ordine.ecommerce.isEbay" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader>Ebay</div>
            </div>
            <div v-if="ordine.ecommerce.marketplaces.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.ecommerce.marketplaces.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Integrazione di marketplaces</div>
                <div>€{{formatPrice(ordine.ecommerce.marketplaces.total)}}</div>
            </div>
            <div v-if="ordine.ecommerce.marketplaces.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.ecommerce.products.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Prodotti</div>
                <div>€{{formatPrice(ordine.ecommerce.products.total)}}</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per E-commerce</strong></div>
                <div>
                    <strong><span>€{{formatPrice(ordine.ecommerce.total)}}</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div v-bind:class="{ 'uk-hidden': !ordine.progetto.isSEO}">
            <h3>SEO</h3>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Ottimizzazione homepage</div>
                <div>€{{formatPrice(ordine.seo.total)}}</div>
            </div>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.seo.keywords}}</strong></div>
                <div class="uk-width-expand" uk-leader> Ottimizzazione chiavi di ricerca (Keywords)</div>
                <div>€{{formatPrice(ordine.seo.totalpermonth)}}/mese</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per SEO</strong></div>
                <div>
                    <strong><span>€{{formatPrice(ordine.seo.total)}} + €{{formatPrice(ordine.seo.totalpermonth)}}/mese</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div>
            <h3>Social Media</h3>
            <div v-if="ordine.socialmedia.qty>0" class="uk-grid-small" uk-grid>
                <div>N° <strong>{{ordine.socialmedia.qty}}</strong></div>
                <div class="uk-width-expand" uk-leader> Setup piattaforme social </div>
                <div>€{{formatPrice(ordine.socialmedia.total)}}</div>
            </div>
            <div v-if="ordine.socialmedia.isGoogle" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader><span uk-icon="icon: google"></span> 
                Google</div>
            </div>
            <div v-if="ordine.socialmedia.isFacebook " class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader><span uk-icon="icon: facebook"></span> 
                Facebook</div>
            </div>
            <div v-if="ordine.socialmedia.isLinkedin" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader><span uk-icon="icon: linkedin"></span> 
                LinkedIn</div>
            </div>
            <div v-if="ordine.socialmedia.isInstagram" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader><span uk-icon="icon: instagram"></span> 
                Instagram</div>
            </div>
            <div v-if="ordine.socialmedia.isPinterest" class="uk-grid-small uk-margin-left" uk-grid>
                <div class="uk-width-expand" uk-leader><span uk-icon="icon: pinterest"></span> 
                Pinterest</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per Social Media</strong></div>
                <div>
                    <strong><span>€{{formatPrice(ordine.socialmedia.total)}}</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div v-bind:class="{ 'uk-hidden': !ordine.progetto.isGraphics}">
            <h3>Logo</h3>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Design Logo (2 bozze + 1 revisione)</div>
                <div>€{{formatPrice(ordine.graphics.total)}}</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per design Logo</strong></div>
                <div>
                    <strong><span>€{{formatPrice(ordine.graphics.total)}}</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        <div v-bind:class="{ 'uk-hidden': !ordine.progetto.isMainteneance}">
            <h3>Manutenzione</h3>
            <div class="uk-grid-small" uk-grid>
                <div>N° <strong>1</strong></div>
                <div class="uk-width-expand" uk-leader> Manutenzione 
                    <span v-if="ordine.mainteneance.isOrdinaria">(aggiornamenti software, bugfix, integrità dei contenuti, supporto telefonico)</span>
                    <span v-if="ordine.mainteneance.isPerfettiva">(aggiornamenti software, bugfix, inserimento contenuti, supporto dedicato)</span>
                </div>
                <div>€{{formatPrice(ordine.mainteneance.totalperyear)}}/anno</div>
            </div>
            <div class="uk-grid-small uk-margin-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale per manutenzione</strong></div>
                <div>
                    <strong><span>€{{formatPrice(ordine.mainteneance.totalperyear)}}/anno</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>

        <div>
            <div class="uk-grid-small uk-margin-large-left uk-margin-bottom" uk-grid>
                <div class="uk-width-expand" uk-leader><strong> Totale </strong></div>
                <div>
                    <strong>
                        <span>€{{formatPrice(ordine.total)}}</span>
                        <span v-if="ordine.totalperyear>0"> + €{{formatPrice(ordine.totalperyear)}}/anno</span>
                        <span v-if="ordine.progetto.isSEO && ordine.seo.keywords>0"> + €{{formatPrice(ordine.seo.totalpermonth)}}/mese</span></strong>
                </div>
            </div>
            <div class="uk-padding-small"></div>
        </div>
        </div>
    </div>
</template>
<script>
import axios from "axios/dist/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "Riepilogo",
  components: {
    axios,
    html2canvas,
    jsPDF
  },
  data: function(){
      return{

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
            isGraphics: false,
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
            isLinkedin: false,
            isInstagram: false,
            isPinterest: false
            },
            graphics: {},
            mainteneance: {
            isOrdinaria: false,
            isPerfettiva: false
            }
        }
      };
  },
  created: async function() {
    if (this.$route.params.id) {
      this.ordineId = this.$route.params.id;
      await this.getOrdine(this.$route.params.id);
    }
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getOrdine: function(id) {
      this.isEdit = true;
      const vm = this;

      axios
        .get("https://api.ordini.zepfiro.com/ordini/" + id)
        .then(function(response) {
          vm.ordine = response.data.ordine
        })
        .catch(function(error) {});
    },
    print: function() {
        window.print();
	}
  }
}
</script>
<style>

</style>


