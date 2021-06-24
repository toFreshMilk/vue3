<template>
  <div :class="slideName" class="brand_slide_wrap">
    <div class="banner_inner brand_slide_inner">
      <client-only>
        <swiper ref="mvTxt" class="brand_slide_group" :options="brandOptions">
          <swiper-slide v-for="(item, index) in bannerItems" :key="index" class="brand_slide_item">
<!--                        :style="'background-image: url('+ item.img+');' + heightSet(bannerHeight)">-->
            <a :href="item.link">
              <div class="thumb_area">
                <figure class="thumb" :style="'background-image: url('+ item.img+');'"></figure>
              </div>
              <div class="txt_group">
                <h6>{{ item.brandname }}</h6>
              </div>
            </a>
          </swiper-slide>
        </swiper>
        <div v-if="hasPagination" class="brand_slide_pagination_group">
          <span class="current">{{ zoreNumSet(currentSlide) }}</span>
          <div class="brand_slide_pagination long" slot="pagination" />
          <span class="total">{{ zoreNumSet(totalSlide) }}</span>
        </div>
        <div class="zin_arw_group">
          <button class="zin_banner_arw arr_prev">
            <i class="arw" :class="arwType === 'white' ? 'arw_big_left_w': arwType === 'black' ? 'arw_mid_left':'arw_big_left'"></i>
          </button>
          <button class="zin_banner_arw arr_next">
            <i class="arw" :class="arwType === 'white' ? 'arw_big_right_w': arwType === 'black' ? 'arw_mid_right':'arw_big_right'"></i>
          </button>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
// import SwiperCore, { Controller, Pagination, EffectFade } from 'swiper';
// SwiperCore.use([ Controller, Pagination, EffectFade ]);
export default {
  name: "BrandSlide",
  data() {
    return {
      brandOptions: {
        slidesPerView: 7,
        loop: false,
        pagination: {
          el: ".brand_slide_wrap .brand_slide_pagination",
          // type: "progressbar",
          clickable: false,
        },
        navigation: {
          nextEl: `.${this.slideName} .arr_next`,
          prevEl: `.${this.slideName} .arr_prev`,
        },
        autoplay: this.autoplayDelay,
      },
      currentSlide: 1,
      totalSlide: this.bannerItems.length,
    };
  },
  props: {
    autoplayDelay:{
      type:Object,
      default:false,
    },
    slideName: {
      type: String,
      default: 'zin_banner_arw',
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
  },
  methods: {
    zoreNumSet(num) {
      if (num < 10) return "0" + num;
      return num;
    },
    heightSet(num) {
      if (num === null || num === 0) return "";
      return "height: " + num + "px;";
    },
  },
  async mounted() {
    await this.$nextTick();
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
