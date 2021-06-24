<template>
  <div class="main_content">
    <client-only>
      <div v-masonry transition-duration="0" destroy-delay="0" item-selector=".book_item" class="masonry-container">
        <slot></slot>
      </div>
    </client-only>
  </div>
</template>

<script>
import ClientOnly from "vue-client-only";

export default {
  name: "item-masonry-list",
  components: {
    ClientOnly,
  },
  data(){
    return {
    }
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
}
</script>

<style scoped>

</style>
