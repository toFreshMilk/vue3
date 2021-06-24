<template>
  <div class="item_list_wrap style_list_wrap" :class="classAdd">
    <div class="item_list exam_item_list">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_15 ib">
        <div v-if="!maxItems || maxItems > i"
             v-for="(item, i) in listItem" class="col" :key="i" :class="itemCol === 5 ? 'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item exam_list_item" :class="setClass(listType)">
            <div class="list_item_head exam_list_item_head">
              <a :href="item.link" class="thumb_area">
                <figure class="thumb" :style="`background-image: url('${item.imagePath}/${item.attachImageName}')`"></figure>
              </a>
              <div v-if="noneScrap" class="scrap_area">
                <button @click="toggleScrap(item.itemID)"
                        class="btn scrap_btn ic_before"></button>
                        <!-- :class="$parent.$parent.myScrapData.indexOf(item.itemID) !== -1 ? 'is_active':''" -->
              </div>
            </div>
            <a :href="item.link" class="list_item_body exam_list_item_body">
              <div class="ttl_area">
                <h6 class="ttl">{{ item.title }}</h6>
              </div>
              <div v-if="examInfoShow" class="item_info_group">
                <div v-if="item.shootLocation" class="place_info">
                  <span>{{ item.shootLocation }}</span>
                </div>
                <div v-if="item.itemInfo" class="item_info">
                  <dl class="label_txt"><!-- 크기 -->
                    <dd><span>{{ numSet(item.itemInfo.size) }}</span></dd>
                  </dl>
                  <dl class="label_txt"><!-- 스타일 -->
                    <dd><span>{{ numSet(item.itemInfo.style) }}</span></dd>
                  </dl>
                  <dl class="label_txt"><!-- 가격 -->
                    <dd><span>{{ numSet(item.itemInfo.price) }}</span></dd>
                  </dl>
                </div>
                <div v-if="item.writer" class="writer_info">
                  <div class="profile_area">
                    <figure class="profile" :style="`background-image: url('${item.writer.profile}')`"></figure>
                  </div>
                  <div class="name_area">
                    <span>{{ item.writer.name }}</span>
                  </div>
                </div>
                <div v-if="item.tags" class="tag_info hash_btn_group">
                  <div v-for="(tag, k) in item.tags" :key="'tag'+k" class="hash_node">
                    <button class="hash_item">{{ tag }}</button>
                  </div>
                </div>
                <div v-if="item.badges" class="badge_ls">
                  <img v-if="badgeShow" v-for="(badge, i) in item.badges" :key="item.id + '_badges' + i"
                       :src="'/img/common/flag_' + badge+ '.png'" class="badge">
                </div>
                <div class="date_info">
                  <span>{{ item.writingDate }}</span>
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
    <Pagination v-if="paginationShow && (listItem !== null && listItem.length > 0) && maxItems === null" :crremtNo="currentNo" />
  </div>
</template>

<script>
import Pagination from "~/components/common/Pagination";

export default {
  name: "ExamList",
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
      default: null,
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
    examInfoShow:{
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
      // let idIdx = this.$parent.$parent.myScrapData.indexOf(id);
      // if (idIdx === -1) {
      //   this.$parent.$parent.myScrapData.push(id);
      // } else {
      //   this.$parent.$parent.myScrapData.splice(idIdx, 1);
      // }
    },
    numSet(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

