<template>
  <div class="uk-text-center">
    <h1>Zepfiro modulo ordini</h1>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: 'HelloWorld',
    props: ['auth','authenticated'],
    beforeMount:function(){
      if(this.authenticated){
        router.push('/ordini');
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
