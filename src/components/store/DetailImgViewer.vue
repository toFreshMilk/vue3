<template>
  <div class="detail_viewer_wrap clearFix">
    <div class="thumb_slide_frame thumb_slide">
      <div role="button" class="item_slide_btn arr_prev" @click="prevPage" :class="thumbPage === 2 ? 'is_show':''">
        <i class="arw arw_mid_left"></i>
      </div>
      <div ref="slide_group" class="slide_group" :style="`max-height: ${thumbsHeight}px`">
        <div ref="slide_el" class="slide_inner">
          <div v-for="(thumb, i) in imgData" :key="'thumb_'+i" @mouseover="setCurrentImg(i)"
               class="slide_node" :class="currentThumbImg === thumb.url ? 'is_active': currentThumbVideo === thumb.url ? 'is_active' : ''">
            <figure v-if="thumb.type === 'img'" class="slide_item thumb" :style="`background-image: url('${thumb.url}')`"></figure>
            <div v-else class="slide_item thumb video_thumb video_area">
            <video class="video_item" :src="thumb.url"></video>
              <i class="ic ic_video"></i>
            </div>
          </div>
        </div>
      </div>
      <div role="button" v-if="imgData.length > 6" @click="nextPage" class="item_slide_btn arr_next" :class="thumbPage === 1  ? 'is_show':''">
        <i class="arw arw_mid_right"></i>
      </div>
    </div>
    <div class="main_img_frame main_img_area">
      <div v-if="currentThumbImg" class="img_area">
      <figure :style="`background-image:url(${currentThumbImg}`" class="main_img"></figure>
      </div>
      <div v-if="currentThumbVideo" class="video_area">
      <video :src="currentThumbVideo" class="main_img"></video>
      </div>
      <div v-if="evtData" class="time_sale_area">
        <i class="ic ic_time"/>
        <span class="num hour">18<small>월</small></span>
        <span class="num minute">25<small>일</small></span>
        <span class="num second">29<small>시</small></span>
        <span>종료</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DetailImgViewer",
  data(){
    return {
      currentThumbVideo:'',
      currentThumbImg: '',
      thumbPage: 1,
      thumbsHeight: 518,
    }
  },
  props: {
    imgData: {
      type: Array,
      default: null,
    },
    evtData: {
      type: Object,
      default: null,
    },
  },
  methods: {
    prevPage() {
      this.thumbPage = 1;
      this.slideMove();
    },
    nextPage() {
      this.thumbPage = 2;
      this.slideMove();
    },
    slideMove() {
      const slide_item = this.$refs.slide_el.querySelectorAll('.slide_node');
      let groupTop
      let elTop
      if (this.thumbPage === 2) {
        console.log(slide_item[6].getBoundingClientRect())
        elTop = slide_item[6].getBoundingClientRect().top - this.$refs.slide_group.getBoundingClientRect().top
        groupTop = 50;
      } else {
        elTop = 0;
        groupTop = 0;
      }
      this.$refs.slide_el.style.transform = `translate3d(0, -${elTop}px, 0)`
      this.$refs.slide_group.style.transform = `translate3d(0, ${groupTop}px, 0)`
    },
    setCurrentImg(i){
      if(this.imgData[i].type === 'img'){
        this.currentThumbImg = this.imgData[i].url
        this.currentThumbVideo = null
      }else{
        this.currentThumbVideo = this.imgData[i].url
        this.currentThumbImg = null
      }

    },
  },
  mounted() {
    if(this.imgData[0].type === 'img'){
      this.currentThumbImg = this.imgData[0].url
    }else{
      this.currentThumbVideo = this.imgData[0].url
    }
  },
};
</script>

<style scoped>

</style>