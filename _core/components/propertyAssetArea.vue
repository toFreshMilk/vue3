<template>
  <div :ice-prop-bind="pid" ice-prop-type="image">
    <img class="image" :src="url">
  </div>
</template>

<script>
export default {
  props: {
    pid: { type: String },
    asset: { type: String },
    default: { type: String },
  },

  computed: {
    url () {
      return this.asset ? this.asset : this.default
    },
  },
}
</script>

<style scoped>
  .image {
    width: inherit;
    max-width: inherit;
    height: inherit;
    max-height: inherit;
  }
</style>
