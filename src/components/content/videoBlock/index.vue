<template>
  <div class="detail_wrap img_wrap">
    <div class="ttl_area">
      <h2 class="ttl">{{ titleStr }}</h2>
    </div>
    <div class="video_area detail_cnt">
      <!-- <client-only> -->
      <video
        :id="'sssd'"
        ref="abc"
        class="video-js vjs-default-skin vjs-big-play-centered"
        :data-setup="videoDataSetup"
        playsinline
        webkit-playsinline
        preload="auto"
        controls
        :data-poster="thumbImg"
      >
        <source :src="video" type="video/mp4" />
      </video>
      <!-- </client-only> -->
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
import 'video.js/dist/video-js.css'

import videojs from "video.js";
export default {
  data() {
    return {
      videoDataSetup: '{"fluid": true}',
      statePosterImage: "/img/sub/@_detail_video.png",
    };
  },
  props: {
    title: { type: Object },
    text: { type: String },
    video: {
      type: String,
      default:
        "https://player.vimeo.com/external/417499289.hd.mp4?s=84efe0c22ebaf8b65891c156d3a45246d28d76a9&profile_id=175",
    },
    thumbImg: {
      type: String,
      default: "https://i.vimeocdn.com/video/1090777413_720.jpg",
    },
  },
  computed: {
    titleStr() {
      return this.$getLabel(this.title);
    },
  },
  async mounted() {
    videojs(this.$refs.abc, {
      fluid: true,
      autoplay: false,
      preload: "auto",
      controls: true,
    });
  },
};
</script>
