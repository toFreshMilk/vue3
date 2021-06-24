<template>
  <div id="wrapper">
    <Header
      :pageClass="headerPageClass"
      :headerBanner="headerBanner"
      :detailPageTitle="headerPageTitle"
    />
    <v-app id="container">
      <main id="contents" :class="mainClass">
        <div v-if="showHeadImg" class="head_bg" style="background-image: url('/img/zin/img_zin_head_bg_01.png')"></div>
        <div class="mid_inner clearFix">
          <aside class="snb_sec divider_snb flL">
            <ProductSnb 
              :currentMenu="currentMenu" 
              :menuData="snb" 
              :bannerShow="true" 
            />
          </aside>
          <Nuxt/>
        </div>
        <div class="wallpaper_footer" v-if="false">
          <aside class="lnb_wrap">
            <ZinFloatingBar />
          </aside>
        </div>
      </main>    
    </v-app>
    <Footer />
    <div class="snackbar_wrap"></div>
    <div class="modal_wrap"> </div>
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import ProductSnb from "~/components/product/ProductSnb";
import ZinFloatingBar from "~/components/product/ZinFloatingBar";
import { mapState } from "vuex";

export default {
  name: "withLNB",
  components: {
    Header,
    Footer,
    ProductSnb,
    ZinFloatingBar,
  },
  head: {
    title: "Lx Zin",
    script: [
      { src: '/js/dialog.js' },
    ],
  },
  data() {
    return {
      headerPageTitle:null,
      headerPageClass: "",
      headerBanner: true,
      mainClass: "",
      currentMenu: {  //선택된 카테고리
        category: {
          dep1: "",
          dep2: "",
          dep3: "",
        },
        state: {    //하위 카테고리를 열건지 말건지
          dep1: false,
          dep2: false,  
          dep3: false,
        },
      },
      showHeadImg: false,     //상단 이미지 표시 여부  
    };
  },
  computed: {
    ...mapState({
      snb: (state) => state.productCategory.categoryList,
    }),
  },
  created() {
    this.$nuxt.$on(
      "lnbHeader",
      ({
         headerPageTitle,
         headerPageClass,    //필수
         headerBanner,
         mainClass,
         currentMenu,        //필수
         showHeadImg,
       }) => {
        this.headerPageTitle = headerPageTitle;
        this.headerPageClass = headerPageClass || "";
        this.headerBanner = headerBanner === true ? true : false;
        this.mainClass = mainClass || this.pageClass;
        this.currentMenu = currentMenu;
        this.showHeadImg = showHeadImg;
      },
    );
  },
}
</script>
<style>

</style>
