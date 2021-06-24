<template>
  <div class="snack_wrap">
    <div class="openBtn" @click="snackbar = true">
      <slot name="openBtn"/>
    </div>
    <v-snackbar v-model="snackbar" timeout="2000" absolute="true">
      <slot name="bodyArea"/>
      <template v-slot:action="{ attrs }">
        <div v-if="cancelBtn" class="delete" @click="snackbar = false">
          <div class="cancel"><i class="ic ic_close_w"></i></div>
        </div>
      </template>
    </v-snackbar>

  </div>
</template>


<script>
export default {
  name: "ZinSnack",
  props:{
    cancelBtn :{
      type:Boolean,
      default : true,
    }
  },
  data: () => ({
    snackbar: false,
  }),
}
</script>


<style scoped>

</style>