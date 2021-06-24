<template>
  <div class="input_area select store_select">
    <slot name="label"></slot>
    <div class="input_box">
      <i class="arw arw_bottom"></i>
      <div role="button" class="select selected_btn input_btn_open">
        <span class="place_holder">{{ selectName }}</span>
      </div>
    </div>
    <ul class="option_ls">
      <li v-for="(item,i) in optionData.optnItem.slice(1)" class="option_item">
        <button @click="addItemOption(item)" :disabled="item.soldOut">{{ item.name }}<span v-if="item.price > 0"> (+{{ numSet(item.price) }}원)</span></button>
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
    optionData: {
      type: Object,
      default: {},
    },
  },
  methods: {
    addItemOption(item) {
      this.$emit("addOption", item);
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

    numSet(val) {
      if (val === 0 || val === '0') return 0;
      if (!val) return '';
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

  },
  async mounted() {
    await this.$nextTick();
    this.selectActive();
    this.selectName = this.optionData.optnItem[0].name;
  },
};
</script>
