<template>
  <div :class="slideName" class="full_banner_wrap video_slide_wrap">
    <div class="banner_inner video_inner">
      <client-only>
        <swiper ref="videoSwiper" class="full_banner_group" :options="VideoOptions">
          <swiper-slide v-for="(item, index) in bannerItems" :key="index" class="full_banner_item video_bg"
                        :style="'background-image: url('+ item.img+');' + heightSet(bannerHeight)">
            <div class="video_area">
              <div class="iframe_inner">
                <client-only>
                  <video class="video-js vjs-default-skin vjs-big-play-centered" data-setup='{"fluid": true}' playsinline=""
                         webkit-playsinline preload="true" controls>
                    <source src="https://player.vimeo.com/external/417499289.hd.mp4?s=84efe0c22ebaf8b65891c156d3a45246d28d76a9&profile_id=175" type="video/mp4">
                  </video>
                </client-only>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div v-if="hasPagination" class="zin_pagination_group type_btn">
          <div class="zin_pagination" />
        </div>
        <div class="zin_arw_group">
          <button class="zin_banner_arw arr_prev">
            <i class="arw" :class="arwType === 'white' ? 'arw_big_left_w': arwType === 'black' ? 'arw_big_left':'arw_mid_left'"></i>
          </button>
          <button class="zin_banner_arw arr_next">
            <i class="arw" :class="arwType === 'white' ? 'arw_big_right_w': arwType === 'black' ? 'arw_big_right':'arw_mid_right'"></i>
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
  name: "VideoSlide",
  data() {
    return {
      VideoOptions: {
        loop: true,
        pagination: {
          el: ".video_slide_wrap .type_btn .zin_pagination",
          clickable: true,
        },
        navigation: {
          nextEl: `.${this.slideName} .arr_next`,
          prevEl: `.${this.slideName} .arr_prev`,
        },
        autoplay: this.playTime,
      },
      playTime: false,
      currentSlide: 1,
      totalSlide: this.bannerItems.length,
    };
  },
  props: {
    autoplayDelay:{
      type:Object,
      default: null,
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
    if(this.autoplayDelay) this.playTime = this.autoplayDelay;
    console.log(this.$refs.videoSwiper.$swiper)
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
