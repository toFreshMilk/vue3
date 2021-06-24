<template>
  <div :class="contour ? 'contour_item':''" class="modal">
    <v-dialog scrollable v-model="dialog" :max-width="maxW !== null ? maxW + 'px': ''">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <button class="open_btn more_btn">
            <p>
              <i class="ic ic_plus_w"></i>
              <span>더보기</span>
            </p>
          </button>
        </div>
      </template>

          <div :class="{'no_P':noP}" class="v-card photo_review_modal">
            <v-card-title v-if="dialogTitle" class="modal_head">
              <h3 class="ttl">포토후기 <span class="c_point3">{{ reviewIndex + 1 }} / {{ reviewTotal }}</span></h3>
            </v-card-title>
            <div class="scroll_area photo_review_area" v-bar>
            <v-card-text class="modal_body">
              <div class="review_cnt_wrap detail_page">
                <div class="cnt_inner grid">
                  <div class="img_wrap col col_6">
                    <div class="img_area">
                      <figure :style="`background-image:url(${currentImg})`"
                              class="current_img"></figure>
                      <div class="review_pagination">
                        <span class="current_num">{{ currentImgIndex + 1 }}</span>
                        <span>/</span>
                        <span class="total_num">{{ reviewData.photoIdsCnt }}</span>
                      </div>
                    </div>
                    <div class="thumb_ls clearFix grid grid_5">
                      <div v-for="(item,i) in reviewData.photoIds" :key="'photo' + i" class="thumb_item col col_x5">
                        <figure @mouseover="reviewDialogImg(item, i); "
                                :class="currentImgIndex === i ? 'is_active':''"
                                :style="`background-image:url(${item})`" class="thumb_img"></figure>
                      </div>
                    </div>
                  </div>
                  <div class="txt_wrap col col_6">
                    <div class="user_info has_elem">
                      <div class="img_area">
                        <figure :style="`background-image: url('${reviewData.userProfile}')`"></figure>
                      </div>
                      <div class="info_wrap">
                        <Grade :gradeNum="floorStar(reviewData.starAvg)"></Grade>
                        <div class="contour_group">
                          <span class="contour_item">{{ reviewData.nickName }}</span>
                          <span class="contour_item">{{ reviewData.creDate | textDate }}</span>
                          <div class="contour_group contour_item modify_btn_area">
                            <button v-if="reviewData.creUserSameYn === 'Y'" class="btn_modify contour_item" @click="updatePreview">수정
                            </button>
                            <button v-if="reviewData.creUserSameYn === 'Y'" class="btn_delete contour_item" @click="deletePreview">삭제
                            </button>
                            <button @click="declarePreview"
                                    v-if="reviewData.creUserSameYn === 'N'" class="contour_item">신고
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="user_option_area">
                      <div class="contour_group">
                        <span v-for="(option,i) in reviewData.itemOption" :key="'itemOption' + i" class="contour_item">{{
                            option
                          }}</span>
                      </div>
                    </div>
                    <div class="cnt_area">
                      <!--0607 하단 div추가 -->
                      <div class="scroll_area" v-bar>
                        <div class="cnt" v-html="$options.filters.formatBreakLineText(reviewData.content)"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
            </div>
            <v-card-actions>
              <div class="modal_foot">
                <div class="btn_area full_btn_area grid grid_5">
                  <button class="review_btn arr_prev" :disabled="reviewIndex === 0" @click="prev">
                    <i class="arw arw_big_left"></i>
                  </button>
                  <button class="review_btn arr_next" :disabled="reviewIndex === (reviewTotal - 1)" @click="next">
                    <i class="arw arw_big_right"></i>
                  </button>
                </div>
              </div>
            </v-card-actions>
            <div v-if="noticeArea" class="notice_area">
              <slot name="noticeArea"></slot>
            </div>
            <div v-if="topBtn" class="top_close_btn">
              <button @click="dialog=false"><i class="ic ic_close_b"></i></button>
            </div>
          </div>

      <!-- <slot name="txtBtn"></slot>-->
    </v-dialog>
  </div>
</template>

<script>
import floor from 'lodash/floor';
import Grade from "~/components/common/Grade";

export default {
  name: "StorePhotoReview",
  components: {
    Grade,
  },
  props: {
    dialogTitle: {
      type: Boolean,
      default : true,
    },
    noP: {
      type: Boolean,
      default: false,
    },
    topBtn: {
      type: Boolean,
      default: true,
    },
    contour: {
      type: Boolean,
      default: false,
    },
    maxW: {
      type: Number,
      default: null,
    },
    noticeArea: {
      type: Boolean,
      default: false,
    },
    prdId: {
      type: String,
    },
    reviewIndex: {
      type: Number,
      default: 0,
    },
    reviewSort: {
      type: String,
      default: '0',
    }

  },
  data() {
    return {
      dialog: false,
      isNotFlex: false,

      reviewData: {},
      reviewTotal: 0,
      currentImg: "",
      currentImgIndex: 0,
      photoSample1: ["/img/store/@_thumb_01.png", "/img/store/@_thumb_02.png", "/img/store/@_thumb_03.png", "/img/store/@_thumb_04.png", "/img/store/@_thumb_05.png", "/img/store/@_thumb_05.png", "/img/store/@_thumb_05.png"],
    }
  },
  watch: {
    reviewIndex() {
      this.getPhotoPreview();     // 포토후기 조회
    },
  },
  async fetch() {
    await this.getPhotoPreview();     // 포토후기 조회
  },
  methods: {
    // 포토후기 조회
    async getPhotoPreview() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdPhotoReViewSvcApi/svcPhotoReView",
            method: 'get',
            query: {
              // prdId: this.prdId,
              prdId: 581,
              page: this.reviewIndex+1,
              size: 1,
              sort: this.reviewSort,
              photoYn: 'Y',
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.items", []);
        if (data.length > 0) {
          this.reviewData = data[0];
          this.reviewData.photoIds = this.photoSample1; // 임시
          this.reviewData.photoIdsCnt = this.reviewData.photoIds.length; // 임시
          this.currentImg = this.reviewData.photoIds[0];
          this.currentImgIndex = 0;
        }
        this.reviewTotal = this.$get(res, "data.totalCount", 0);
      } catch (e) {
        console.log(e);
      }
    },

    // 수정
    updatePreview() {
      this.dialog = false;
      this.$emit("updateReview", this.reviewData);
    },
    // 삭제
    deletePreview() {
      this.dialog = false;
      this.$emit("deleteReview", this.reviewData);
    },
    // 신고
    declarePreview() {
      this.dialog = false;
      this.$emit("declareReview", this.reviewData);
    },

    async prev() {
      this.reviewIndex = this.reviewIndex - 1;
      await this.getPhotoPreview();     // 포토후기 조회
    },
    async next() {
      this.reviewIndex = this.reviewIndex + 1;
      await this.getPhotoPreview();     // 포토후기 조회
    },
    reviewDialogImg(activeImg, index) {
      this.currentImg = activeImg;
      this.currentImgIndex = index;
    },
    floorStar(star) {
      return floor(star, 1);
    },
  },
}
</script>

<style scoped>

</style>
