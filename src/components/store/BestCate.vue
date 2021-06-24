<template>
  <div class="best_cate_tab_wrap" :class="classAdd">
    <div class="best_cate_tab">
<!--      <ZinTabs :tabData="tabData" tabType="default" setTab="전체" @setCurrentTab="setCurrentTab" />-->
      <div class="tabs" :class="setType(tabType)">
        <div v-for="(tab, i) in tabData" :key="'tab'+i"
             class="tab_node" :class="currentTab === tab.name ? 'is_active':''">
          <button @click="setCurrentTab(tab.name)" class="tab_item">{{ tab.name }}</button>
        </div>
      </div>
    </div>
    <div class="txt_area">
      <span>2021.05.31 07:00 기준</span>
    </div>
    <div class="item_list best_cate_list">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_15 ib">
        <div v-if="maxItems === null || maxItems > i" v-for="(item, i) in listItem" class="col"
             :class="itemCol === 5 ? 'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item">
            <div class="list_item_head">
              <a :href="item.link" class="thumb_area">
                <span v-if="item.soldout !== null && item.soldout.state" class="sold_out">품절</span>
                <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                <div class="number_area">
                  <div v-if="item.bestThree"  class="best_three">
                    <figure class="num_thumb_g" :style="`background-image: url('/img/common/flag_green.png')`"></figure>
                    <span class="item_num">{{ item.bestThree.num}}</span>
                  </div>
                  <div v-if="item.lastAll"  class="last_all">
                    <figure class="num_thumb_g" :style="`background-image: url('/img/common/flag_white.png')`"></figure>
                    <span class="item_num">{{ item.lastAll.num}}</span>
                  </div>
                </div>
              </a>
              <div v-if="noneScrap" class="scrap_area">
                <button @click="toggleScrap(item.itemID)"
                        :class="$parent.$parent.myScrapData.indexOf(item.itemID) !== -1 ? 'is_active':''"
                        class="btn scrap_btn ic_before"></button>
              </div>
            </div>
            <a :href="item.link" class="item_link">
              <div class="list_item_body">
                <div class="ttl_area">
                  <span v-if="item.brand" class="brand">{{ item.brand }}</span>
                  <h6 class="ttl">{{ item.title }}</h6>
                </div>
                <div class="item_info_group">
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
                  <div v-if="item.badges" class="badge_ls">
                    <img v-if="badgeShow" v-for="(badge, i) in item.badges" :key="item.id + '_badges' + i"
                         :src="'/img/common/flag_' + badge+ '.png'" class="badge">
                  </div>
                </div>
              </div>
            </a>
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
        <p>검색 결과가 없습니다.</p>
      </div>
    </div>
    <Pagination v-if="(listItem !== null && listItem.length > 0) && maxItems === null && paginationShow" :crremtNo="currentNo" />
  </div>
</template>

<script>
import Pagination from "~/components/common/Pagination";
import ZinTabs from "~/components/common/ZinTabs";
import ItemList from "~/components/common/ItemList";

export default {
  name: "BestCate",
  components: {
    Pagination,
  },
  data(){
    return {
      currentNo: 1,
      currentTab: '',
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
    badgeShow: {
      type: Boolean,
      default: true,
    },
    numShow:{
      type: Boolean,
      default: true,
    },
    maxItems: {
      type: Number,
      default: null,
    },
    noneScrap: {
      type: Boolean,
      default: true,
    },
    paginationShow:{
      type:Boolean,
      default : true,
    },
    tabData: {
      type: Array,
      default: null,
    },
    tabType: {
      type: String,
      default: '',
    },
    setTab: {
      type: String,
      default: '',
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
    setType(t) {
      if(t === 'line') return 'type_line';
      else if(t === 'text') return 'type_text';
      else return ''
    },
    setCurrentTab(name) {
      this.currentTab = name
      this.$emit('setCurrentTab', this.currentTab)
    },
  },
  mounted() {
    this.currentTab = this.setTab;
  },
};
</script>

