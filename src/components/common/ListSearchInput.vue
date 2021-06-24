<template>
  <form class="list_search_form" :class="`type_` + type">
    <div class="input_group search_input_group">
      <slot name="select"></slot>
      <div class="input_area text is_inline">
        <div class="input_box">
          <input
            v-model="keyword"
            :maxlength="maxlength"
            type="search"
            id="keyword"
            placeholder="검색어를 입력해주세요."
          />
          <button
            v-if="keyword.length > 0"
            @click="reset"
            type="button"
            class="reset_btn"
          >
            <i class="ic ic_close_s"></i>
          </button>
        </div>
      </div>
      <div class="btn_area">
        <button @click="submit" type="button" class="search_btn">
          <i class="ic ic_search"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ListSearchInput",
  data() {
    return {
      keyword: "",
    };
  },
  props: {
    maxlength: {
      type: Number,
      default: 30,
    },
    setPlaceholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "line",
    },
  },
  methods: {
    reset() {
      this.keyword = "";
      this.$emit("submit", this.keyword);
    },
    submit() {
      if (this.keyword.length < 1) {
        this.$dialog.alert("검색어를 입력해주세요.", function () {}, {
          motion: "fade",
        });
        return;
      }
      this.$emit("submit", this.keyword);
    },
  },
};
</script>

<style scoped>
</style>