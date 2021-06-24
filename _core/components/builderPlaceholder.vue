<template>
  <div
    v-if="$$inEditing"
    :class="classes"
    ice-ghost="true"
    :style="style"
  >
    <div class="text" :style="style">
      {{ title || 'Setting Me' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    width: String,
    height: String,
    inlineBlock: Boolean,
  },

  computed: {
    classes () {
      return {
        'component-placeholder': true,
        'inline-block': this.inlineBlock,
      }
    },

    style () {
      // if ( !this.$inEditting() ) {
      //   return { display: 'none' }
      // }

      return {
        width: this.width,
        height: this.height,
      }
    },
  },
}
</script>

<style scoped>
.component-placeholder {
  color: #fff;
  text-align: center;
  display: block;
}

.component-placeholder:before {
  content: ' ';
  height: 100%;
  display: inline-block;
  width: 0;
  vertical-align: middle;
}

.component-placeholder .text {
  display: inline-block;
  font-size: 24px;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
  color: #065796;
  vertical-align: middle;
}

  .component-placeholder.inline-block {
    display:inline-block;
  }
</style>
