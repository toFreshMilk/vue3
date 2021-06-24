<template>
  <div class="filter_wrap">
    <div class="filter_head">
      <div class="btn_area">
        <button @click="clearFilterCate" class="btn btn_ic filter_btn">필터 <i class="ic ic_filter"></i></button>
      </div>
      <div class="sel_filter_area">
        <div class="chip_ls">
          <v-chip v-for="(chip, k) in selChipsObj" :key="'chip_'+k"
                  close @click:close="removeChip(chip)" class="chip_item">
            <!-- <span v-if="chip.indexOf('c_') !== -1 && color(chip) === 'white'" class="type_color c_white">{{ chip }}</span>
            <span v-else-if="chip.indexOf('c_') !== -1 && color(chip) === 'all'" class="type_color c_all">{{ chip }}</span>
            <span v-else-if="chip.indexOf('c_') !== -1" class="type_color" :style="`background-color: #${color(chip)}`" >{{ chip }}</span> -->
            <span v-if="chip.name === 'color' && (chip.value === 'all' || chip.value === 'CO02' /*화이트*/)" :class="'c_' + chip.value">{{ chip.label }}</span>
            <span v-else>{{ chip.label }}</span>
          </v-chip>
        </div>
      </div>
      <div v-if="hasBack || !hasSearch" class="btn_area">
        <button v-if="!hasSearch && hasBack" class="btn h_xs round back_btn">
          <i class="arw arw_back_g"></i> 돌아가기
        </button>
        <button v-if="!hasSearch"  @click="resetFilter"
                type="button" class="btn h_xs w_s basic round reset_btn" :disabled="selChips.length < 1 ? true:false"><i class="ic ic_reset"></i> 초기화</button>
      </div>
    </div>
    <div class="filter_body">
      <div class="filter_cate_group">
        <button v-for="(filterCate, i) in filtersData" :key="'filter_cate' + i"
                @click="selFilterCate(filterCate.name)" class="filter_cate_item" :class="{'is_active':selectedFilter.state && selectedFilter.name === filterCate.name}"
        >{{ filterCate.title }}</button>
      </div>
       <div v-for="(filterCate, i) in filtersData" :key="'selectedFilter'+i">
         <div v-if="selectedFilter.state && selectedFilter.name === filterCate.name" class="detail_filter_group">
          <div v-if="filterCate.type === 'checkbox' && filterCate.name === 'color'" class="input_area check inline type_color">
            <div v-for="(filter, k) in filterCate.opts" :key="'detail_filter' + i + '_'+ k"
                class="input_box" >
              <!-- 흰색 -->
              <label v-if="filter.value === 'fff' || filter.value === 'ffffff' || filter.label === 'white' || filter.label === '흰색'"
                    class="c_white" @change="setColor(filter)"
              >
                <input v-model="selColor" type="checkbox" :name="filter.name" :value="filter.value">
                <span>{{ filter.label }}</span>
              </label>

              <label v-else-if="filter.value === 'all' || filter.label === 'all' || filter.label === '전체'"
                    class="c_all" @change="setColor(filter)"
              >
                <input v-model="selColor" type="checkbox" :name="filter.name" :value="filter.value">
                <span>{{ filter.label }}</span>
              </label>

              <label v-else-if="filter.value === 'silver' || filter.label === 'silver' || filter.label === '실버'"
                    class="c_silver" @change="setColor(filter)"
              >
                <input v-model="selColor" type="checkbox" :name="filter.name" :value="filter.value">
                <span>{{ filter.label }}</span>
              </label>

              <label v-else-if="filter.value === 'gold' || filter.label === 'gold' || filter.label === '골드'"
                    class="c_gold" @change="setColor(filter)"
              >
                <input v-model="selColor" type="checkbox" :name="filter.name" :value="filter.value">
                <span>{{ filter.label }}</span>
              </label>
              
              <label v-else  @change="setColor(filter)">
                <input v-model="selColor" type="checkbox" :name="filter.name" :value="filter.value">
                <span :style="`background-color: #${filter.value}`">{{ filter.label }}</span>
              </label>
            </div>
          </div>
          <div v-else-if="filterCate.type === 'radio'" class="input_area radio type_chk inline">
            <div class="input_box" v-for="(filter, k) in filterCate.opts" :key="'detail_filter' + i + '_'+ k">
              <label @change="setRadio(filter, filterCate.name)">
                <input v-model="selRadio[filterCate.name].current" type="radio" :name="filter.name" :value="filter.label">
                <span>{{ filter.label }}</span>
              </label>
            </div>
          </div>
          <div v-else-if="filterCate.type === 'checkbox'" class="input_area check inline">
            <div class="input_box" v-for="(filter, k) in filterCate.opts" :key="'detail_filter' + i + '_'+ k">
              <label @change="setCheck(filter)">
                <input v-model="selCheck" type="checkbox" :name="filter.name" :value="filter.label">
                <span>{{ filter.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasSearch" class="filter_foot">
      <form>
        <div class="input_area text hrz">
          <label for="keyword">검색어</label>
          <div class="input_box">
            <input v-model="keyword" type="search" id="keyword" placeholder="제품명/코드명 입력">
          </div>
        </div>
        <div class="btn_area taR">
          <button v-if="hasBack" class="btn h_s w_s basic back_btn">돌아가기</button>
          <button @click="resetFilter" type="button" class="btn h_s w_s basic reset_btn" :disabled="selChips.length < 1 && keyword.length < 1 ? true:false">초기화</button>
          <button type="button" class="btn h_s w_s strong">{{ searchName }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import cloneDeep from "lodash";
import findIndex from "lodash/findIndex";

export default {
  name: "StyleFilter",
  data() {
    return {
      keyword: '',
      radioData: null,
      selChips: [],
      selChipsObj: [],
      selCheck: [],
      selRadio: new Object(),
      selColor: [],
      chip1: true,
      popupBtn: true,
      selectedFilter: {
        name: "",
        state: false,
      },
    };
  },
  props: {
    filtersData: {
      type: Array,
      default: null,
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    searchName: {
      type: String,
      default: '검색',
    },
    hasBack: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    selChipsObj: function(val){
      this.$emit('filtering', val);
    }
  },
  methods: {
    removeChip: function(chip) {
      let num = findIndex(this.selChipsObj, chip);
      this.selChips.splice(num, 1);
      this.selChipsObj.splice(num, 1);
      //하단 필터옵션에서도 unchecked
      if (chip.type == "radio") {
        this.selRadio[chip.name] = {current: ''};
      } else if (chip.name == "color") {
        let colorNum = this.selColor.indexOf(chip.value);
        if (colorNum !== -1) {
          this.selColor.splice(colorNum, 1);
        }
      } else if (chip.type == "checkbox" && chip.name !== "color") {
        let checkNum = this.selCheck.indexOf(chip.label);
        if (checkNum !== -1) {
          this.selCheck.splice(checkNum, 1);
        }
      }
    },
    clearFilterCate() {
      this.selectedFilter.name = '',
        this.selectedFilter.state = false
    },
    selFilterCate(name) {
      if(this.selectedFilter.name === name) {
        this.selectedFilter.state = !this.selectedFilter.state;
      } else {
        this.selectedFilter.name = name;
        this.selectedFilter.state = true;
      }
    },
    resetFilter() {
      this.selChips = [];
      this.keyword = '';
    },
    setRadio(val, name) {
      let before = this.selRadio[name].before
      let num = this.selChips.indexOf(before)
      if(num !== -1) {
        this.selChips.splice(num, 1);
        this.selChipsObj.splice(num, 1);
      }
      this.selChips.push(val.label);
      this.selRadio[name].before = val.label;
      this.selChipsObj.push(val);
    },
    setColor(val) {
      let c = 'c_' + val.value; //c_CO01.. => c_010101 RGB 값이 되야함
      let num = this.selChips.indexOf(c);
      if(num !== -1 && this.selColor.indexOf(val.label) === -1) {
        this.selChips.splice(num, 1);
        this.selChipsObj.splice(num, 1);
        return
      }
      this.selChips.push(c);
      this.selChipsObj.push(val);
    },
    setCheck(val) {
      let num = this.selChips.indexOf(val.label);
      if(num !== -1) {
        this.selChips.splice(num, 1);
        this.selChipsObj.splice(num, 1);
        return;
      }
      this.selChips.push(val.label);
      this.selChipsObj.push(val);
    },
    color(v){
      return v.replace('c_', '')
    },
  },
  created() {
    let copyItems = cloneDeep(this.filtersData);
    this.radioData = copyItems.filter(v => v.type === 'radio');
    this.radioData.forEach(v1 => {
      this.selRadio[v1.name] = {
        current: '',
        before: '',
      }
    })
  },
};
</script>

