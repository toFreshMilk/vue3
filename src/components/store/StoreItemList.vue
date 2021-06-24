<template>
  <div class="item_list_wrap" :class="classAdd">
    <div v-if="noneTtlSlot" class="ttl_wrap">
      <div class="ttl_area">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="item_list">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_15 ib">
        <div v-if="maxItems === null || maxItems > i" v-for="(item, i) in listItem" class="col" :class="itemCol === 5 ? 'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item">
            <StoreItem :item="item" :badgeShow="badgeShow"/>
            <div v-if="checkBoxShow && $parent.$parent.editArea" class="check_area">
              <label>
                <div class="input_area check">
                  <div class="input_box">
                    <input type="checkbox" :checked="$parent.$parent.checkAll">
                    <i class="ic_before ic_check_black"></i>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="listItem === null || listItem.length < 1" class="no_result has_ic">
        <i class="ic_find_error ic"></i>
        <p>조회 결과가 없습니다.</p>
      </div>
    </div>
    <Pagination v-if="showPaging && (listItem !== null && listItem.length > 0) && maxItems === null" :totalCount="totalCount" :currentNo="currentNo" :pageSize="pageSize" @changePage="onChangePage"/>
  </div>
</template>

<script>
import StoreItem from "~/components/store/StoreItem"
import Pagination from "~/components/common/Pagination";

export default {
  name: "ItemList",
  components: {
    Pagination,
    StoreItem,
  },
  data(){
    return {
      
    }
  },
  props: {
    totalCount: {
      type: Number,
      default: 0,
    },
    currentNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 60,
    },
    listItem: {
      type: Array,
      default: "",
    },
    classAdd: {
      type: String,
      default: "",
    },
    checkBoxShow: {
      type: Boolean,
      default: false,
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
    showPaging: {
      type: Boolean,
      default: true,
    },
    noneTtlSlot:{
      type: Boolean,
      default: false,
    },
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
      if (!val) return val = '';
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    discountSet(val, percent) {
      let calcVal = val * ((100 - percent) / 100);
      return calcVal;
    },
    onChangePage(pageNo) {
      this.$emit('changePage', pageNo);
    },
  },
};
</script>

<style >
@import url(~/assets/css/store.css);
</style>
