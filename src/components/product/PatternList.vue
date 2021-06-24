<template>
  <div class="item_list_wrap pattern_list_wrap" :class="classAdd">
    <div class="item_list_group">
      <div class="item_list">
        <!-- 상품 목록 표시 -->
        <div class="grid grid_15 ib" v-if="listItem">
          <div v-for="(item, i) in listItem" :key="'item' + i"
               v-if="maxItems === null || maxItems > i"
               class="col" :class="itemCol === 5 ? 'col_x5':'col_'+ Math.ceil(12 / itemCol)">
            <ProductItem :item="item" />
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
import ProductItem from "~/components/product/ProductItem";

export default {
  name: "PatternList",
  components :{
    ProductItem,
  },
  data(){
    return {
      
    }
  },
  props: {
    listItem: {   //목록 데이터
      type: Array,
      default: null,
    },
    classAdd: {   //추가할 클래스
      type: String,
      default: "",
    },
    itemCol: {  //한 행에 표현할 데이터 갯수
      type: Number,
      default: 4,
    },
    maxItems: {
      type: Number,
      default: null,
    },
  },
  methods: {
   
  },
};
</script>

