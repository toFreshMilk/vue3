<template>
  <div class="tabs" :class="setType(tabType)">
    <div v-for="(tab, i) in tabData" :key="'tab'+i"
         class="tab_node" :class="currentTab === tab.name ? 'is_active':''">
      <button @click="setCurrentTab(tab.name)" class="tab_item">{{ tab.name }}</button>
    </div>
  </div>
</template>

<script>
import head from 'lodash/head';

export default {
  name: "ZinTabs",
  data(){
    return{
      currentTab: '',
    }
  },
  props: {
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
  methods:{
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
    //기본탭 설정
    if (!this.currentTab && this.tabData && this.tabData.length > 0) {
      this.currentTab = head(this.tabData).name;
    }
    this.setCurrentTab(this.currentTab);
  },
};
</script>

<style scoped>

</style>