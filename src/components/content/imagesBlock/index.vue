<template>
  <div class="detail_wrap multi_img_wrap">
    <div class="ttl_area">
      <h2 class="ttl">{{ titleStr }}</h2>
    </div>
    <div class="multi_img_frame detail_cnt">
      <client-only>
        <swiper :ref="id" class="multi_img_group" :options="multiImgOptions">
          <swiper-slide
            v-for="(image, index) in images"
            :key="id + index"
            class="multi_img_item"
          >
            <div class="thumb_group">
              <img :src="resizedImg(image)" />
            </div>
          </swiper-slide>
          <div class="swiper-pagination content_pagination" slot="pagination" />
        </swiper>
      </client-only>
<!--      <div class="content_pagination_group">-->
<!--        <div class="content_pagination" slot="pagination" />-->
<!--      </div>-->
    </div>
    <div
      class="txt_area"
      ice-prop-bind="text"
      ice-prop-type="html"
      v-html="text"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, Number, default: () => "emptyid" },
    title: { type: Object },
    text: { type: String },
    images: { type: Array, default: () => ["/img/noimage.png"] },
  },
  computed: {
    titleStr() {
      return this.$getLabel(this.title);
    },
  },

  data() {
    return {
      multiImgOptions: {
        loop: true,
        pagination: {
          el: ".multi_img_frame .content_pagination",
          clickable: false,
        },
      },
    };
  },
  async mounted() {
    await this.$nextTick();
  },
  methods: {
    resizedImg(url) {
      const fileFormat = url.substring(url.lastIndexOf(".") + 1, url.length);
      if (fileFormat.toLowerCase() === "gif") return url;
      return this.$resizeImage(url, 720, 0);
    },
  },
};
</script>

<style scoped>
</style>
