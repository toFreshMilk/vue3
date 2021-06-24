<template>
  <div class="item_list_wrap pattern_list_wrap" :class="classAdd">
    <div class="item_list_group">
      <div v-for="(category, i) in listItem" :key="'item_list' + i"
           v-if="total > 0" class="item_list">
        <!-- 브랜드명/갯수 표시 -->
        <div class="item_list_head" v-if="category.groupCateItems">
          <div class="count_area">
            <strong class="brand_name">{{ category.groupCateName }}</strong> <strong class="c_point3">{{ category.groupCateItems ? category.groupCateItems.length : 0 }}</strong>개
          </div>
        </div>
        <!-- 브랜드별 상품 목록 표시 -->
        <div class="grid grid_15 ib" v-if="category.groupCateItems">
          <div v-for="(item, i) in category.groupCateItems" :key="'item' + i"
               v-if="maxItems === null || maxItems > i"
               class="col" :class="itemCol === 5 ? 'col_x5':'col_'+ Math.ceil(12 / itemCol)">
            <ProductItem :item="item" />
          </div>
        </div>
      </div>
      <div v-if="total == 0" class="no_result has_ic" style="border-top: 1px solid #E2E2E2;">
        <i class="ic_none_product"></i>
        <p>검색된 제품이 없습니다. </p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "~/components/product/ProductItem";

export default {
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
    classAdd: {
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
    total: {
      type: Number,
      default: 0,
    }
  },
  created() {
    console.log(this.total);
  },
  methods: {
   
  },
};
</script>

