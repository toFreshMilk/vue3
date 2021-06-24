<template>
  <!-- 0621. 하단 div 클래스 수정 -->
  <div :class="postModalOpen ? 'is_show' : ''"
       class="modal_wrap w_l has_overlay exhibition_modal post_modal basic_type">
    <div class="modal">
      <!-- 0621. 하단 div 클래스 수정 -->
      <div class="modal_head has_close">
        <div class="ttl_area">
          <small v-if="postData.storeCate" class="c_point3">{{ postData.storeCate }}</small>
          <h3 class="ttl">
            {{ postData.ttl }}
          </h3>
          <button @click="toggleScrap(thisitemID)"
                  :class="$parent.$parent.myScrapData.indexOf(thisitemID) !== -1 ? 'is_active':''"
                  class="btn scrap_btn type_line ic_before"></button>
        </div>
        <button @click="modalHide()" class="modal_close">
          <i class="ic ic_close_b"></i>
        </button>
      </div>
      <div class="modal_body">
        <div class="body_inner">
          <div class="cnt_wrap">
            <div class="info_area">
              <h5 class="post_ttl">
                {{ postData.postTitle }}
              </h5>
              <p class="post_comment">{{ postData.comment }}</p>
              <div class="hash_btn_group">
                <button v-for="(item,index) in postData.hash"
                        :key="'postDataHash' + index">
                  <span class="hash_item gray_type">{{ item }}</span></button>
              </div>
              <div class="post_info contour_group">
                <dl class="contour_item">
                  <dt>등록일</dt>
                  <dd>2021.03.01</dd>
                </dl>
                <dl class="contour_item">
                  <dt>스크랩</dt>
                  <dd>1,253</dd>
                </dl>
                <dl class="contour_item">
                  <dt>조회</dt>
                  <dd>3,054</dd>
                </dl>
              </div>
              <div class="share_btn_area btn_area">
                <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
                  <i class="ic ic_share"></i>
                </div>
                <div class="share_item_wrap type_arw_bottom arrow_box">
                  <div class="share_inner">
                    <button class="facebook_link">
                      <div class="ic_area">
                        <i class="ic ic_facebook_l"></i>
                      </div>
                      <p>페이스북</p>
                    </button>
                    <button class="kakao_link">
                      <div class="ic_area">
                        <i class="ic ic_kakao_l"></i>
                      </div>
                      <p>카카오톡</p>
                    </button>
                    <button class="copy_link">
                      <div class="ic_area">
                        <i class="ic ic_copyLink"></i>
                      </div>
                      <p>링크복사</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="postData.summary" class="comment_area bg_box">
          <dl v-for="(item,index) in postData.summary" :key="'postSummary'+index" class="label_txt">
            <dt>{{ item.ttl }}</dt>
            <dd v-if="item.ttl==='컬러'" class="colorPick_area">
               <span v-for="(chip,index) in item.color" :style="`background:${chip}`"
                     :class="chip.colorName" class="color_chip"></span>
            </dd>
            <dd v-else>{{ item.cnt }}</dd>
          </dl>
        </div>
      </div>
      <div class="modal_foot">
        <!-- 포스트 영역 -->
        <div class="detail_page">
          <div class="detail_body">
            <div class="detail_inner">
              <div class="detail_frame">
                <div class="ttl_area">
                  <h3 class="ttl">주방 Before</h3>
                </div>
                <div class="img_area">
                  <img src="/img/styling/@_expert_before.png" alt="">
                </div>
                <div class="txt_area">
                  <p>기본 구조의 부엌으로, 별다른 특징없이 깔끔한 상태입니다. 입주 당시 기존 브라운톤의 마감재 그대로 유지했던 시공 전 모습입니다.</p>
                </div>
              </div>
              <div class="detail_frame">
                <div class="ttl_area">
                  <h3 class="ttl">주방 after</h3>
                </div>
                <div class="slide_area">
                  <client-only>
                    <div class="swiper_pagination"></div>
                    <swiper ref="swipeTxt" class="slide_item_list full_size" :options="swiperOptions">
                      <swiper-slide v-for="(item, index) in swiperSlideItems" :key="'postSwiper'+ index" class="list_item slide_list_item">
                        <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                      </swiper-slide>
                    </swiper>
                  </client-only>
                </div>
                <div class="txt_area">
                  <p>베란다를 확장하여 샤시 시공을 베란다를 확장하여 샤시 시공을 다시 하고, 확장 부위에 등박스를 확대 시공하여 LED 스퀘어형 조명으로 교체하였습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "~/components/common/Pagination";

export default {
  name: 'ExhibitionDetailModal',
  components: { Pagination },
  props: {
    postData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {

      shareBtnOpen: false,
      thisitemID: 100,
      scrapData: false,
      postModalOpen: false,
      contactModalOpen: false,
      swipeStoreFigure: {
        slidesPerView: 1,
        loop: false,
        navigation: {
          nextEl: `.arr_next`,
          prevEl: `.arr_prev`,
        },
      },
      swiperOptions:{
        loop: this.slideLoop,
        pagination: {
          el: ".swiper_pagination",
          clickable: true,
        },
      },
      swiperSlideItems:[{
        img : '/img/styling/@_expert_after.png'
      },{
        img : '/img/styling/@_expert_after.png'
      },{
        img : '/img/styling/@_expert_after.png'
      },{
        img : '/img/styling/@_expert_after.png'
      }],

    }
  },
  methods: {
    shareBtnToggle(e) {
      let shareBtn = document.querySelectorAll(".share_btn.open_btn");
      let shareWraps = document.querySelectorAll(".share_item_wrap");
      let shareBtnArea = e.currentTarget.closest(".share_btn_area");
      let shareWrap = shareBtnArea.querySelector(".share_item_wrap");
      shareWraps.forEach((e) => e.classList.remove("is_active"));
      if (this.currentShareItem == e.currentTarget) {
        shareWrap.classList.remove("is_active");
        this.currentShareItem = null;
      } else {
        shareWrap.classList.add("is_active");
        this.currentShareItem = e.currentTarget;
      }
    },
    toggleScrap: function (id) {
      let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      if (idIdx === -1) {
        this.$parent.$parent.myScrapData.push(id);
      } else {
        this.$parent.$parent.myScrapData.splice(idIdx, 1);
        this.test = true
      }
    },
    modalHide() {
      this.$nuxt.$emit('htmlOverShow')
      this.postModalOpen = false
    },
  },
}

</script>