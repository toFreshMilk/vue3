<template>
  <div>
    <div class="list_item_head">
      <nuxt-link :to="getLink(item.prdId)" class="thumb_area">
        <span v-if="item.soldOutYn ==='Y'" class="sold_out">품절</span>
        <figure class="thumb" :style="`background-image: url('${item.imagePath}')`"></figure>
      </nuxt-link>
      <div class="scrap_area">
        <button @click="toggleScrap(item.prdId)"
                :class="item.scrapYn === 'Y' ? 'is_active':''"
                class="btn scrap_btn ic_before"></button>
      </div>
    </div>
    <nuxt-link :to="getLink(item.prdId)" class="item_link">
      <div class="list_item_body">
        <div class="ttl_area">
          <span v-if="item.vendrName" class="brand">{{ item.vendrName }}</span>
          <h6 class="ttl"><span v-if="item.itemColorTtl"
                                class="c_point3 strong_txt">{{ item.itemColorTtl }}</span>{{ item.prdName }}</h6>
          <p v-if="item.date" class="date">{{ item.date }}</p>
        </div>
        <div class="item_info_group">
          <div class="grade_info">
            <div class="star_area">
              <i class="ic ic_grade"></i> {{ item.starPoint }}
            </div>
            <div class="review_area">
              상품후기 <span>{{ numSet(item.epilogueCnt) }}</span>
            </div>
          </div>
          <div v-if="item.empPriceYn === 'Y'" class="price_info">
            <p class="discount">
              <strong class="ratio">{{ item.saleRate }}%</strong>
              <span>{{ numSet(item.sellPrice) }}원</span>
            </p>
            <p><em>{{ numSet(item.salePrice) }}</em>원 <span class="type_employee">임직원가</span></p>
          </div>
          <div v-else class="price_info">
            <p v-if="item.saleRate > 0" class="discount">
              <strong class="ratio">{{ item.saleRate }}%</strong>
              <span>{{ numSet(item.salePrice) }}원</span>
            </p>
            <p v-if="item.saleRate > 0"><em>{{ numSet(item.salePrice) }}</em>원</p>
            <p v-else><em>{{ numSet(item.sellPrice) }}</em>원</p>
          </div>
          <div v-if="item.itemInfo" class="item_info">
            <dl class="label_txt">
              <dt>스크랩</dt>
              <dd>{{ numSet(item.itemInfo.scrap) }}</dd>
            </dl>
            <dl class="label_txt">
              <dt>조회</dt>
              <dd>{{ numSet(item.itemInfo.view) }}</dd>
            </dl>
          </div>
          <div v-if="badges.length > 0" class="badge_ls">
            <img v-if="badgeShow" v-for="(badge, i) in badges" :key="item.id + '_badges' + i"
                  :src="'/img/common/flag_' + badge.type+ '.png'" class="badge">
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import getGoodsBadges from "~/common/utils/badge";

export default {
  name: "StoreItem",
  data() {
    return {
      badges: [],
    };
  },
  props: {
    item:{
      type:Object,
      default: {},
    },
    badgeShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getLink(prdId) {
      return `/store/goods/${prdId}`;
    },
    numSet(val) {
      if (!val) return val = '';
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    toggleScrap: function (id) {
      let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      if (idIdx === -1) {
        this.$parent.$parent.myScrapData.push(id);
      } else {
        this.$parent.$parent.myScrapData.splice(idIdx, 1);
      }
    },
  },
  async mounted() {
  },
  async fetch() {
    const badges = getGoodsBadges(this.item);
    this.badges = [...badges];
  },
};
</script>

<style scoped>

</style>
