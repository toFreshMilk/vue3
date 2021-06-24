<template>

  <div :class="'share_item_wrap arrow_box '+appendClass">
    <div class="share_inner">
      <button class="copy_link" @click="copyURL">
        <div class="ic_area">
          <i class="ic ic_copyLink"></i>
        </div>
        <p>링크복사</p>
      </button>

      <button class="kakao_link" @click="shareKakao">
        <div class="ic_area">
          <i class="ic ic_kakao_l"></i>
        </div>
        <p>카카오톡</p>
      </button>

      <button class="facebook_link" @click="shareFacebook">
        <div class="ic_area">
          <i class="ic ic_facebook_l"></i>
        </div>
        <p>페이스북</p>
      </button>
    </div>
  </div>

</template>

<script>
export default {
  name: "ShareSns",
  components: {
  },
  props: {
    appendClass: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
    }
  },
  methods: {
    copyURL() {
      var dummy = document.createElement('input'),
      text = window.location.href;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    },
    shareFacebook() {
      var sendUrl = location.href;
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
    },
    shareKakao() {
      var sendUrl = location.href;
      console.log(sendUrl);
      this.$kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "LG하우시스",
          description: "LG하우시스",
          imageUrl: "",
          link: {
            webUrl: sendUrl,
            mobileWebUrl: sendUrl,
          },
        }
      });
    }
  },
}
</script>