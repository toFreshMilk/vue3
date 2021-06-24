<template>
  <div class="item_list_wrap" :class="classAdd">
    <div class="item_list">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_15 ib">
        <div v-if="maxItems === null || maxItems > i"
             v-for="(item, i) in listItem" class="col" :class="itemCol === 5 ?
             'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item">
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
              </div>
              <div class="item_info_group">
                <div v-if="item.itemInfo" class="item_info">
                  <dl class="label_txt">
                    <dd>{{ item.writingDate }}</dd>
                  </dl>
                  <dl class="label_txt">
                    <dt>조회</dt>
                    <dd>{{ numSet(item.itemInfo.view) }}</dd>
                  </dl>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div v-else-if="listItem === null || listItem.length < 1" class="no_result has_ic">
        <i class="ic_find_error ic"></i>
        <p>조회 결과가 없습니다.</p>
      </div>
    </div>
    <Pagination v-if="(listItem !== null && listItem.length > 0) && maxItems === null && PaginationShow" :crremtNo="currentNo" />
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
    itemCol: {
      type: Number,
      default: 4,
    },
    maxItems: {
      type: Number,
      default: null,
    },
    PaginationShow:{
      type:Boolean,
      default : true,
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
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    discountSet(val, percent) {
      let calcVal = val * ((100 - percent) / 100);
      return calcVal;
    },
  },
};
</script>

