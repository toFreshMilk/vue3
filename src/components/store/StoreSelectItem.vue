<template>
  <div :class="className" class="input_area select store_select">
    <slot name="label"></slot>
    <div class="input_box">
      <i class="arw arw_bottom"></i>
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
</template>
<script>
export default {
  name: "StoreSelectItem",
  /* 0611. 하단 데이터 수정 */
  data() {
    return {
      selectName:null,
    };
  },
  props: {
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
    }
  },
  methods: {
    addItemOption(e, textData, indexNum) {
      let thisInputArea = e.currentTarget.closest('.input_area')
      /* 0611. 하단 스트립트 수정 */
      this.selectName = textData;
      let before = false
      if(this.$parent.$parent.addOption.length > 0) {
        this.$parent.$parent.addOption.forEach(v => {
          if(v.items.optionName === this.selectData.optionItems[indexNum].text) {
            this.$dialog.openSnackbar('이미 추가된 상품입니다.')
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
    // 0614 하단 메소드 스크립트 수정
    selectActive(){
      let wrapper = document.querySelector('#wrapper')
      let currentInput = ''
      let optionLsAll = document.querySelectorAll('.option_ls')
      let selectAll = document.querySelectorAll('.input_area.select')
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
          selectAll.forEach(item =>{
            item.classList.remove('is_active')
          })
          currentInput = ''
        }
      })
    },

  },
  async mounted() {
    await this.$nextTick();
    this.selectActive();
    if(this.selectData.placeHolder == null){
      this.selectName = this.selectData.optionItems[0].text
    }
  },
};
</script>
