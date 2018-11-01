
</<template>
        <div class="uk-child-width-expand@s" uk-grid>
            <div class="uk-width-1-2">
                <label class="uk-form-label">Azienda</label>
                <input class="uk-input" type="text" v-model="anagrafica.azienda" placeholder="Azienda">
            </div>
            <div class="uk-width-1-2">
                <label class="uk-form-label">Referente</label>
                <input class="uk-input" type="text" v-model="anagrafica.referente" placeholder="Referente">
            </div>
            <div class="uk-width-1-2">
                <label class="uk-form-label">Telefono</label>
                <input class="uk-input" type="tel" v-model="anagrafica.telefono" placeholder="Telefono">
            </div>
            <div class="uk-width-1-2">
                <label class="uk-form-label">Email</label>
                <input class="uk-input" type="email" v-model="anagrafica.email" placeholder="Email">
            </div>
        </div>
</template>
<script>
export default {
    name:"Anagrafica",
    props:{
        input:Object
    },
    data:function(){
        return {
            anagrafica: this.input
        }
    },
    methods:{

    }
}
</script>
<style>
</style>


