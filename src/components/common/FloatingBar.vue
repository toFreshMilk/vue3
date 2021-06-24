<template>
<!--  <div id="floatingBar">-->
<!--    <div class="lnb_inner">-->
<!--      <div class="lnb">-->
<!--        <div class="btn_frame collect">-->
<!--          <button @click="function(){ collectOpen = !collectOpen}" class="collect_btn">-->
<!--            <i class="ic ic_product"/>-->
<!--            <p>이 집의 상품 모아보기</p>-->
<!--          </button>-->
<!--          <div class="collect_item_wrap">-->
<!--            <div v-if="collectOpen" class="collect_item_group arrow_box">-->
<!--              <div class="collect_inner" v-bar>-->
<!--                <div class="collect_item_list">-->
<!--                  <div v-for="item in relateItemData" class="collect_item price_info_group has_elem">-->
<!--                    <div class="img_area">-->
<!--                      <figure :style="`background-image:url(${item.img})`"></figure>-->
<!--                    </div>-->
<!--                    <div class="price_wrap">-->
<!--                      <small class="brand">{{ item.type }}</small>-->
<!--                      <p class="item_name">{{ item.title }}</p>-->
<!--                    </div>-->

<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="btn_frame scrap">-->
<!--          <button @click="function(){ thisPostScrap = !thisPostScrap}" class="scrap_btn_w">-->
<!--            <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>-->
<!--            <p><span class="c_point3">1,253</span>명이 스크랩하고 있어요</p>-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="btn_frame share share_btn_area">-->
<!--          <button @click="shareBtnToggle($event)" class="share_btn open_btn">-->
<!--            <i class="ic ic_share"></i>-->
<!--            <p>공유하기</p>-->
<!--          </button>-->
<!--          <div class="share_item_wrap arrow_box">-->
<!--            <div class="share_inner">-->
<!--              <button class="copy_link">-->
<!--                <div class="ic_area">-->
<!--                  <i class="ic ic_copyLink"></i>-->
<!--                </div>-->
<!--                <p>링크복사</p>-->
<!--              </button>-->

<!--              <button class="kakao_link">-->
<!--                <div class="ic_area">-->
<!--                  <i class="ic ic_kakao_l"></i>-->
<!--                </div>-->
<!--                <p>카카오톡</p>-->
<!--              </button>-->

<!--              <button class="facebook_link">-->
<!--                <div class="ic_area">-->
<!--                  <i class="ic ic_facebook_l"></i>-->
<!--                </div>-->
<!--                <p>페이스북</p>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="btn_frame comment">-->
<!--          <a href="#commentSec" class="comment_btn">-->
<!--            <i class="ic ic_comment"></i>-->
<!--            <p>댓글 <span>{{ commentDataLength }}</span></p>-->
<!--          </a>-->
<!--        </div>-->
<!--        <div class="btn_frame consulting btn_area">-->
<!--          <button class="btn full_btn_area c_grd">-->
<!--            <p>인테리어 상담신청</p>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import setFixElem from "~/common/js/fixElem";
export default {
  name: "FloatingBar",
  components:{
  },
  data() {
    return {
      collectOpen:false,
    }
  },
  props: {
    relateItemData: {
      type: Array,
      default: null,
    },
    commentDataLength:{
      type: Number,
      default: 0,
    },
    thisPostScrap:{
      type: Boolean,
      default: null,
    }
  },
  methods: {
    shareBtnToggle(e) {
      let shareBtn = document.querySelectorAll('.share_btn.open_btn')
      let shareWraps = document.querySelectorAll('.share_item_wrap')
      let shareBtnArea = e.currentTarget.closest('.share_btn_area')
      let shareWrap = shareBtnArea.querySelector('.share_item_wrap')
      shareWraps.forEach((e) => e.classList.remove('is_active'))
      if (this.currentShareItem == e.currentTarget) {
        shareWrap.classList.remove('is_active')
        this.currentShareItem = null
      } else {
        shareWrap.classList.add('is_active')
        this.currentShareItem = e.currentTarget
      }
    },
  },
  render() {
    return this.$scopedSlots.default({
      ress : "xxxxaaaaaaaaaaaaa",
    })
  },
  async mounted() {
    await this.$nextTick();
    // window.addEventListener('scroll', function () {
    //   setFixElem('','.detail_page .lnb_wrap', '#floatingBar')
    // })
  },
}
</script>

<style scoped>

</style>