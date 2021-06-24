<template>
  <div id="wrapper">
    <Header
      :pageClass="pageClass"
      :headerBanner="headerBanner"
      :detailPageTitle="detailPageTitle"
    />
    <Nuxt/>
    <div class="snackbar_wrap"></div>
    <div class="modal_wrap"></div>
    <Footer />
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
  },
  data() {
    return {
      detailPageTitle: null,
      pageClass: "",
      headerBanner: false,
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
        this.detailPageTitle = detailPageTitle
        this.pageClass = pageClass || "";
        this.headerBanner = headerBanner === true ? true : false;
      },
    );
  },
  methods:{
    progressBar() {
      let currentBar = document.querySelector('.progress_bar span.current')
      let detailHeadHeight = document.querySelector('.detail_head').clientHeight
      let footerHeight = document.querySelector('#footer').clientHeight
      let contents = document.querySelector('#contents')
      let headerHeight = document.querySelector('header').clientHeight
      let contentsH = contents.clientHeight
      let winH = window.innerHeight
      let st
      let percent = 1
      let progress
      let base
      window.addEventListener('scroll', function () {
        st = window.pageYOffset;
        progress = st - detailHeadHeight
        base = contentsH - winH - footerHeight - headerHeight - 250
        if (progress < 0) {
          progress = 0
        }
        percent = (progress / base) * 100
        currentBar.style.width = percent + '%'
      })
    },

  },
  async mounted() {
    await this.$nextTick();
    if(this.detailPageTitle != null){
      this.progressBar()
    }
  },
}
</script>