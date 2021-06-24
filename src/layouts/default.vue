<template>
  <div id="wrapper">
    <Header
      :pageClass="pageClass"
      :headerBanner="headerBanner"
      :detailPageTitle="detailPageTitle"
    />
    <Nuxt/>
    <Footer />
    <div class="snackbar_wrap"></div>
    <div class="modal_wrap"> </div>
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
export default {
  components: {
    Header,
    Footer,
  },
  head: {
    title: "Lx Zin",
    script: [
      { src: '/js/dialog.js' },
    ],
  },
  data() {
    return {
      detailPageTitle:null,
      pageClass: "",
      headerBanner: true,
    };
  },
  created() {
    this.$nuxt.$on(
      "Header",
      ({
         detailPageTitle,
         pageClass,
         headerBanner,
       }) => {
        this.detailPageTitle = detailPageTitle;
        this.pageClass = pageClass || "";
        this.headerBanner = headerBanner === true ? true : false;
      },
    );
  },
}
</script>
<style>

</style>
