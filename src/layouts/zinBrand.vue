<template>
  <div id="wrapper">
    <Header
      :pageClass="pageClass"
      :headerBanner="headerBanner"
      :detailPageTitle="detailPageTitle"
    />
    <v-app id="container">
      <main id="contents" class="zin_page recruitment_detail_page">
        <div class="mid_inner clearFix">
          <aside class="snb_sec divider_snb flL">
            <ProductSnb
              currentCate="브랜드 이야기"
              :currentMenu="currentMenu"
              :menuData="snb"
              :BannerShow="false"
            />
          </aside>
          <Nuxt />
        </div>
      </main>
    </v-app>
    <Footer />
    <div class="snackbar_wrap"></div>
    <div class="modal_wrap"></div>
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import ProductSnb from "~/components/zinBrand/brandSnb";
import snb from "~/assets/data/brandSnb.json";
export default {
  components: {
    Header,
    Footer,
    ProductSnb,
  },
  head: {
    title: "Lx Zin",
    script: [{ src: "/js/dialog.js" }],
  },
  data() {
    return {
      detailPageTitle: null,
      pageClass: "",
      headerBanner: true,
      snb: snb,
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
    };
  },
  created() {
    this.$nuxt.$on("Header", ({ detailPageTitle, pageClass, headerBanner }) => {
      this.detailPageTitle = detailPageTitle;
      this.pageClass = pageClass || "";
      this.headerBanner = headerBanner === true ? true : false;
    });
  },
};
</script>
<style>
</style>
