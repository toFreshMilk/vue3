<template>
  <div class="item_list_wrap style_list_wrap" :class="classAdd">
    <div class="item_list">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_15 ib">
        <div v-for="(item, i) in listItem" :key="'styleItem'+i" class="col" :class="itemCol === 5 ? 'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item style_list_item" :class="setClass(listType)">
            <div class="list_item_head">
              <nuxt-link :to="item.link" class="thumb_area">
                <div v-if="headFlag && item.badges" class="badge_ls">
                  <div v-if="badgeShow">
                    <img v-for="(badge, i) in item.badges" :key="item.id + '_badges' + i"
                      :src="'/img/common/flag_' + badge+ '.png'" class="badge">
                  </div>
                </div>
                <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
              </nuxt-link>
              <div v-if="noneScrap" class="scrap_area">
                <button @click="toggleScrap(item.itemID)"
                        :class="$parent.$parent.myScrapData.indexOf(item.itemID) !== -1 ? 'is_active':''"
                        class="btn scrap_btn ic_before"></button>
              </div>
            </div>
            <nuxt-link :to="item.link" class="thumb_area">
              <div class="ttl_area">
                <h6 class="ttl">{{ item.title }}</h6>
              </div>
              <div v-if="listfootShow" class="item_info_group">
                <div v-if="item.itemInfo && listType !== 'card'" class="item_info">
                  <dl class="label_txt">
                    <dt>상담</dt>
                    <dd>{{ numSet(item.itemInfo.consulting) }}</dd>
                  </dl>
                  <dl class="label_txt">
                    <dt>스크랩</dt>
                    <dd>{{ numSet(item.itemInfo.scrap) }}</dd>
                  </dl>
                  <dl class="label_txt">
                    <dt>조회</dt>
                    <dd>{{ numSet(item.itemInfo.view) }}</dd>
                  </dl>
                </div>
                <div v-if="item.place" class="place_info">
                  <span>{{ setPlace(item.place) }}</span>
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
                <div v-if="!headFlag && item.badges" class="badge_ls">
                  <div v-if="badgeShow">
                    <img v-for="(badge, i) in item.badges" :key="item.id + '_badges' + i"
                      :src="'/img/common/flag_' + badge+ '.png'" class="badge">
                  </div>
                </div>
                <div class="date_info">
                  <span>{{ item.writingDate }}</span>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-else-if="listItem === null || listItem.length < 1" class="no_result has_ic">
        <i class="ic_find_error ic"></i>
        <p>조회 결과가 없습니다.</p>
      </div>
    </div>
    <Pagination v-if="(listItem !== null && listItem.length > 0) && maxItems === null && paginationShow" :crremtNo="currentNo" />
    <div v-if="showMoreBtn && totalNo > 1" class="more_btn_area btn_area taC">
      <button class="btn basic h_m more_btn"><span>더보기 ({{ numSet(currentNo) }}/{{ numSet(totalNo) }})</span></button>
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
      totalNo: 10,
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
    listfootShow:{
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
    showMoreBtn: {
      type: Boolean,
      default: false,
    },
    headFlag: {
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
      let valToString = String(val);
      return valToString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    setPlace(text){
      if(text.length > 20) return text.slice(0, 19) + '…';
      return text
    },
  },
  mounted() {
    let pageInt
    if(this.listItem.length%3 > 0) pageInt = 1
    else pageInt = 0;
    this.totalNo = parseInt(this.listItem.length/3) + pageInt
  },
};
</script>

