<template>
    <div>
        
        <div class="uk-background-secondary uk-padding noprint">
            <img src="https://www.zepfiro.com/wp-content/uploads/2018/08/zepfiro-logo-or-or-white.png" style="width:150px; max-width:150px;">
            <router-link :to="{ name: 'ElencoOrdini'}" class="uk-button uk-button-default"><span uk-icon="icon: list"></span>  Elenco</router-link>
            <router-link :to="{ name: 'Ordine', params: { id: $route.params.id }}" class="uk-button uk-button-default"><span uk-icon="icon: file-edit"></span>  Modifica</router-link>
            <button type="button" class="uk-button uk-button-default" v-on:click="print()"><span uk-icon="icon: file-pdf"></span>  Stampa PDF</button>
        </div>
        <div class="uk-padding">
            <div id="printarea" class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="information">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        <img src="https://www.zepfiro.com/wp-content/uploads/2018/08/zepfiro-logo-or-or-color.png" style="width:100px; max-width:100px;">
                                        <h5>Higrow Srl</h5>
                                        <p><small>via Monte Popera 4<br>
                                        San Donà di Piave, 30027<br></small></p>
                                    </td>
                                    
                                    <td>
                                                                                        Preventivo #: {{ordineId}} <span v-if="date!=null"> del {{date.getUTCDate()}}/{{(date.getMonth()+1)}}/{{date.getFullYear()}}</span><br>
                                        <h5 class="uk-text-right" v-if="ordine.anagrafica.azienda">{{ordine.anagrafica.azienda}}</h5>
                                        <p class="uk-text-right">
                                            <small>

                                            <span v-if="ordine.anagrafica.referente">{{ordine.anagrafica.referente}}<br></span>
                                            <span v-if="ordine.anagrafica.telefono">t: {{ordine.anagrafica.telefono}}</span>
                                            <span v-if="ordine.anagrafica.telefono && ordine.anagrafica.email"><br></span>
                                            <span v-if="ordine.anagrafica.email">e: {{ordine.anagrafica.email}}</span>
                                            </small>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                                <h3>{{ordine.progetto.titolo}}</h3>
                                <p>{{ordine.progetto.descrizione}}</p>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !(ordine.progetto.isDomain || ordine.progetto.isHosting || ordine.progetto.isExchange)}">
                        <td>Hosting, domini e mail</td>
                        <td></td>
                    </tr>
                    <tr v-if="ordine.progetto.isDomain && ordine.webhosting.domain.totalperyear>0" class="item">
                        <td>N° <strong>{{ordine.webhosting.domain.qty}}</strong> Registrazione/Trasferimento dominio ({{ordine.webhosting.domain.names}})</td>
                        <td>€{{formatPrice(ordine.webhosting.domain.totalperyear)}}/anno</td>
                    </tr>
                    <tr v-if="ordine.progetto.isHosting && ordine.webhosting.hosting.host.totalperyear>0" class="item">
                        <td>N° <strong>1</strong> Hosting web <span v-if="ordine.webhosting.domain.qty==1">Singolo Dominio</span><span v-else>Multidominio</span></td>
                        <td>€{{formatPrice(ordine.webhosting.hosting.host.totalperyear)}}/anno</td>
                    </tr>
                    <tr v-if="ordine.webhosting.hosting.mailbox.isCaselle && ordine.webhosting.hosting.mailbox.qty>0" class="item">
                        <td>N° <strong>{{ordine.webhosting.hosting.mailbox.qty}}</strong> Caselle di posta standard IMAP,POP3,SMTP </td>
                        <td>€{{formatPrice(ordine.webhosting.hosting.mailbox.totalperyear)}}/anno</td>
                    </tr>
                    <tr v-if="ordine.progetto.isExchange && ordine.webhosting.exchange.total>0" class="item">
                        <td>N° <strong>1</strong> Setup una tantum Microsoft Exchange </td>
                        <td>€{{formatPrice(ordine.webhosting.exchange.total)}}</td>
                    </tr>
                    <tr v-if="ordine.progetto.isExchange && ordine.webhosting.exchange.mailuser.qty>0" class="item">
                        <td>N° <strong>{{ordine.webhosting.exchange.mailuser.qty}}</strong> Account di posta Microsoft Exchange </td>
                        <td>€{{formatPrice(ordine.webhosting.exchange.totalperyear)}}/anno</td>
                    </tr>
                    <tr v-if="ordine.progetto.isDomain || ordine.progetto.isHosting || ordine.progetto.isExchange" class="total">
                        <td><strong> Totale per domini, hosting e email </strong></td>
                        <td><strong>
                            <span v-if="ordine.webhosting.total>0">€{{formatPrice(ordine.webhosting.total)}}</span>
                            <span v-if="ordine.webhosting.total>0&&ordine.webhosting.totalperyear>0"><br> + </span>
                            <span v-if="ordine.webhosting.totalperyear>0">€{{formatPrice(ordine.webhosting.totalperyear)}}/anno</span></strong>
                        </td>
                    </tr>





                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isWeb}">
                        <td colspan="2">Web design</td>
                    </tr>
                    <tr class="item" v-bind:class="{ 'uk-hidden': !ordine.progetto.isWeb}">
                        <td>N° <strong>1</strong> Design sito web (1 bozza + 2 revisioni)</td>
                        <td>€{{formatPrice(ordine.webdesign.setup.total)}}</td>
                    </tr>
                    <tr class="item" v-bind:class="{ 'uk-hidden': !ordine.progetto.isWeb}">
                        <td>N° <strong>{{parseInt(ordine.webdesign.pages.qty)+parseInt(ordine.webdesign.contents.qty)}}</strong> Pagine totali</td>
                        <td>€{{formatPrice(ordine.webdesign.pages.total+ordine.webdesign.contents.total)}}</td>
                    </tr>
                    <tr v-if="ordine.webdesign.hasBlog||ordine.webdesign.hasPortfolio||ordine.webdesign.hasJob||ordine.webdesign.hasEvents||ordine.webdesign.hasNewsletter" class="item">
                        <td>N° <strong>{{ordine.webdesign.modules.qty}}</strong> Moduli aggiuntivi ({{ordine.webdesign.modules.names}})</td>
                        <td>€{{formatPrice(ordine.webdesign.modules.total)}}</td>
                    </tr>
                    <tr v-if="ordine.webdesign.translations.total>0" class="item">
                        <td>N° <strong>{{ordine.webdesign.translations.qty}}</strong> Multilingua per {{ordine.progetto.languages.qty}} lingue (pagine principali + pagine secondarie + moduli)</td>
                        <td>€{{formatPrice(ordine.webdesign.translations.total)}}</td>
                    </tr>
                    <tr class="total" v-bind:class="{ 'uk-hidden': !ordine.progetto.isWeb}">
                        <td><strong> Totale per design sito web </strong></td>
                        <td>
                            <strong><span v-if="ordine.webdesign.total>0">€{{formatPrice(ordine.webdesign.total)}}</span></strong>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isPrivacy}">
                        <td colspan="2">Privacy</td>
                    </tr>
                    <tr class="item" v-bind:class="{ 'uk-hidden': !ordine.progetto.isPrivacy}">
                        <td>N° <strong>1</strong> Setup Privacy e Cookie policy by Iubenda {{parseInt(ordine.progetto.languages.qty)+1}} lingue / {{ordine.webhosting.domain.qty}} domini</td>
                        <td>€{{formatPrice(ordine.privacy.total)}}</td>
                    </tr>
                    <tr class="item" v-bind:class="{ 'uk-hidden': !ordine.progetto.isPrivacy}">
                        <td>N° <strong>{{ordine.privacy.licenses.qty}}</strong> Licenze per {{parseInt(ordine.progetto.languages.qty)+1}} lingu<span v-if="parseInt(ordine.progetto.languages.qty)==0">a</span><span v-else>e</span><span v-if="ordine.webhosting.domain.qty>0"> / {{ordine.webhosting.domain.qty}} domini</span><span v-if="ordine.webhosting.domain.qty==1">o</span></td>
                        <td>€{{formatPrice(ordine.privacy.totalperyear)}}/anno</td>
                    </tr>
                    <tr class="total" v-bind:class="{ 'uk-hidden': !ordine.progetto.isPrivacy}">
                        <td><strong> Totale per privacy e cookie</strong></td>
                        <td> 
                            <strong><span>€{{formatPrice(ordine.privacy.total)}}<br> + €{{formatPrice(ordine.privacy.totalperyear)}}/anno</span></strong>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isEcommerce}">
                        <td colspan="2">Ecommerce</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isEcommerce}" class="item">
                        <td>N° <strong>1</strong> Setup piattaforma di E-commerce (Gestione Ordini, Carrello, Chekout, Spedizione, Cassa, Area ordini)</td>
                        <td>€{{formatPrice(ordine.ecommerce.setup.total)}}</td>
                    </tr>
                    <tr v-if="ordine.ecommerce.modules.qty>0" class="item">
                        <td>N° <strong>{{ordine.ecommerce.modules.qty}}</strong> Moduli aggiuntivi (
                            <span v-if="ordine.ecommerce.isImportExport" class="item">
                                Import/Export 
                            </span>
                            <span v-if="ordine.ecommerce.isBookings" class="item">
                                Prenotazioni 
                            </span>
                            <span v-if="ordine.ecommerce.isEvents" class="item">
                                Eventi 
                            </span>
                            <span v-if="ordine.ecommerce.isAmazon" class="item">
                                Amazon 
                            </span>
                            <span v-if="ordine.ecommerce.isEbay" class="item">
                                Ebay 
                            </span>
                        )
                        </td>
                        <td>€{{formatPrice(ordine.ecommerce.modules.total)}}</td>
                    </tr>
                    <tr v-if="ordine.ecommerce.marketplaces.qty>0" class="item">
                        <td>N° <strong>{{ordine.ecommerce.marketplaces.qty}}</strong> Integrazione di marketplaces</td>
                        <td>€{{formatPrice(ordine.ecommerce.marketplaces.total)}}</td>
                    </tr>
                    <tr v-if="ordine.ecommerce.products.qty>0" class="item">
                        <td>N° <strong>{{ordine.ecommerce.products.qty}}</strong> Dataentry prodotti</td>
                        <td>€{{formatPrice(ordine.ecommerce.products.total)}}</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isEcommerce}" class="total">
                        <td><strong> Totale per E-commerce</strong></td>
                        <td>
                            <strong><span>€{{formatPrice(ordine.ecommerce.total)}}</span></strong>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isSEO}">
                        <td colspan="2">SEO</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isSEO}" class="item">
                        <td>N° <strong>1</strong> Ottimizzazione homepage</td>
                        <td>€{{formatPrice(ordine.seo.total)}}</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !parseInt(ordine.seo.keywords)>0}" class="item">
                        <td>N° <strong>{{ordine.seo.keywords}}</strong> Ottimizzazione chiavi di ricerca (Keywords)</td>
                        <td>€{{formatPrice(ordine.seo.totalpermonth)}}/mese</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isSEO}" class="total">
                        <td><strong> Totale per SEO</strong></td>
                        <td>
                            <strong><span>€{{formatPrice(ordine.seo.total)}}</span><span v-if="parseInt(ordine.seo.keywords)>0"> + €{{formatPrice(ordine.seo.totalpermonth)}}/mese</span></strong>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isSocial}">
                        <td colspan="2">Social Media</td>
                    </tr>
                    <tr v-if="ordine.socialmedia.qty>0" class="item">
                        <td>N° <strong>{{ordine.socialmedia.qty}}</strong> Setup piattaforme social
                                (<span uk-icon="icon: google; ratio:0.6" v-if="ordine.socialmedia.isGoogle">Google </span> 
                                
                                <span uk-icon="icon: facebook; ratio:0.6" v-if="ordine.socialmedia.isFacebook">Facebook </span> 
                                
                                <span uk-icon="icon: instagram; ratio:0.6" v-if="ordine.socialmedia.isInstagram">Instagram </span> 
                                
                                <span uk-icon="icon: youtube; ratio:0.6" v-if="ordine.socialmedia.isYoutube">Youtube </span> 
                                
                                <span uk-icon="icon: linkedin; ratio:0.6" v-if="ordine.socialmedia.isLinkedin">LinkedIn </span> 
                                
                                <span uk-icon="icon: pinterest; ratio:0.6" v-if="ordine.socialmedia.isPinterest">Pinterest </span>)
                                
                        </td>
                        <td>€{{formatPrice(ordine.socialmedia.total)}}</td>
                    </tr>
                    <tr class="total" v-bind:class="{ 'uk-hidden': !ordine.progetto.isSocial}">
                        <td><strong> Totale per Social Media</strong></td>
                        <td>
                            <strong><span>€{{formatPrice(ordine.socialmedia.total)}}</span></strong>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isLogo}">
                        <td colspan="2">Logo</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isLogo}" class="item">
                        <td>N° <strong>1</strong> Design Logo (2 bozze + 1 revisione)</td>
                        <td>€{{formatPrice(ordine.graphics.logo.total)}}</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isCoordinato}" class="item">
                        <td>N° <strong>1</strong> Design Coordinato (Brand indentity)</td>
                        <td>€{{formatPrice(ordine.graphics.coordinato.total)}}</td>
                    </tr>
                    <tr v-bind:class="{ 'uk-hidden': !ordine.progetto.isLogo && !ordine.progetto.isCoordinato}" class="total">
                        <td><strong> Totale per Grafica</strong></td>
                        <td>
                            <strong><span>€{{formatPrice(ordine.graphics.total)}}</span></strong>
                        </td>
                    </tr>
                    <tr class="heading" v-bind:class="{ 'uk-hidden': !ordine.progetto.isMainteneance}">
                        <td colspan="2">Manutenzione</td>
                    </tr>
                    <tr class="item" v-bind:class="{ 'uk-hidden': !ordine.progetto.isMainteneance}">
                        <td>N° <strong>1</strong> Manutenzione 
                            <span v-if="ordine.mainteneance.isOrdinaria">(aggiornamenti software, bugfix, integrità dei contenuti, supporto telefonico)</span>
                            <span v-if="ordine.mainteneance.isPerfettiva">(aggiornamenti software, bugfix, inserimento contenuti, supporto dedicato)</span>
                        </td>
                        <td>€{{formatPrice(ordine.mainteneance.totalperyear)}}/anno</td>
                    </tr>
                    <tr class="total" v-bind:class="{ 'uk-hidden': !ordine.progetto.isMainteneance}">
                        <td><strong> Totale per manutenzione</strong></td>
                        <td>
                            <strong><span>€{{formatPrice(ordine.mainteneance.totalperyear)}}/anno</span></strong>
                        </td>
                    </tr>
                    <!--totale-->
                    <tr class="item">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr class="total">
                        <td><strong> Totale </strong></td>
                        <td>
                            <strong>
                                <span>€{{formatPrice(ordine.total)}}</span></strong>
                                <span v-if="ordine.totalperyear>0"><br> + €{{formatPrice(ordine.totalperyear)}}/anno</span>
                                <span v-if="ordine.progetto.isSEO && ordine.seo.keywords>0"> + €{{formatPrice(ordine.seo.totalpermonth)}}/mese</span>
                        </td>
                    </tr>
                    <tr class="total">
                        <td colspan="2">
                                Anticipo 50%, saldo alla consegna
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <h4>oppure scegli <strong>Formula "0"</strong></h4>
                            <p>Tutto quanto pagando mese per mese senza costi iniziali e d'ora in avanti il tuo sito è sempre aggiornato (impegno minimo 12 mesi)</p>
                            <p>
                            
                                <span>Anticipo <strong>€{{formatPrice(0)}}</strong> e paghi solo </span>
                                <strong><span style="font-size:20px;"> €{{formatPrice(ordine.formulaZero)}}/mese</span></strong></p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios/dist/axios";


export default {
  name: "Riepilogo",
  components: {
    axios
  },
  data: function(){
      return{
        date:Date.now(),
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
                isCoordinato:false,
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
    }else{
        this.$parent.title = 'Riepilogo ordine';
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
            vm.date = new Date(vm.ordine.createdAt);
            vm.$parent.title = vm.ordine.fileid;
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
h1,h2,h3,h4,h5,h6,p{
    margin-top:0px;
    margin-bottom:10px;
}
    .invoice-box {
        max-width: 800px;
        margin: auto;
        font-size: 11px;
        line-height: 14px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 3px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
        max-width: 100px;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 10px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 36px;
        line-height: 36px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 10px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 10px;
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
    }
    
    .invoice-box table tr.total td:nth-child(1) {
        text-align: right;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
</style>


