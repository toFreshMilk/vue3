<template>
  <v-app>
    <v-container>
      <h1>결제</h1>
      <v-divider class="my-2"/>
      <div>        
        <v-btn color="primary" @click="payByCreditCard">
          신용카드 결제
        </v-btn>
        <v-btn color="primary" @click="transfer">
          계좌이체
        </v-btn>
        <v-btn color="primary" @click="payByToss">
          토스 결제
        </v-btn>
        <v-btn color="primary" @click="payBySamsung">
          삼성 페이
        </v-btn>
        <v-btn color="primary" @click="payByPayco">
          페이코
        </v-btn>
        <v-btn color="primary" @click="payByVirtualAccount">
          가상계좌
        </v-btn>
        <!-- <v-btn @click="autoPay">
          자동결제
        </v-btn> -->
      </div>

      <h1 class="mt-5">기타</h1>
      <v-divider class="my-2"/>
      <div>
        <!-- <v-btn @click="cancel">
          결제취소
        </v-btn> -->
        <v-btn v-get-post-code="getPostCode">
          배송지
        </v-btn>        
      </div>
    </v-container>
  </v-app>
</template>
<script>
import { loadTossPayments } from '@tosspayments/sdk';
 
const clientKey = 'test_ck_OEP59LybZ8Bdv6A1JxkV6GYo7pRe';

export default {
  layout(context) {
    console.log('hi layout!');
    return 'empty';
  },
  data() {
    return {
      tossPayments: null,
    };
  },
  methods: {
    transfer() {
      this.tossPayments.requestPayment('계좌이체', {
        amount: 15000,
        orderId: 'A_bMi0QCiK_OXyjYZmCMf',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
      });
    },
    getPostCode(data) {
      console.log('data', data);
      let address = data.address;
      if(data.extraAddress) {
        address += `(${data.extraAddress})`;
      }
      console.log(address);
    },
    payByCreditCard() {
      this.tossPayments.requestPayment('카드', {
        amount: 15000,
        orderId: 'A_bMi0QCiK_OXyjYZmCMf',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
      });
    },
    payByToss() {
      this.tossPayments.requestPayment('카드', {
        amount: 15000,
        orderId: 'A_bMi0QCiK_OXyjYZmCMf',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
        easyPay: 'TOSSPAY',
        flowMode: 'DIRECT'
      });
    },
    payBySamsung() {
      this.tossPayments.requestPayment('카드', {
        amount: 15000,
        orderId: 'A_bMi0QCiK_OXyjYZmCMf',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
        easyPay: 'SAMSUNGPAY',
        flowMode: 'DIRECT'
      });
    },
    payByPayco() {
      this.tossPayments.requestPayment('카드', {
        amount: 15000,
        orderId: 'A_bMi0QCiK_OXyjYZmCMf',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
        easyPay: 'PAYCO',
        flowMode: 'DIRECT'
      });
    },
    payByVirtualAccount() {
      this.tossPayments.requestPayment('가상계좌', {
        amount: 15000,
        orderId: 'zqlmtvN-BDtbxzJXkgEHF',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
      });
    },
    autoPay() {
      this.tossPayments.requestBillingAuth('카드', {
        customerKey: 'uGS9Uy3O3MS3Ii8bz9Ghl',
        successUrl: window.location.origin + '/test/toss/success',
        failUrl: window.location.origin + '/test/toss/fail',
      });
    },
    // async cancel() {
    //   const res = await this.$nuxt.$fetch({
    //     api: { 
    //       path: "/jdbcTest/payCancelOrder?paymentKey=123123123&cancelReason=고객이 취소 원함&cancelAmount=10000",
    //       method: 'get'
    //     },
    //   });
    //   console.log('res', res);
    // }
  },
  async mounted() {
    // this.$nuxt.$emit('header', {
    //   headerBanner: true,
    //   subHeader: true,
    //   pageTitle: '브라운 컬러의 오픈형 주방으로 더욱 넓고 화사해진 인테리어',
    // });

    this.tossPayments = await loadTossPayments(clientKey);
  },
}
</script>