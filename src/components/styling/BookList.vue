<template>
  <div class="item_list_wrap" :class="classAdd">
    <ItemMasonry v-if="listItem !== null && listItem.length > 0" class="item_list book_list">
      <div v-masonry-tile v-if="maxItems === null || maxItems > i"
           v-for="(item, i) in listItem" :key="'book'+i"
           :style="{ width: portfolioW+'px' }" class="book_item">
        <div class="list_item book_list_item">
          <div class="list_item_head">
            <a :href="item.link" class="thumb_area">
              <img :src="item.img" :alt="item.title">
            </a>
          </div>
          <a :href="item.link" class="list_item_body">
            <div class="ttl_area">
              <h4 class="ttl">{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
          </a>
        </div>
      </div>
    </ItemMasonry>
    <div v-else-if="listItem === null || listItem.length < 1" class="item_list book_list">
      <div class="no_result has_ic">
        <p>조회 결과가 없습니다.</p>
      </div>
    </div>
    <div v-if="totalNo > 1" class="btn_area more_btn_area taC">
      <button class="btn basic h_m more_btn"><span>더보기 ({{ numSet(currentNo) }}/{{ numSet(totalNo) }})</span></button>
    </div>
  </div>
</template>

<script>
import ItemMasonry from "~/components/common/ItemMasonry";
import { masonryListSet,  removeMasonryListSet } from "~/common/js/masonry-list-set";

export default {
  name: "BookList",
  components: {
    ItemMasonry,
  },
  data() {
    return {
      currentNo: 1,
      totalNo: 5,
      portfolioW: null,
      gutter: 30,
    };
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
  },
  methods: {
    numSet(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
    let pageInt
    if(this.listItem.length%3 > 0) pageInt = 1
    else pageInt = 0;
    this.totalNo = parseInt(this.listItem.length/3) + pageInt
    let item = document.querySelector('.book_list')
    this.portfolioW = (item.clientWidth + this.gutter) / this.itemCol
    masonryListSet(this.gutter, this.itemCol)
  },
  beforeDestroy() {
    removeMasonryListSet()
  },
};
</script>

