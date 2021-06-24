<template>
  <div id="wrapper">
    <Header
      :depthNum="depthNum"
      :pageClass="pageClass"
      :headerBanner="headerBanner"
      :pageTitle="pageTitle"
      :subHeader="subHeader"
    />
    <Nuxt />
    <Footer />
    <div class="snackbar_wrap"></div>
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
  data() {
    return {
        depthNum: '',
        pageClass: '',
        headerBanner: true,
        pageTitle: '',
        subHeader: false,
    };
  },
  created() {
    this.$nuxt.$on(
      'header',
      ({
        depthNum= '',
        pageClass = '',
        headerBanner = true,
        pageTitle = '',
        subHeader= false,
      }) => {
        this.depthNum = depthNum;
        this.pageClass = pageClass;
        this.headerBanner = headerBanner;
        this.pageTitle = pageTitle;
        this.subHeader = subHeader;
        // alert('hello emit!');
      }
    );
  },
  beforeDestroy() {
    this.$nuxt.$off("header");
  },
};
</script>