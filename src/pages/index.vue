<template>
  <v-app id="container">
    <div id="contents" class="myhome_page detail_page">
      <h1>pages/index.vue</h1>
      <ul>
        <li><nuxt-link to="/styling/myhome/">홈>인테리어>시공사례>내가 꾸민 우리집</nuxt-link></li>
        <li><nuxt-link to="/styling/style-trend/">홈-스타일링>스타일링 트렌드</nuxt-link></li>
        <li><nuxt-link to="/store/category/">스토어>카테고리</nuxt-link></li>
        <li><nuxt-link to="/store/order/store-order-payment-member">주문서</nuxt-link></li>
        <li><nuxt-link to="/test/toss/pay">토스테스트결제</nuxt-link></li>
        <li><nuxt-link to="/zin/exhibition">전시매장찾기</nuxt-link></li>        
      </ul>
     </div>
  </v-app>
</template>

<script>
// import API from "@/fetchSheets";

export default {
  // layout: 'example',
  components: {
  },
  data() {
    return {
    };
  },
  head() {
    return {
      title: "메인",
    };
  },
  methods: {
  },
  /**
   * nuxt lifecycle 참고
   * https://nuxtjs.org/docs/2.x/concepts/nuxt-lifecycle/
   */
  async asyncData({ app, $device, redirect }) {
    console.log('asyncData()');
    // *** API 호출 샘플, fetch()에서 호출하면 return할 필요 없이 바로 this.변수명 = 값 으로 대입 가능! ***
    // try {
    //   const res = await app.fetch({
    //     api: { path: "svc/banner/rBanner" },
    //   });

    //   if (res.data.result != "200") {
    //     throw get(res, "data.resultMessage", "error");
    //   }

    //   const bannerData = get(res, "data.items", []);
    //   // bannerData["2"].videoUrl = "https://player.vimeo.com/external/524772558.sd.mp4?s=8928ce7747e1d1ae578e7e61166011d439fcd42d&profile_id=165";
    //   const res2 = await app.fetch({
    //     api: {
    //       path: API.RECOMMEND_HOMESTYLING.path,
    //       method: API.RECOMMEND_HOMESTYLING.method,
    //     },
    //   });

    //   if (res2.data.result != "200") {
    //     throw get(res, "data.resultMessage", "error");
    //   }

    //   const swipeListData = get(res2, "data.items", []);

    //   return {
    //     mvItems: bannerData,
    //     totalSlide: bannerData.length || 0,
    //     swipeItems: swipeListData,
    //   };
    // } catch (e) {
    // }
  },
  async fetch() {
    // try {
    //   this.isLoading = true;
    //   const params = {
    //     pageSize: 10,
    //     page: this.currentPage,
    //   };
    //   const styleTag = map(this.styletag, "value");
    //   const res = await this.$nuxt.$fetch({
    //     api: { path: "/svc/proStyle/similarStyle" },
    //     query: {
    //       ...params,
    //       styletag: styleTag.toString(),
    //       mainYn: "N",
    //     },
    //   });
    //   if (res.data.result != "200") {
    //     this.isStopInfinite = true;
    //     throw this.$get(res, "data.resultMessage", "error");
    //   }

    //   const currentPage = this.$get(res, "data.currentPage");
    //   const pageCount = this.$get(res, "data.pageCount");

    //   if (currentPage === pageCount) {
    //     this.isStopInfinite = true;
    //   }
    //   const itemData = this.$get(res, "data.items", []);
    //   const filteredItemData = itemData.filter(
    //     (item) => item.id !== this.stylingId
    //   );
    //   this.listItemData.push(...filteredItemData);

    // } catch (e) {
    //   this.isStopInfinite = true;
    //   // this.$nuxt.$emit("openSnack", e.message || e);
    // } finally {
    //   this.isLoading = false;
    // }
    console.log('fetch()');
  },
  mounted() {
    console.log('mounted()');
  },
  created() {
    console.log('created()');
    // this.$nuxt.$emit('header', {
    //   headerBanner:false,
    //   subHeader:true,
    //   pageTitle:'브라운 컬러의 오픈형 주방으로 더욱 넓고 화사해진 인테리어',
    // });
  }
};
</script>

<style>
/* @import "assets/css/main.css"; */
</style>
