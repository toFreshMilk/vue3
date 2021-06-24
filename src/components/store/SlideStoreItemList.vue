<template>
  <div :class="slideName" class="slide_item_list_wrap">
    <div v-if="withTtlArw" class="ttl_group has_elem">
      <div :class="{'has_link':hasLink}" class="ttl_area">
        <slot name="title"></slot>
        <a v-if="hasLink" href="#" class="more_view">더보기 <i class="arw arw_list_right"/></a>
        <div v-if="categoryItems" class="category_wrap">
          <button v-for="cate in categoryItems" :class="{is_active : cate.show}"><span
              v-if="cate.strongTxt" class="c_point3">{{ cate.strongTxt }}</span>{{ cate.txt }}
          </button>
        </div>
      </div>
      <div class="zin_arw_group">
        <button class="arr_prev">
          <i class="arw arw_list_left"></i>
        </button>
        <button class="arr_next">
          <i class="arw arw_list_right"></i>
        </button>
      </div>
    </div>
    <div v-if="!withTtlArw" :class="{'has_link':hasLink}" class="ttl_area">
      <slot name="title"></slot>
      <a v-if="hasLink" href="#" class="more_view">더보기 <i class="arw arw_right"/></a>
      <div v-if="categoryItems" class="category_wrap">
        <button v-for="cate in categoryItems" @click="cateActive(cate)" :class="{is_active : cate.show}"><span
            v-if="cate.strongTxt" class="c_point3">{{ cate.strongTxt }}</span>{{ cate.txt }}
        </button>
      </div>
    </div>
    <div v-if="hasPagination" class="zin_pagination_group">
      <span class="current">{{ zoreNumSet(currentSlide) }}</span>
      <div class="zin_pagination long" slot="pagination"/>
      <span class="total">{{ zoreNumSet(totalSlide) }}</span>
    </div>
    <client-only>
      <swiper ref="swipeList" class="slide_item_list" :options="swipeTxtOptions"
              @slideChangeTransitionEnd="onSlideChange"
      >
        <swiper-slide v-if="maxItems === null || index < maxItems"
                      v-for="(item, index) in itemData" :key="index" class="list_item slide_list_item">
          <StoreItem :item="item"/>
        </swiper-slide>
      </swiper>
      <div v-if="!withTtlArw && itemData.length > itemCol" class="ls_arw_group">
        <button class="arr_prev">
          <i class="arw arw_list_left"></i>
        </button>
        <button class="arr_next">
          <i class="arw arw_list_right"></i>
        </button>
      </div>
    </client-only>
  </div>
</template>

<script>
import StoreItem from "~/components/store/StoreItem"

export default {
  name: "SwipeStoreItemList",
  components: {
    StoreItem,
  },
  data() {
    return {
      swipeTxtOptions: {
        loop: this.slideLoop,
        navigation: {
          nextEl: `.${this.slideName} .arr_next`,
          prevEl: `.${this.slideName} .arr_prev`,
        },
        slidesPerView: this.itemCol,
        spaceBetween: 30,
        slidesPerGroup: this.moveGroup,
        pagination: {
          el: `.${this.slideName} .zin_pagination`,
          type: "progressbar",
          clickable: false,
        },
        autoplay: this.playTime,
      },
      playTime: false,
      currentSlide: 1,
      totalSlide: this.itemData.length,
    };
  },
  props: {
    autoplayDelay:{
      type:Object,
      default: null,
    },
    hasLink:{
      type:String,
      default:null,
    },
    categoryItems: {
      type: Array,
      default:null,
    },
    badgeShow: {
      type: Boolean,
      default: false,
    },
    slideLoop: {
      type: Boolean,
      default: true,
    },
    withTtlArw: {
      type: Boolean,
      default: false,
    },
    itemData: {
      type: Array,
      default: "",
    },
    slideName: {
      type: String,
      default: 'zin_banner_arw',
    },
    itemInfo: {
      type: Boolean,
      default: false,
    },
    itemCol: {
      type: Number,
      default: 5,
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
    hasPagination: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getLink(prdId) {
      return `/store/item/${prdId}`;
    },
    cateActive(item) {
      this.categoryItems.forEach((e) => {
        e.show = false
        item.show = true
      })
    },
    discountSet(val, percent) {
      let calcVal = val * ((100 - percent) / 100);
      return calcVal;
    },
    zoreNumSet(num) {
      if (num < 10) return "0" + num;
      return num;
    },
    heightSet(num) {
      if (num === null || num === 0) return "";
      return "height: " + num + "px;";
    },
    onSlideChange() {
      this.currentSlide = this.$refs.swipeList.$swiper.realIndex + 1;
      console.log(this.$refs.swipeList.$swiper)
    },
  },
  async mounted() {
    await this.$nextTick();
    this.currentSlide = this.$refs.swipeList.$swiper.realIndex + 1;
    if(this.autoplayDelay) this.playTime = this.autoplayDelay;
  },
};
</script>

<style scoped>

</style>
