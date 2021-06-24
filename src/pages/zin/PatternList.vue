<template>
  <div class="item_list_wrap pattern_list_wrap" :class="classAdd">
    <div class="item_list_group">
      <div v-for="(brand, i) in listItem" :key="'item_list' + i"
           v-if="listItem !== null && listItem.length > 0" class="item_list">
        <div v-if="BrandNameShow" class="item_list_head">
          <div class="count_area">
            <strong class="brand_name">{{ brand.brand }}</strong> <strong class="c_point3">{{ brand.items.length }}</strong>개
          </div>
        </div>
        <div class="grid grid_15 ib">
          <div v-for="(item, i) in brand.items" :key="'item' + i"
               v-if="maxItems === null || maxItems > i"
               class="col" :class="itemCol === 5 ? 'col_x5':'col_'+(12 / itemCol)">
            <div class="list_item pattern_list_item" :class="setClass(listType)">
              <div class="list_item_head">
                <a :href="item.link" class="thumb_area">
                  <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                </a>
                <div class="scrap_area">
                  <button @click="toggleScrap(item.itemID)"
                          :class="$parent.$parent.myScrapData.indexOf(item.itemID) !== -1 ? 'is_active':''"
                          class="btn scrap_btn ic_before"></button>
                </div>
              </div>
              <a :href="item.link" class="list_item_body">
                <div class="ttl_area">
                  <h6 class="ttl">{{ item.title }}</h6>
                  <p class="color">{{ item.color }}</p>
                  <p class="code">{{ item.code }}</p>
                </div>
                <div class="item_info_group">
                  <div v-if="item.badges && item.badges.length > 0" class="badge_ls">
                    <img v-if="badgeShow" v-for="(badge, i) in item.badges" :key="item.id + '_badges' + i"
                         :src="'/img/common/flag_' + badge+ '.png'" class="badge">
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="listItem === null || listItem.length < 1" class="no_result has_ic">
        <i class="ic_none_product"></i>
        <p>검색된 제품이 없습니다. </p>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "~/components/common/Pagination";

export default {
  name: "StyleList",
  components: {
    Pagination,
  },
  data(){
    return {
      currentNo: 1,
    }
  },
  props: {
    listItem: {
      type: Array,
      default: "",
    },
    classAdd: {
      type: String,
      default: "",
    },
    badgeShow: {
      type: Boolean,
      default: true,
    },
    itemCol: {
      type: Number,
      default: 4,
    },
    maxItems: {
      type: Number,
      default: null,
    },
    listType: {
      type: String,
      default: 'default',
    },
    BrandNameShow:{
      type: Boolean,
      default: true,
    }
  },
  methods: {
    toggleScrap: function(id) {
      let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      if (idIdx === -1) {
        this.$parent.$parent.myScrapData.push(id);
      } else {
        this.$parent.$parent.myScrapData.splice(idIdx, 1);
      }
    },
    numSet(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    discountSet(val, percent) {
      let calcVal = val * ((100 - percent) / 100);
      return calcVal;
    },
    setClass(type){
      let c
      if(type === 'card') c = 'type_card'
      else if(type === 'trend') c = 'type_trend';
      return c
    },
  },
};
</script>

