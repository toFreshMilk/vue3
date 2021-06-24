<template>
  <div class="item_list_wrap clearFix" :class="classAdd">
    <div v-if="selectShow" :class="className" class="input_area select zintv_select flR">
      <div class="input_box">
        <i class="arw arw_triangle_g"></i>
        <div role="button" class="select selected_btn input_btn_open">
          <!-- 0611. 하단 SPAN 추가 및 데이터 수정 -->
          <span v-if="selectData.placeHolder" class="place_holder">{{ selectData.placeHolder }}</span>
          <span>{{ selectName }}</span>
        </div>
      </div>
      <ul class="option_ls">
        <li v-for="(item,index) in selectData.optionItems" class="option_item">
          <button v-if="addOption" @click="addItemOption($event, item.text, index)" :disabled="item.soldOut">{{ item.text }}</button>
          <button v-else @click="selectItem($event,item.text,index)" :disabled="item.soldOut">{{ item.text }}</button>
        </li>
      </ul>
    </div>
    <div class="item_list zintv_list flL">
      <div v-if="listItem !== null && listItem.length > 0" class="grid grid_13 ib">
        <div v-if="maxItems === null || maxItems > i"
             v-for="(item, i) in listItem" class="col" :class="itemCol === 5 ?
             'col_x5':'col_'+(12 / itemCol)">
          <div class="list_item zintv_list_item">
            <div class="list_item_head zintv_list_head">
              <a :href="item.link" class="thumb_area">
                <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
              </a>
            </div>
            <div class="list_item_body zintv_list_body">
              <div class="ttl_area">
                <span class="sub_ttl">{{ item.subttl }}</span>
                <h6 class="ttl">{{ item.title }}</h6>
              </div>
              <div class="item_info_group">
                <div class="item_info">
                  <dl class="label_txt">
                    <dd>{{ item.writingDate }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="listItem === null || listItem.length < 1" class="no_result has_ic">
        <i class="ic_find_error ic"></i>
        <p>등록된 영상 광고가 없습니다.</p>
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
  name: "ZinTvList",
  components: {
    Pagination,
  },
  data(){
    return {
      currentNo: 1,
      totalNo: 10,
      selectName:null,
      selectValue: null,
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
    maxItems: {
      type: Number,
      default: null,
    },
    paginationShow:{
      type:Boolean,
      default : true,
    },
    showMoreBtn: {
      type: Boolean,
      default: false,
    },
    placeHolder:{
      type:String,
      default:null,
    },
    addOption :{
      type:Boolean,
      default : true,
    },
    selectData: {
      type: Object,
      default: "",
    },
    className:{
      type:String,
      default:"",
    },
    selectShow:{
      type:Boolean,
      default : true,
    },
  },
  methods: {
    numSet(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addItemOption(e, textData, indexNum) {
      let thisInputArea = e.currentTarget.closest('.input_area')
      /* 0611. 하단 스트립트 수정 */
      this.selectName = textData;
      let before = false
      if(this.$parent.$parent.addOption.length > 0) {
        this.$parent.$parent.addOption.forEach(v => {
          if(v.items.optionName === this.selectData.optionItems[indexNum].text) {
            openSnackbar('이미 추가된 상품입니다.')
            return before = true
          }
        })
      }
      if (before) return
      let selItem = {
        items: {
          optionCategory: this.selectData.optionCategory,
          optionName: this.selectData.optionItems[indexNum].text,
        },
        price: this.selectData.optionItems[indexNum].price,
      }
      this.$parent.$parent.addOption.push(selItem)
      if(this.selectData.placeHolder){
        this.selectData.placeHolder = null
      }
    },
    selectItem(e, textData, indexNum){
      let thisInputArea = e.currentTarget.closest('.input_area')
      thisInputArea.querySelector('.input_btn_open').innerHTML = textData;
    },
    selectActive(){
      let wrapper = document.querySelector('#wrapper')
      let currentInput = ''
      let optionLsAll = document.querySelectorAll('.option_ls')
      let optionLs
      wrapper.addEventListener('click', function (e) {
        let thisInput = e.target.closest('.input_area')
        if (thisInput) {
          optionLs = thisInput.querySelector('.option_ls')
          thisInput.classList.add('is_active')
          optionLsAll.forEach(item => {
            item.style.display = 'none'
          })
          if (currentInput === thisInput) {
            if (optionLs) {
              optionLs.style.display = 'none'
            }
            thisInput.classList.remove('is_active')
            currentInput = ''
          } else {
            if (optionLs) {
              optionLs.style.display = 'block'
            }
            thisInput.classList.add('is_active')
            currentInput = thisInput
          }
        } else {
          optionLsAll.forEach(item => {
            item.style.display = 'none'
          })
          thisInput.classList.remove('is_active')
          currentInput = ''
        }
      })
    },
  },
  async mounted() {
    let pageInt
    if(this.listItem.length%3 > 0) pageInt = 1
    else pageInt = 0;
    this.totalNo = parseInt(this.listItem.length/3) + pageInt

    await this.$nextTick();
    this.selectActive();
    if(this.selectData.placeHolder == null){
      this.selectName = this.selectData.optionItems[0].text
    }
  },
};
</script>

