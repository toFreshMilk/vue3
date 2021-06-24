<template>
  <div class="detail_wrap pin_wrap">
    <div class="ttl_area">
      <h2 class="ttl">{{ titleStr }}</h2>
    </div>
    <lg-image-pin :pinItems="pins" :image="image" />
    <div
      class="txt_area"
      ice-prop-bind="text"
      ice-prop-type="html"
      v-html="text"
      v-if="text"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: Object },
    text: { type: String },
    image: { type: String, default: "/img/noimage.png" },
    pins: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    titleStr() {
      return this.$getLabel(this.title);
    },
  },
};
</script>

<style scoped>
</style>
