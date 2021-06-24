<template>
  <div class="pagination_group">
    <button class="pagination_arw arw_perv type_first" :disabled="currentNo === 1"><i class="arw arw_2_left"></i></button>
    <button class="pagination_arw arw_perv" :disabled="currentNo === 1"><i class="arw arw_left"></i></button>
    <div class="pager_nums">
      <button v-for="num in 10" :class="currentNo === num ? 'is_active':''">{{ num }}</button>
    </div>
    <button class="pagination_arw arw_next"><i class="arw arw_right"></i></button>
    <button class="pagination_arw arw_next type_last"><i class="arw arw_2_right"></i></button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentNo: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped>

</style>