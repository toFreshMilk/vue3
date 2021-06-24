<template>
  <div ice-prop-type="children" class="children-slot">
    <section class="content_sec">
      <div class="item_inner">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.children-slot {
  width: inherit;
  height: inherit;
}
</style>
