<template>
  <div class="input_area select"
       :class="[{'is_inline' : inline}, {'must_input' : mustInput}, {'text' : textStyle}, {'hrz' : hrzStyle}]">
    <span v-if="selectTitle" class="label" :class="addTtlClass">{{ selectTitle }}</span>
    <div class="input_box">
      <button type="button" class="select selected_btn input_btn_open">
        <span v-if="!this.selectName" class="place_holder">{{ placeHolder }}</span>
        <span>{{ selectName }}</span>
        <i v-if="has_arw" class="arw arw_bottom"></i>
        <i v-if="has_triangle" class="arw arw_triangle_g"></i>
      </button>
      <ul class="option_ls">
        <li v-for="(item, index) in selectData" :key="'opt'+index" class="option_item"
            :class="selectName === item.text ? 'is_selected':''">
          <button type="button" @click="selectVal(item.value, item.text)" :disabled="item.disabled">{{ item.text }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectItem",
  data() {
    return {
      selectValue: null,
      selectName: null,
    };
  },
  props: {
    editorOrigin:{
      type: String,
      default: null,
    },
    has_arw: {
      type: Boolean,
      default: false,
    },
    has_triangle:{
      type:Boolean,
      default:false
    },
    placeHolder: {
      type: String,
      default: null,
    },
    mustInput: {
      type: Boolean,
      default: false,
    },
    selectTitle: {
      type: String,
      default: null,
    },
    selectData: {
      type: Array,
      default: null,
    },
    setValue: {
      type: String,
      default: null,
    },
    setPlaceholder: {
      type: String,
      default: "선택해주세요.",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    textStyle: {
      type: Boolean,
      default: false,
    },
    hrzStyle: {
      type: Boolean,
      default: false,
    },
    addTtlClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    selectVal(v, t) {
      this.selectValue = v;
      this.selectName = t;
      this.$emit("selVal", this.selectValue);
      if ( this.editorOrigin !== null ) { this.$emit(this.editorOrigin, this.selectValue); }
    },
    selectActive() {
      let wrapper = document.querySelector("#wrapper");
      let currentInput = "";
      let optionLsAll = document.querySelectorAll(".option_ls");
      let selectAll = document.querySelectorAll(".input_area.select");
      let optionLs;
      wrapper.addEventListener("click", function(e) {
        let thisInput = e.target.closest(".input_area.select");
        if (thisInput) {
          optionLs = thisInput.querySelector(".option_ls");
          thisInput.classList.add("is_active");
          optionLsAll.forEach(item => {
            item.style.display = "none";
          });
          if (currentInput === thisInput) {
            if (optionLs) {
              optionLs.style.display = "none";
            }
            thisInput.classList.remove("is_active");
            currentInput = "";
          } else {
            if (optionLs) {
              optionLs.style.display = "block";
            }
            thisInput.classList.add("is_active");
            currentInput = thisInput;
          }
        } else {
          optionLsAll.forEach(item => {
            item.style.display = "none";
          });
          selectAll.forEach(item => {
            item.classList.remove("is_active");
          });
          currentInput = "";
        }
      });
    },
  },
  async mounted() {
    await this.$nextTick();
    this.selectActive();
    if (this.setValue !== null) {
      this.selectName = this.setValue;
      this.selectData.forEach((v, i) => {
        if (v.text === this.setValue) this.selectValue = this.selectData[i].value;
      });
    } else {
      this.selectName = this.selectData[0].name;
      this.selectValue = this.selectData[0].value;
    }

  },
};
</script>
