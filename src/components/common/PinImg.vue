<template>
  <div class="pin_img_group">
<!--    <div class="img_area">-->
<!--    todo-->
<!--    vue.runtime.esm.js:619 [Vue warn]: Failed to resolve directive: viewer-->

<!--    (found in <PinImg>)-->
    <div class="img_area" v-viewer="viewerOpt">
      <img :src="pinImgUrl" alt="">
      <div class="pin_group">
        <div v-for="pinItem in pinItems"
             class="pin_frame"
             :class="currentPin === pinItem.itemID ? 'is_active':''"
             :style="`left:${pinItem.locationX}%; top:${pinItem.locationY}%;`">
          <div @click="pinActive2($event, pinItem.itemID)" class="btn_area">
            <button class="pin_item"><i class="ic ic_plus"></i></button>
          </div>
        </div>

      </div>
    </div>
    <div class="thumb_list_area">
      <client-only>
        <swiper class="thumb_list" :options="swipeThumbOptions">
          <swiper-slide v-for="sItem in pinItems" :class="currentPin === sItem.itemID ? 'is_active':''" class="thumb_item">
            <figure class="thumb" @click="pinActive2($event, sItem.itemID)"
                    :style="`background-image: url('${sItem.img}')`">
            </figure>
            <div class="txt_area">
              <small class="brand">{{ sItem.type }}</small>
              <p class="item_name">{{ sItem.title }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
      <div class="arw_group">
        <button v-if="pinItems.length>swipeThumbOptions.slidesPerView" class="zin_banner_arw arr_prev">
          <i class="arw arw_mid_left"></i>
        </button>
        <button v-if="pinItems.length>swipeThumbOptions.slidesPerView" class="zin_banner_arw arr_next">
          <i class="arw arw_mid_right"></i>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PinImg",
  data(){
    return{
      swipeThumbOptions: {
        loop: false,
        slidesPerView: '6',
        spaceBetween: 12,
        navigation: {
          nextEl: '.arr_next',
          prevEl: '.arr_prev',
        },
      },
      currentPin: null,
      currentItem : null,
      viewerOpt: {
        "inline": false,
        "button": true,
        "navbar": false,
        "title": false,
        "toolbar": false,
        "tooltip": false,
        "movable": true,
        "zoomable": true,
        "rotatable": false,
        "scalable": false,
      },
    }
  },
  props: {
    pinItems: {
      type: Array,
      default: '',
    },
    pinImgUrl :{
      type: String,
      default:'',
    }
  },
  methods: {
    pinActive2: function (e, id){
      e.preventDefault();
      let pinItems = document.querySelectorAll('.pin_frame')
      let thumbItems = document.querySelectorAll('thumb_item')
      let pin = e.currentTarget
      pinItems.forEach((e)=>e.classList.remove('is_active'))
      thumbItems.forEach((a)=>a.classList.remove('is_active'))
      if(id == this.currentPin){
        pin.classList.remove('is_active')
        return this.currentPin = ''
      }
      this.currentPin = id
    },

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
