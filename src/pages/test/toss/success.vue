<template>
  <v-app>
    <v-container>
      <h1 class="text-center" v-if="paying">
        결제중...
        <v-text-field
          color="success"
          loading
          disabled
        ></v-text-field>
      </h1>
      <div v-else>
        <h1>결제 성공!</h1>
        {{ result }}
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
      paying: true,
      result: {}
    };
  },
  async fetch() {
    console.log('$route.query', this.$route.query);
    const res = await this.$nuxt.$fetch({
      api: { 
        path: "/jdbcTest/payGrantReq",
        method: 'post'
      },
      data: this.$route.query,
      // data: {
      //   paymentKey: '',
      //   orderId: '',
      //   amount: '',
      // },

      // query: {
      // },
    });
    console.log('res', res);
    this.paying = false;
    this.result = res.data;
  }
}
</script>