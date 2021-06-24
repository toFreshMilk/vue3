<template>
  <section>
    <div class="best_cate_tab_wrap">
        <div class="best_cate_tab">
            <div class="tabs" :class="setType(tabType)">
                <div v-for="(tab, i) in tabData" :key="'tab'+i"
                    class="tab_node" :class="currentTab === tab.name ? 'is_active':''">
                <button @click="setCurrentTab(tab.name)" class="tab_item">{{ tab.name }}</button>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "StoreTabs",
    data() {
        return {
            currentNo: 1,
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
}
</script>

<style scoped>

</style>