<template>
  <div class="category_wrap">
    <div class="category_head">
      <div class="btn_area taR">
        <button @click="setCateMode" class="cate_btn">{{ currentCate }} <i class="ic_menu"></i></button>
      </div>
    </div>
    <div v-if="$parent.$parent.is_cateMode" class="category_body">
      <div class="ttl_group has_elem">
        <div class="ttl_area">
          <h6 class="ttl">검색 Category를 선택 하세요.</h6>
        </div>
        <div class="btn_area">
          <button @click="clearCateMode" class="close_cate"><i class="ic ic_close_m"></i></button>
        </div>
      </div>
      <div class="cate_group">
        <div class="input_area radio type_btn inline">
          <div v-for="(cate, i) in categoryData" :key="'search_cate' + i" class="input_box">
            <label @click="a">
              <input v-model="currentCate" type="radio" name="category" :value="cate.val">
              <span>{{ cate.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZinSearchCate",
  data() {
    return {
      currentCate: null,
    }
  },
  props: {
    categoryData: {
      type: Array,
      default: [],
    },
  },
  methods: {
    a(){
      console.log(this.currentCate);
    },
    setCateMode(){
      this.$parent.$parent.is_cateMode = true
    },
    clearCateMode() {
      this.$parent.$parent.is_cateMode = false
    },
  },
};
</script>

<style scoped>

</style>