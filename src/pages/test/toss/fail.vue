<template>
  <v-app>
    <v-container>
      <div class="text-center">
        <h1>결제실패</h1>
        <p>{{ code }}</p>
        <p>{{ message }}</p>
      </div>
    </v-container>
  </v-app>
</template>
<script>
export default {
  layout(context) {
    return 'empty';
  },
  data() {
    return {
      code: '',
      reamessageon: '',
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.message = decodeURI(this.$route.query.message);
    console.log('message', this.message);
  }
}
</script>