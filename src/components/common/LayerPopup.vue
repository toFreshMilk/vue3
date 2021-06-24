<template>
  <div class="layer_popup" :class="{'is_show' : isShow}">
    <div class="layer_popup_area">
      <slot name="ttl"></slot>
      <slot name="cnt"></slot>
      <button @click="isShow = false" class="close_popup" type="button"><i class="ic ic_close_b"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayerPopup",
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    toggle(){
      this.isShow = !this.isShow;
    },
    show(){
      this.isShow = true;
    },
    hide(){
      this.isShow = false;
    },
  },
}
</script>

<style scoped>

</style>