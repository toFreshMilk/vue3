<template>
  <!-- 0621. 하단 div 클래스 수정 -->
  <div
    :class="modalOpen ? 'is_show' : ''"
    class="modal_wrap w_l has_overlay exhibition_modal basic_type"
  >
    <div class="modal">
      <!-- 전시장 모달 -->
      <div v-if="storeData && storeData.gubunCd != '05'">
        <!-- 0621. 하단 div 클래스 수정 -->
        <div class="modal_head has_close">
          <div class="ttl_area">
            <small class="c_point3">{{ storeData.gubun }}</small>
            <h3 class="ttl">
              {{ storeData.shopName }}
              <block v-if="storeData">
                <span
                  v-if="storeData.goodYn == 'Y'"
                  class="flag flag_bestStore"
                >
                  <img src="/img/zin/flag_bestStore.png" alt="우수매장" />
                </span>
                <span
                  v-if="storeData.newSpclYn == 'Y'"
                  class="flag flag_newStore"
                >
                  <img src="/img/zin/flag_newStore.png" alt="우수매장" />
                </span>
              </block>
            </h3>
          </div>
          <button @click="modalHide()" class="modal_close">
            <i class="ic ic_close_b"></i>
          </button>
        </div>
        <div class="modal_body">
          <div class="body_inner grid grid_10">
            <div class="cnt_wrap col col_6">
              <div class="info_area">
                <dl>
                  <dt><i class="ic_location_s ic"></i></dt>
                  <dd>{{ storeData.adres1 }}</dd>
                </dl>
                <dl>
                  <dt><i class="ic_tell_s ic"></i></dt>
                  <dd>{{ storeData.phone | phone }}</dd>
                </dl>
                <dl>
                  <dt><i class="ic_time_s ic"></i></dt>
                  <dd>
                    {{ storeData.workStrSi }}:{{ storeData.workStrSi }} ~
                    {{ storeData.workEndSi }}:{{ storeData.workEndBun }}
                    {{ storeData.dsc }}
                  </dd>
                </dl>
              </div>
              <div v-if="storeData.link" class="sns_area">
                <a v-if="storeData.blog">
                  <i class="ic_blog_c ic"></i>
                  네이버 블로그
                </a>
                <a v-if="storeData.instagrm">
                  <i class="ic_insta_c ic"></i>
                  인스타그램
                </a>
                <a v-if="storeData.homep">
                  <i class="ic_home_s ic"></i>
                  홈페이지
                </a>
              </div>
            </div>
            <div
              v-if="storeData.storeFigure"
              class="store_figure_slide col col_6"
            >
              <client-only>
                <swiper class="thumb_list" :options="swipeStoreFigure">
                  <swiper-slide
                    v-for="(item, index) in storeData.storeFigure"
                    :key="'storeFigure' + index"
                  >
                    <figure
                      :style="`background-image: url('${item}')`"
                    ></figure>
                  </swiper-slide>
                </swiper>
              </client-only>
              <div class="btn_area">
                <button class="arr_prev">
                  <i class="arw arw_left_mid_w"></i>
                </button>
                <button class="arr_next">
                  <i class="arw arw_right_mid_w"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal_foot">
          <div v-if="storeData.detailInfoImgUrl" class="img_area">
            <img :src="storeData.detailInfoImgUrl" />
          </div>
        </div>
      </div>
      <!-- 전문점 모달 -->
      <div v-if="storeData && storeData.gubunCd === '05'">
        <div class="modal_head has_close">
          <div class="ttl_area">
            <small class="c_point3">{{ storeData.gubun }}</small>
            <h3 class="ttl">
              {{ storeData.shopName }}
            </h3>
            <button
              @click="toggleScrap(thisitemID)"
              :class="
                $parent.$parent.myScrapData.indexOf(thisitemID) !== -1
                  ? 'is_active'
                  : ''
              "
              class="btn scrap_btn type_line ic_before"
            ></button>
          </div>
          <button @click="modalHide()" class="modal_close">
            <i class="ic ic_close_b"></i>
          </button>
        </div>
        <div class="modal_body">
          <div class="body_inner grid grid_10">
            <div class="cnt_wrap col col_6">
              <div class="info_area">
                <dl>
                  <dt><i class="ic_location_s ic"></i></dt>
                  <dd>{{ storeData.adres1 }}</dd>
                </dl>
                <dl>
                  <dt><i class="ic_tell_s ic"></i></dt>
                  <dd>{{ storeData.phone|phone }}</dd>
                </dl>
                <dl>
                  <dt><i class="ic_time_s ic"></i></dt>
                  <dd> {{ storeData.workStrSi }}:{{ storeData.workStrSi }} ~
                    {{ storeData.workEndSi }}:{{ storeData.workEndBun }}
                    {{ storeData.dsc }}</dd>
                </dl>
              </div>
              <div v-if="storeData.link" class="sns_area">
                <a v-if="storeData.blog">
                  <i class="ic_blog_c ic"></i>
                  네이버 블로그
                </a>
                <a v-if="storeData.instagrm">
                  <i class="ic_insta_c ic"></i>
                  인스타그램
                </a>
                <a v-if="storeData.homep">
                  <i class="ic_home_s ic"></i>
                  홈페이지
                </a>
              </div>
            </div>
            <div class="contact_area col col_6">
              <button
                @click="[contactEmit(), modalHide()]"
                class="contact_btn btn h_m strong"
              >
                문의하기
              </button>
            </div>
          </div>
          <div v-if="storeData.comment" class="comment_area bg_box">
            {{ storeData.comment }}
          </div>
        </div>
        <div class="modal_foot">
          <div class="tab_wrap">
            <div class="tab_area">
              <div class="tabs type_line">
                <div
                  @click="portfolioTabShow = 1"
                  :class="portfolioTabShow === 1 ? 'is_active' : ''"
                  class="tab_node"
                >
                  <button class="tab_item">시공사례</button>
                </div>
                <div
                  @click="portfolioTabShow = 2"
                  :class="portfolioTabShow === 2 ? 'is_active' : ''"
                  class="tab_node"
                >
                  <button class="tab_item">제품&전시제품</button>
                </div>
              </div>
            </div>
            <div v-if="portfolioTabShow === 1" class="tab_cnt_frame">
              <div v-if="storeData.portfolio" class="store_portfolio">
                <div class="thumb_ls grid grid_15">
                  <div
                    v-for="(item, index) in storeData.portfolio"
                    :key="'portfolio' + index"
                    class="thumb_node col col_4"
                  >
                    <div class="img_area">
                      <figure
                        @click="[postEmit(), modalHide()]"
                        :style="`background-image:url(${item.mainImgUrl})`"
                      ></figure>
                      <button
                        @click="toggleScrap(item.itemID)"
                        :class="
                          $parent.$parent.myScrapData.indexOf(item.itemID) !==
                          -1
                            ? 'is_active'
                            : ''
                        "
                        class="btn scrap_btn ic_before"
                      ></button>
                    </div>
                    <p class="txt_ellipsis">{{ item.ttl }}</p>
                  </div>
                </div>
                <pagination></pagination>
              </div>
              <div v-else class="no_data">시공사례가 없습니다.</div>
            </div>
            <div v-if="portfolioTabShow === 2" class="tab_cnt_frame">
              <div v-if="storeData.products" class="store_products">
                <div class="thumb_ls grid grid_15">
                  <div
                    v-for="item in storeData.products"
                    :key="'portfolio' + index"
                    class="thumb_node col col_3"
                  >
                    <figure
                      :style="`background-image:url(${item.imgUrl})`"
                    ></figure>
                    <small class="category">
                      {{ item.category }}
                    </small>
                    <p class="product_ttl">
                      <span v-if="item.brand" class="cate"
                        >[{{ item.brand }}]</span
                      >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
                <pagination></pagination>
              </div>
              <div v-else class="no_data">제품&전시제품이 없습니다.</div>
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
  name: "ExhibitionDetailModal",
  components: { Pagination },
  props: {
    storeData: {
      type: Object,
      default: null,
    },
    detailInfoImgUrl: {
      type: String,
      default: "",
    },
  },
  filters: {
    phone(value) {
      value = value.replace(/(\s*)/g, "");
      if (value.startsWith("02")) {
        if (value.length == 9) {
          return (
            value.substr(0, 2) +
            "-" +
            value.substr(2, 3) +
            "-" +
            value.substr(5, 4)
          );
        } else if (value.length == 10) {
          return (
            value.substr(0, 2) +
            "-" +
            value.substr(2, 4) +
            "-" +
            value.substr(6, 4)
          );
        }
      } else {
        if (value.length == 10) {
          return (
            value.substr(0, 3) +
            "-" +
            value.substr(3, 3) +
            "-" +
            value.substr(6, 4)
          );
        } else if (value.length == 11) {
          return (
            value.substr(0, 3) +
            "-" +
            value.substr(3, 4) +
            "-" +
            value.substr(7, 4)
          );
        }
      }
    },
  },
  data() {
    return {
      thisitemID: 300,
      scrapData: false,
      modalOpen: false,
      portfolioTabShow: 1,
      swipeStoreFigure: {
        slidesPerView: 1,
        loop: false,
        navigation: {
          nextEl: `.store_figure_slide .arr_next`,
          prevEl: `.store_figure_slide .arr_prev`,
        },
      },
    };
  },
  methods: {
    toggleScrap: function (id) {
      let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      if (idIdx === -1) {
        this.$parent.$parent.myScrapData.push(id);
      } else {
        this.$parent.$parent.myScrapData.splice(idIdx, 1);
        this.test = true;
      }
    },
    modalHide() {
      this.$nuxt.$emit("htmlOverShow");
      this.modalOpen = false;
    },
    postEmit() {
      this.$emit("postModalShow");
    },
    contactEmit() {
      this.$emit("contactModalShow");
    },
  },
};
</script>
