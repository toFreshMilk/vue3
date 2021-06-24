<template>
  <div class="item_list_wrap case_list_wrap" :class="classAdd">
    <div class="item_list case_item_list">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_15 ib">
        <div v-if="maxItems === null || maxItems > i"
             v-for="(item, i) in listItem" class="col" :class="itemCol === 5 ?
             'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item case_list_item" :class="setClass(listType)">
            <div class="list_item_head case_list_item_head">
              <a href="javascript:;" class="thumb_area">
                <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
              </a>
              <div v-if="noneScrap" class="scrap_area">
                <button class="btn scrap_btn ic_before"></button>
              </div>
            </div>
            <a href="javascript:;"  class="list_item_body case_list_item_body">
              <div class="ttl_area">
                <h6 class="ttl">{{ item.title }}</h6>
                <span class="code">{{ item.code }}</span>
              </div>
              <p>{{ item.content }}</p>
            </a>
          </div>
        </div>
      </div>
      <div v-else-if="listItem === null || listItem.length < 1" class="no_result has_ic">
        <i class="ic_find_error ic"></i>
        <p>조회 결과가 없습니다.</p>
      </div>
    </div>
    <Pagination v-if="(listItem !== null && listItem.length > 0) && maxItems === null && paginationShow" :crremtNo="currentNo" />
  </div>
</template>

<script>
import Pagination from "~/components/common/Pagination";

export default {
  name: "CaseList",
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
    ExamInfoShow:{
      type:Boolean,
      default : true,
    },
    paginationShow:{
      type:Boolean,
      default : true,
    },
    listType: {
      type: String,
      default: 'default',
    },
    noneScrap: {
      type: Boolean,
      default: true,
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
    setClass(type){
      let c
      if(type === 'card') c = 'type_card'
      else if(type === 'trend') c = 'type_trend';
      return c
    },
  },
};
</script>

