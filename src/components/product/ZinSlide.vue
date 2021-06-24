<template>
  <div :class="slideName" class="post_banner_wrap zin_slide_wrap">
    <div class="banner_inner zin_slide_inner">
      <client-only>
        <swiper ref="mvImg" class="post_banner_group img_slide_group" :options="imgOptions">
          <swiper-slide v-for="(item, i) in bannerItems" :key="'post_img_'+ i" class="post_banner_item zin_slide_item">
            <div class="thumb_area">
              <figure class="thumb" :style="'background-image: url('+ item.img+');'"></figure>
            </div>
            <div v-if="isScrap" class="scrap_area">
              <button @click="toggleScrap(item.itemID)"
                      class="btn scrap_btn ic_before"></button>
                      <!-- :class="$parent.$parent.myScrapData.indexOf(item.itemID) !== -1 ? 'is_active':''" -->
            </div>
          </swiper-slide>
        </swiper>
        <swiper ref="mvTxt" class="post_banner_group text_slide_group" :options="txtOptions">
          <swiper-slide class="full_banner_item zin_slide_item " v-for="(item, k) in bannerItems" :key="'post_txt_'+ k">
            <div class="txt_group">
              <div class="ttl_area">
                <strong>{{ item.title }}</strong>
              </div>
              <div class="txt_area">
                <p>{{ item.text }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div v-if="hasPagination" class="zin_slide_pagination_group">
          <div class="zin_slide_pagination type_dots" />
        </div>
        <div class="zin_arw_group">
          <button class="zin_banner_arw arr_prev">
            <i class="arw"
               :class="arwType === 'white' ? 'arw_big_left_w': arwType === 'black' ? 'arw_big_left':'arw_mid_left'"></i>
          </button>
          <button class="zin_banner_arw arr_next">
            <i class="arw"
               :class="arwType === 'white' ? 'arw_big_right_w': arwType === 'black' ? 'arw_big_right':'arw_mid_right'"></i>
          </button>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZinSlide",
  data() {
    return {
      imgOptions: {
        loop: true,
        autoplay: this.playTime,
        navigation: {
          nextEl: `.${this.slideName} .arr_next`,
          prevEl: `.${this.slideName} .arr_prev`,
        },
      },
      txtOptions: {
        loop: true,
        // mode: "fade",
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        pagination: {
          el: `.${this.slideName} .zin_slide_pagination`,
          clickable: true,
        },
        autoplay: this.playTime,
      },
      playTime: false,
      currentSlide: 1,
      totalSlide: this.bannerItems.length,
    };
  },
  props: {
    autoplayDelay: {
      type: Object,
      default: null,
    },
    slideName: {
      type: String,
      default: "zin_banner_arw",
    },
    bannerItems: {
      type: Array,
      default: "",
    },
    bannerHeight: {
      type: Number,
      default: null,
    },
    arwType: {
      type: String,
      default: "black",
    },
    hasPagination: {
      type: Boolean,
      default: false,
    },
    isScrap: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleScrap: function(id) {
      // let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      // if (idIdx === -1) {
      //   this.$parent.$parent.myScrapData.push(id);
      // } else {
      //   this.$parent.$parent.myScrapData.splice(idIdx, 1);
      // }
    },
  },
  async mounted() {
    await this.$nextTick();
    const swiperThumb = this.$refs.mvImg.$swiper
    const swipeTxt = this.$refs.mvTxt.$swiper;
    swiperThumb.controller.control = swipeTxt;
    swipeTxt.controller.control = swiperThumb;
    if(this.autoplayDelay) this.playTime = this.autoplayDelay;
  },
};
</script>

<style scoped>
.zin_pagination_group {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-top: 50px;
  margin-left: -250px;
}
</style>
