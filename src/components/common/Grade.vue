<template>
  <div :class="[size == 'large' ? 'l_type' : 's_type']" class="grade_wrap" :data-grade="gradeNum">
    <div class="star_group">
      <div v-for="item in parseInt(gradeNum)" class="star_item">
        <span class="star_inner">
            <i class="zin_star zin_star_full"></i>
        </span>
      </div>
      <div v-for="(item, k) in  (5 - parseInt(gradeNum))" :key="k" class="star_item">
        <span v-if="k === 0" class="star_inner">
          <i class="zin_star zin_star_empty"></i>
          <b :style="`width: ${setStar(gradeNum)}%`" class="active_item">
            <i class="zin_star zin_star_full"></i></b>
        </span>
        <span v-else class="star_inner">
          <i class="zin_star zin_star_empty"></i>
        </span>
      </div>
    </div>
    <span class="num">{{ gradeNum }}</span>
  </div>
</template>

<script>
export default {
  name: "Grade",
  data() {
    return {}
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    gradeNum: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setStar(n) {
      return n % 1 * 100
    },
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>