<template>
  <footer id="footer">
    <div class="snb">
      <div class="btn_wrap">
        <div class="collect_item_wrap">
          <div v-if="latestAreaOpen" class="collect_item_group">
            <div class="collect_inner">
              <div class="ttl_area clearFix">
                <h5>최근 본 상품<span class="c_point2">27</span></h5>
                <button class="delete_all">
                  전체 삭제
                </button>
              </div>
              <div class="scroll_area" v-bar>
                <div class="collect_item_list">
                  <div v-for="(item, i) in latestItem" :key="'collect_' + i"
                       class="collect_item price_info_group has_elem">
                    <div class="img_area">
                      <figure :style="`background-image:url(${item.imgUrl})`"></figure>
                    </div>
                    <div class="price_wrap">
                      <small class="brand">{{ item.brand }}</small>
                      <p class="item_name">{{ item.name }}</p>
                      <p class="price before"><span class="num">{{ item.priceBefore }}</span>원</p>
                      <p class="price after">
                        <span class="discount">{{ item.discount }}%</span>
                        <span class="num"><b>{{ item.price }}</b>원</span>
                      </p>
                    </div>
                    <div class="btn_area">
                      <button class="delete_btn">
                        <i class="ic ic_close_m"></i>
                      </button>
                      <button class="scrap_btn_w">
                        <i class="ic ic_scrap"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div @click="latestAreaOpen = !latestAreaOpen" class="control_btn">
            <button class="btn_open" :style="`background-image:url(${latestItem[0].imgUrl})`"></button>
            <button v-if="latestAreaOpen" class="btn_close"><i class="ic ic_close_w"></i></button>
          </div>
        </div>
        <div class="center_btn_area">
          <button class="btn_center"><i class="ic ic_center"></i></button>
        </div>
        <div class="top_btn_area">
          <button @click="scrollTop()" class="btn_top"><i class="arw arw_mid_top"></i></button>
        </div>
      </div>

    </div>
    <div class="utility_area">
      <div class="set_inner clearFix">
        <div class="notice_wrap clearFix">
          <h6>공지</h6>
          <div class="notice_ls">
            <client-only>
              <swiper :options="bannerOption"
                      v-if="ready">
                <swiper-slide v-for="item in noticeItems"
                              class="notice_item">
                  <div class="ttl_area">{{ item.ttl }}</div>
                  <div class="date_area">{{ item.date }}</div>
                </swiper-slide>
              </swiper>
            </client-only>
          </div>
          <div class="btn_area">
            <button class="notice_ls_btn arw_prev"><i class="arw arw_top"></i></button>
            <button class="notice_ls_btn arw_next"><i class="arw arw_bottom"></i></button>
          </div>
        </div>
        <div class="link_wrap">
          <div class="app">
            <a href="#">앱 다운로드 <i class="arw arw_right"></i></a>
          </div>
          <div class="sns_wrap">
            <a href="#">
              <i class="ic ic_insta"></i>
            </a>
            <a href="#">
              <i class="ic ic_youtube"></i>
            </a>
            <a href="#">
              <i class="ic ic_facebook"></i>
            </a>
            <a href="#">
              <i class="ic ic_blog"></i>
            </a>
          </div>
          <div class="family_site">
            <button>패밀리 사이트 <i class="arw arw_triangle_g"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="foot_info_wrap">
      <div class="set_inner clearFix">
        <div class="foot_info_area">
          <div class="cs_area">
            <p class="tel">1544-1893 / 080-005-4000</p>
            <small>평일 08:30 ~ 17:30, 토요일 08:30~12:30 (일요일 및 공휴일 휴무)</small>
          </div>
          <div class="info_area">
            <dl class="label_txt">
              <dt>주소 :</dt>
              <dd>서울 중구 후암로 98 LG서울역빌딩 18~23F LX하우시스</dd>
            </dl>
            <dl class="label_txt">
              <dt>대표이사 :</dt>
              <dd>강계웅, 강인식</dd>
            </dl>
            <dl class="label_txt">
              <dt>통신판매업신고 :</dt>
              <dd>제2020-서울중구-0146호</dd>
            </dl>
            <dl class="label_txt">
              <dt>사업자등록번호 :</dt>
              <dd>107-87-18122 <a href="#">사업자정보 확인</a></dd>
            </dl>
          </div>
        </div>
        <div class="fnb">
          <div class="fnb_item">
            <a href="#">공지사항</a>
            <a href="#">FAQ</a>
            <a href="#">1:1 문의</a>
            <!--            <a href="#">이벤트</a>-->
          </div>
          <div class="fnb_item">
            <a href="#">이메일무단수집거부</a>
            <a href="#">고객의 소리</a>
            <a href="#">A/S 신청</a>
          </div>
          <div class="fnb_item">
            <a href="#">정도경영사이버신문고</a>
            <a href="#">협력회사 상생고</a>
            <a href="#">이용약관</a>
            <a href="#"><strong>개인정보처리방침</strong></a>
          </div>
        </div>
        <div class="copy_area clearFix">
          <p>COPYRIGHT © 2021 LX HAUSYS. ALL RIGHTS RESERVED.</p>
          <p>
            <span>지인몰은 통신판매중개자로서 입점상품 판매의 거래당사자가 아니므로 </span>
            <span>입점업체의 상품정보 및 거래에 대하여는 지인몰은 일체 책임을 지지 않습니다.</span>
          </p>
        </div>
      </div>
    </div>

  </footer>
</template>

<script>

import setFixElem from "~/common/js/fixElem";

export default {
  name: "Footer",
  props: {
    hasBottom: {
      type: Boolean,
      default: false,
    },
    fixElem: {
      type: String,
      default: "",
    },

  },
  data() {
    return {
      ready: false,
      latestAreaOpen: false,
      latestItem: [{
        imgUrl: "/img/store/@_thumb_01.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }, {
        imgUrl: "/img/store/@_thumb_02.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }, {
        imgUrl: "/img/store/@_thumb_03.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }, {
        imgUrl: "/img/store/@_thumb_04.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }, {
        imgUrl: "/img/store/@_thumb_05.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }, {
        imgUrl: "/img/store/@_thumb_06.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }, {
        imgUrl: "/img/store/@_thumb_07.png",
        brand: "일룸",
        name: " 화이트 우드 4인용 식탁+의자",
        priceBefore: "100,000",
        discount: "15",
        price: "94,800",
      }],
      bannerOption: {
        loop: true,
        slidesPerView: "1",
        direction: "vertical",
        navigation: {
          nextEl: ".notice_ls_btn.arw_next",
          prevEl: ".notice_ls_btn.arw_prev",
        },
      },
      noticeItems: [{
        ttl: "현대홈쇼핑 상담고객 대상 Z:IN 자동환기, 안심매트 당첨자 발표",
        date: "2021.04.20",
      }, {
        ttl: "현대홈쇼핑 상담고객 대상 Z:IN 자동환기, 안심매트 당첨자 발표",
        date: "2021.04.20",
      }, {
        ttl: "현대홈쇼핑 상담고객 대상 Z:IN 자동환기, 안심매트 당첨자 발표",
        date: "2021.04.20",
      }],
    };
  },
  methods: {
    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    floatingBarLayout() {
      let footSnb = document.querySelector("#footer .snb");
      let snbBtnWrap = document.querySelector("#footer .snb .btn_wrap");
      let floatingBarCheck = document.querySelector("#floatingBar");
      if (floatingBarCheck != null) {
        footSnb.style.top = "-300px";
        snbBtnWrap.style.bottom = "120px";
      }
    },
  },
  async mounted() {
    await this.$nextTick();
    this.ready = true;
    this.floatingBarLayout();
    let floatingBar = document.querySelector('#floatingBar')
    window.addEventListener('scroll', function () {
      if (floatingBar) {
        setFixElem('', '.detail_foot .lnb_wrap', '#footer .snb .btn_wrap')
      } else {
        setFixElem('', '#footer .snb', '#footer .snb .btn_wrap')
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', setFixElem);
  },

}
;
</script>

<style scoped>

</style>
