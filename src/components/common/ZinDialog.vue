<template>
  <div :class="contour ? 'contour_item':''" class="modal">
    <v-dialog v-model="dialog" :max-width="maxW !== null ? maxW + 'px': ''">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <slot name="btn"></slot>
        </div>
      </template>
      <div :class="{'no_P':noP}" class="v-card">
        <v-card-title v-if="dialogTitle" class="modal_head">
          <h5 class="modal_ttl">{{ dialogTitle }}</h5>
          <slot name="headArea"></slot>
        </v-card-title>
        <v-card-text class="modal_body">
          <slot name="bodyArea"></slot>
        </v-card-text>
        <v-card-actions>
          <div class="modal_foot">
            <div class="btn_area full_btn_area grid grid_5">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </v-card-actions>
        <div v-if="noticeArea" class="notice_area">
          <slot name="noticeArea"></slot>
        </div>
        <div v-if="topBtn" class="top_close_btn">
          <button @click="dialog=false"><i class="ic ic_close_b"></i></button>
        </div>
      </div>
      <!-- <slot name="txtBtn"></slot>-->
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ZinDialog",
  props: {
    dialogTitle: {
      type: String,
    },
    noP:{
      type:Boolean,
      default:false,
    },
    topBtn: {
      type: Boolean,
      default: true,
    },
    contour:{
      type:Boolean,
      default:false
    },
    maxW: {
      type: Number,
      default: null,
    },
    noticeArea:{
      type:Boolean,
      default:false,
    },
    isSelect:{
      type:Boolean,
      default:false,
    },
  },
  data() {
    return {
      dialog: false,
      isNotFlex: false,
    }
  },
}
</script>

<style scoped>

</style>
