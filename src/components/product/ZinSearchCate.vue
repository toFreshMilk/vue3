<template>
  <div class="category_wrap">
    <!-- 선택된 카테고리명/버튼 표시 영역 -->
    <div class="category_head">
      <div class="btn_area taR">
        <button @click="openCateMode" class="cate_btn">{{ currentCate.name }} <i class="ic_menu"></i></button>
      </div>
    </div>
    <!-- 카테고리 layer -->
    <div v-if="is_cateMode" class="category_body">
      <div class="ttl_group has_elem">
        <div class="ttl_area">
          <h6 class="ttl">검색 Category를 선택 하세요.</h6>
        </div>
        <div class="btn_area">
          <button @click="closeCateMode" class="close_cate"><i class="ic ic_close_m"></i></button>
        </div>
      </div>
      <!-- 카테고리 목록 -->
      <div class="cate_group">
        <div class="input_area radio type_btn inline">
          <div v-for="(item, idx) in categoryData" :key="'search_cate' + idx" class="input_box">
            <label>
              <input v-model="currentCate.category" type="radio" name="category" :value="item.category" @click.prevent="reloadFilter(item)">
              <span>{{ item.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ZinSearchCate",
  data() {
    return {
      categoryData: [
        {
          category: '',
          name: '전체',
        },
      ],
      currentCate: { //선택된 카테고리
        category: this.category, 
        name: "" 
      },
    }
  },
  props: {
    category: {         //이전 화면에서 선택되어 넘어온 카테고리
      type: String,
      default: ''
    },
    is_cateMode: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.productCategory.categoryList,
    }),
  },
  methods: {
    reloadFilter(item){
      this.currentCate = item;
      this.$emit("reloadFilter", this.currentCate.category);
      this.closeCateMode();
    },
    openCateMode(){
      this.$emit("switchCateMode", true);
    },
    closeCateMode() {
      this.$emit("switchCateMode", false);
    },
  },
  async mounted() {
    //필터 상단. 카테고리 조회
    this.categoryData.push(...this.categoryList);

    this.categoryData.forEach(data => {
      if (data.category === this.category) {
        this.currentCate.name = data.name;
      }
    });
  },
};
</script>

<style scoped>

</style>