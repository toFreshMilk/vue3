<template>
  <div class="modal_wrap has_overlay" :class="{'is_show': showModal}">
    <div class="modal pattern">
      <div class="modal_head">
        <h3 class="ttl">친환경 벽지 제품 비교</h3>
        <p class="precautions_txt">실제 상품의 색상이 화면의 색상과 다를 수 있습니다.</p>
      </div>
      <div class="modal_body">
        <div class="pattern_view" :class="isActive === 2 ? 'mode2': isActive === 3 ? 'mode3': ''">
          <div class="pattern_one">
            <figure v-if="compareList[0] || compareList[0] === 0" class="thumb" :style="`${setBg(compareList[0])}`"></figure>
          </div>
          <div v-if="compareList[1]" class="pattern_two">
            <figure class="thumb" :style="`${setBg(compareList[1])}`"></figure>
          </div>
        </div>
      </div>
      <div class="modal_foot">
        <div class="view_guide_area">
          <p class="view_guide_txt">두 개의 제품을 선택하여 뷰모드로 확인하실 수 있습니다.</p>
          <div class="view_guide_ex">
            <button class="compare_view" v-for="index in 3" @click="viewMode(index)" :class="[`mode${index}`, {'is_active' : isActive === index}]" :key="index"></button>
          </div>
        </div>
        <div class="view_pattern_kind_area">
          <div class="view_pattern_kind">
            <div class="grid grid_3 ib">
              <div class="col col_view" v-for="(item, idx) in compareData" :key="idx">
                <div class="view_list_item">
                  <div class="list_item_head" @click="compareMode(idx)" :class="{'is_active' : isCompareInclude(idx)}">
                    <div class="list_item_head_thumb_area">
                      <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                    </div>
                    <div class="input_area check"></div>
                  </div>
                  <div class="list_item_body">
                    <h6>{{item.brand}}</h6>
                    <p>{{ item.title }}</p>
                    <p class="code">{{ item.code }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ZinProductCompare",
  data() {
    return {
      isActive: 1,
      compareList:[0, 1],
    }
  },
  methods: {
    viewMode(index) {
      this.isActive = index;
      console.log(this.compareList[0], 2)
    },
    compareMode(idx) {
      if(this.compareList.indexOf(idx) !== -1) {
        this.compareList = this.compareList.filter(item => item !== idx);
        return;
      }
      if(this.compareList.length >= 2) {
        this.compareList.splice(1, 1, idx);
        return;
      }
      this.compareList.push(idx);
      console.log(this.compareList[0], 1)
    },
    isCompareInclude(idx) {
      return this.compareList.indexOf(idx) !== -1;
    },
    closeModal() {
      this.$emit('close', false)
    },
    setBg(i) {
      return 'background-image: url(' + this.compareData[i].img + ')';
    },
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    compareData: {
      type: Array,
      default: null,
    },
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>