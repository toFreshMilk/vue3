<template>
  <div class="tabs zin_detail_tab" :class="setType(tabType)">
    <div v-for="(tab, i) in tabData" :key="'subcate'+i"
         class="tab_node" :class="currentTab === tab.category ? 'is_active':''">
      <button @click="setCurrentTab(tab.category)" class="tab_item zin_detail_tab_item">
        <span>{{ tab.name }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import head from 'lodash/head';

export default {
  name: "ZinDetailTabs",
  data(){
    return{
      currentTab: '',
    }
  },
  props: {
    tabData: {    //탭(카테고리) 목록
      type: Array,
      default: null,
    },
    tabType: {    //탭 표시할 css 유형
      type: String,
      default: '',
    },
    setTab: {     //선택된 탭(카테고리)
      type: String,
      default: '',
    },
  },
  methods:{
    setType(t) {
      if(t === 'line') return 'type_line';
      else if(t === 'text') return 'type_text';
      else return ''; //default
    },
    setCurrentTab(category) {
      this.currentTab = category;
      this.$emit('setCurrentTab', this.currentTab);
    },
  },
  mounted() {
    this.currentTab = this.setTab;
    if (!this.currentTab && this.tabData && this.tabData.length > 0) {
      this.currentTab = head(this.tabData).category;
    }
    this.setCurrentTab(this.currentTab);
  }
};
</script>

<style scoped>

</style>