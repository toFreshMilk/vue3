<template>
  <div class="slide_item_list_wrap">
    <div v-if="withTtlArw" class="ttl_group has_elem">
      <div class="ttl_area">
        <slot name="title"></slot>
      </div>
      <div v-if="itemData.length > itemCol" class="zin_arw_group">
        <button class="zin_banner_arw arr_prev">
          <i class="arw arw_list_left"></i>
        </button>
        <button class="zin_banner_arw arr_next">
          <i class="arw arw_list_right"></i>
        </button>
      </div>
    </div>
    <div v-if="!withTtlArw" class="ttl_area">
      <slot name="title"></slot>
    </div>
    <client-only>
      <swiper ref="swipeTxt" class="slide_item_list" :options="swipeTxtOptions">
        <swiper-slide v-if="maxItems === null || index < maxItems"
                      v-for="(item, index) in itemData" :key="index" class="list_item slide_list_item">
          <div class="list_item_head">
            <nuxt-link :to="item.link" class="thumb_area">
              <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
            </nuxt-link>
            <div v-if="isScrap" class="scrap_area">
              <button @click="toggleScrap(item.itemID)"
                      :class="$parent.$parent.myScrapData.indexOf(item.itemID) !== -1 ? 'is_active':''"
                      class="btn scrap_btn ic_before"></button>
            </div>
          </div>
          <nuxt-link :to="item.link" class="item_link">
            <div class="list_item_body">
              <div class="ttl_area">
                <h5 class="ttl">{{ item.title }}</h5>
              </div>
              <div class="item_info_group">
                <div v-if="NoMoreInfo" class="more_info">
                  <div class="grade_info">
                    <div class="star_area">
                      <i class="ic ic_grade"></i> {{ item.grade }}
                    </div>
                    <div class="review_area">
                      상품후기 <span>{{ numSet(item.reviewCount) }}</span>
                    </div>
                  </div>
                  <div v-if="!item.employee && item.price" class="price_info">
                    <p v-if="item.price.discount" class="discount">
                      <strong class="ratio">{{ item.price.discount }}%</strong>
                      <span>{{ numSet(item.price.default) }}원</span>
                    </p>
                    <p v-if="item.price.discount"><em>{{ numSet(discountSet(item.price.default, item.price.discount))
                      }}</em>원</p>
                    <p v-else><em>{{ numSet(item.price.default) }}</em>원</p>
                  </div>
                  <div v-if="item.employee" class="price_info">
                    <p class="discount">
                      <strong class="ratio">{{ item.employeePrice.discount }}%</strong>
                      <span>{{ numSet(item.employeePrice.default) }}원</span>
                    </p>
                    <p><em>{{ numSet(discountSet(item.price.default, item.price.discount))
                      }}</em>원 <span class="type_employee">임직원가</span></p>
                  </div>
                </div>
                <div v-if="item.itemInfo" class="item_info">
                  <dl v-if="NoConsult" class="label_txt">
                    <dt>상담</dt>
                    <dd>{{ item.itemInfo.consult }}</dd>
                  </dl>
                  <dl class="label_txt">
                    <dt>스크랩</dt>
                    <dd>{{ item.itemInfo.scrap }}</dd>
                  </dl>
                  <dl class="label_txt">
                    <dt>조회</dt>
                    <dd>{{ item.itemInfo.view }}</dd>
                  </dl>
                </div>
                <div v-if="item.writer" class="writer_info">
                  <div class="profile_area">
                    <figure class="profile" :style="`background-image: url('${item.writer.profile}')`"></figure>
                  </div>
                  <div class="name_area">
                    <span>{{ item.writer.name }}</span>
                  </div>
                </div>
                <div v-if="item.badges" class="badge_ls">
                  <img v-if="badgeShow" v-for="(badge, i) in item.badges" :key="item.id + '_badges' + i"
                       :src="'/img/common/flag_' + badge+ '.png'" class="badge">
                </div>
              </div>
            </div>
          </nuxt-link>
        </swiper-slide>
      </swiper>
      <div v-if="!withTtlArw && itemData.length > itemCol" class="ls_arw_group">
        <button :class="slideName" class="arr_prev">
          <i class="arw arw_list_left"></i>
        </button>
        <button :class="slideName" class="arr_next">
          <i class="arw arw_list_right"></i>
        </button>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "SwipeItemList",
  data() {
    return {
      swipeTxtOptions: {
        loop: this.slideLoop,
        navigation: {
          nextEl: `.${this.slideName}.arr_next`,
          prevEl: `.${this.slideName}.arr_prev`,
        },
        slidesPerView: this.itemCol,
        spaceBetween: 30,
        slidesPerGroup: this.moveGroup,
        shortSwipes: false,
      },
      currentSlide: 1,
      totalSlide: this.itemData.length,
    };
  },
  props: {
    slideLoop:{
      type:Boolean,
      default:true,
    },
    withTtlArw: {
      type: Boolean,
      default: false,
    },
    itemData: {
      type: Array,
      default: "",
    },
    slideName:{
      type:String,
      default:'zin_banner_arw',
    },
    itemCol: {
      type: Number,
      default: 4,
    },
    moveGroup: {
      type: Number,
      default: 1,
    },
    maxItems: {
      type: Number,
      default: null,
    },
    isScrap: {
      type: Boolean,
      default: false,
    },
    NoConsult:{
      type: Boolean,
      default: false,
    },
    badgeShow: {
      type: Boolean,
      default: true,
    },
    NoMoreInfo:{
      type: Boolean,
      deault:false,
    }
  },
  methods:{
    toggleScrap: function(id) {
      let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      if (idIdx === -1) {
        this.$parent.$parent.myScrapData.push(id);
      } else {
        this.$parent.$parent.myScrapData.splice(idIdx, 1);
      }
    },
    numSet(val) {
      if (!val) return val = "";
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    discountSet(val, percent) {
      let calcVal = val * ((100 - percent) / 100);
      return calcVal;
    },
  },
  async mounted() {
    await this.$nextTick();
  },
};
</script>

<style scoped>

</style>
