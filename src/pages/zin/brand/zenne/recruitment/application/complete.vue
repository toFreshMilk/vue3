<template>
  <v-app id="container">
    <main id="contents" class="zin_page application_detail_page">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb flL">
          <ProductSnb currentCate="브랜드 이야기" :currentMenu="currentMenu" :menuData="snb" :BannerShow="false" />
        </aside>
        <article class="divider_cnt flR">
          <section class="application_complete_wrap">
            <img src="/img/common/@_order_complete.png" class="order_complete_img">
            <h3>지원서가 최종 제출되었습니다.</h3>
            <div class="btn_group">
              <button class="btn strong h_l">메인 바로가기</button>
            </div>
          </section>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import ProductSnb from "~/components/zinBrand/brandSnb";

export default {
  layout:"default",
  name: "application",
  components:{
    ProductSnb,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  data(){
    return{
      currentMenu: {
        name: {
          dep1: "",
          dep2: "",
          dep3: "",
          dep4: "",
        },
        state: {
          dep1: false,
          dep2: false,
          dep3: false,
          dep4: false,
        },
      },
      snb: [
        {
          name: "브랜드 이야기",
          link: "/zin/brand/",
          dep2: [
            {
              name: "지인 소개",
              link: "/zin/brand/about/",
            },
            {
              name: "지인 TV",
              link: "/zin/brand/tv/",
            },
            {
              name: "뉴스레터",
              link: "/zin/brand/news/",
            },
            {
              name: "프로슈머 지엔느",
              link: "/zin/brand/zenne/activity/",
              dep3: [
                {
                  name: "지엔느 소개",
                  link: "/zin/brand/zenne/",
                },
                {
                  name: "지엔느 활동",
                  link: "/zin/brand/zenne/activity/",
                },
                {
                  name: "지엔느 모집 안내",
                  link: "/zin/brand/zenne/recruitment/",
                },
              ],
            },
          ],
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>