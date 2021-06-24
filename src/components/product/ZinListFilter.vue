<template>
  <div class="filter_wrap">
    
    <div class="filter_head">
      <div class="btn_area">
        <button @click="toggleFilter" class="btn btn_ic filter_btn">필터 <i class="ic ic_filter"></i></button>
      </div>
      <!-- 선택된 필터항목 표시 영역 -->
      <div class="sel_filter_area">
        <div class="chip_ls">
          <v-chip v-for="(chip, k) in selectedChips" :key="'chip_'+k"
                  close @click:close="removeChip(chip)" class="chip_item">
            <!-- <span v-if="chip.codeGroup === 'color' && (chip.code === 'all' || chip.code === 'CO02' /*화이트*/)" :class="'type_color c_' + chip.value">{{ chip.name }}</span> -->
            <span v-if="chip.codeGroup === 'color' && (chip.code === 'all' || chip.code === 'CO02' /*화이트*/)" :class="'c_' + chip.value">{{ chip.name }}</span>
            <!-- <span v-else-if="chip.codeGroup === 'color'" class="type_color" :style="`background-color: #${chip.value}`">{{ chip.name }}</span> -->
            <span v-else>{{ chip.name }}</span>
          </v-chip>
        </div>
      </div>
    </div>

    <div class="filter_body" v-if="showFilter">
      <!-- 필터 유형명 표시 -->
      <div class="filter_cate_group">
        <button v-for="(data, i) in filtersData" :key="'filter_group' + i"
                @click="selFilterGroup(data.filterGroup.code)" class="filter_cate_item" :class="{'is_active':selectedFilter.state && selectedFilter.code === data.filterGroup.code}"
        >{{ data.filterGroup.name }}</button>
      </div>
      <!-- 유형에 대한 상세코드 표시 -->
      <div v-for="(data, i) in filtersData" :key="i" 
          v-if="selectedFilter.state && selectedFilter.code === data.filterGroup.code"
          class="detail_filter_group">

        <!-- color를 표시하는 경우 -->
        <div v-if="data.filterGroup.code === 'color'" class="input_area check inline "><!--type_color 추가-->
          <div v-for="(filter, k) in data.filterList" :key="'detail_filter' + i + '_'+ k" class="input_box">

            <!-- 전체로 설정한 경우 -->
            <label v-if="filter.code === 'all' || filter.code === 'CO02' /*화이트*/" :class="'c_' + filter.value" @change="checkFilter(filter)">
              <input v-model="checkedValue" type="checkbox" :name="filter.codeGroup" :value="filter">
              <span>{{ filter.name }}</span>
            </label>

            <!-- 그 외 색상 -->
            <label v-else  @change="checkFilter(filter)">
              <input v-model="checkedValue" type="checkbox" :name="filter.codeGroup" :value="filter">
              <!-- <span :style="`background-color: #${filter.value}`">{{ filter.name }}</span> -->
              <span>{{ filter.name }}</span>
            </label>
          </div>
        </div>

        <!-- 컬러 외 Checkbox 타입인 경우 -->
        <div v-else class="input_area check inline">
          <div class="input_box" v-for="(filter, k) in data.filterList" :key="'detail_filter' + i + '_'+ k">
            <label>
              <input v-model="checkedValue" type="checkbox" :name="filter.code" :value="filter" @change="checkFilter(filter)">
              <span>{{ filter.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showFilter" class="filter_foot">
      <form>
        <slot name="keywordField"></slot>
      </form>
    </div>
  </div>
</template>

<script>
import findIndex from "lodash/findIndex";

export default {
  name: "ZinListFilter",
  data() {
    return {
      selectedChips: [], //선택된 필터chip들
      showFilter: true,  //필터 영역을 표시할지 여부
      selectedFilter: { //현재 보여지고 있는 선택된 필터유형의 명칭과 상태
        code: "",
        state: false,
      },
      checkedValue: [],   //체크된 필터
    };
  },
  props: {
    filtersData: Array,     //카테고리에 대한 필터 데이터
  },
  methods: {
    removeChip: function(chip) { //선택한 필터조건 삭제 클릭시
      //chip 영역에서 삭제
      let num = findIndex(this.selectedChips, chip);
      this.selectedChips.splice(num, 1);
      //하단 필터옵션에서도 unchecked
      let idx = findIndex(this.checkedValue, chip);
      if (idx !== -1) {
        this.checkedValue.splice(idx, 1);
      }
    },
    toggleFilter() {        //필터 텍스트/깔대기 클릭시, 하단 필터 숨기기
      this.selectedFilter.code = '',
      this.selectedFilter.state = false;
      this.showFilter = !this.showFilter;
    },
    selFilterGroup(code) {   //필터 유형명 선택시
      if(this.selectedFilter.code === code) {
        this.selectedFilter.state = !this.selectedFilter.state;
      } else {
        this.selectedFilter.code = code;
        this.selectedFilter.state = true;
      }
    },
    resetFilter() { //초기화 처리
      this.selectedChips = [];   //선택된 필터 chip을 모두 삭제
      this.checkedValue = [];   //체크된 하단 필터옵션 모두 unchecked

      //필터그룹 하단 숨기기
      this.selectedFilter.code = '',
      this.selectedFilter.state = false;
    },
    checkFilter(filter) {
      let num = findIndex(this.selectedChips, filter);
      if(num !== -1) {  //이미 존재한다면 삭제
        this.selectedChips.splice(num, 1);
        return;
      }
      this.selectedChips.push(filter);
    },
    pushFilters() {    //검색할때, 선택된 필터를 조건으로 전달
      this.$emit("searchList", this.selectedChips);
    },
  },
};
</script>

<style scoped>

</style>
