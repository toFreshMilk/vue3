<template>
  <v-app id="container">
      <br>
      <br>
      <div   @click="on"> 뒤로 </div>
      <br>
      <br>
  </v-app>
</template>

<script>
export default {
  layout: "default",
  name: "index",
  components: {
   
  },
  created() {
    
  },
  data() {
    return {
    
    };
  },
  methods: {
      on(){
          window.history.back();
      }
  },
  async mounted() {
   
  },
  beforeDestroy() {
    
  },
};
</script>

<style scoped>

</style>