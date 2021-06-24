<template>
  <div class="pin_img_group detail_cnt">
    <div id="imageViewer" class="img_area" v-viewer="viewerOpt" ice-prop-slot="pins">
      <img :src="resizedImg(image)" alt="pin image" v-if="image" @click="showViewer('imageViewer')" />
      <div class="pin_group">
<!--        :class="sItem.id === currentPin && currentPinToggle ? 'is_active' : ''"-->

        <button
          v-for="(sItem, idx) in pinItems"
          :key="idx"
          @click="setActivePin(sItem.id)"
          class="pin_item"
          :class="sItem.id === currentPin ? 'is_active' : ''"
          :style="getPinStyle(sItem)"
          :ice-instance-id="sItem.id"
          ice-instance-type="imagePinProp"
          ice-component="lg-image-pin"
          data-display-name="이미지 마크업"
          :title="sItem.productName"
        >
          <i class="ic_plus"></i>
        </button>
      </div>
    </div>
    <div class="scroll_list_area" v-if="pinItems && pinItems.length">
      <div class="has_scroll_x">
        <div class="scroll_list">
<!--          :class="{ is_active: sItem.id === currentPin }"-->
          <a
            v-for="(sItem, idx) in pinItems"
            :key="idx"
            :target="sItem.linkTarget.value"
            class="scroll_item"
            :data-id="sItem.id"
            :class="sItem.id === currentPin && currentPinToggle ? 'is_active' : ''"
            :style="`width: ${scrollItemWidth}px`"
            @click="handleClickLink(sItem.linkUrl)"
          >
            <figure
              class="thumb"
              :style="`background-image: url('${sItem.thumbnail}')`"
            ></figure>
            <div class="name_group">
              <strong class="type">{{ sItem.productType }}</strong>
              <span class="name">{{ sItem.productName }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import startsWith from "lodash/startsWith";
export default {
  name: "ImagePin",
  data() {
    return {
      scrollItemWidth: 72,
      currentPin: "",
      currentPinToggle: false,
      viewerOpt: {
        inline: false,
        button: true,
        navbar: false,
        title: false,
        toolbar: false,
        tooltip: false,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
      },
    };
  },
  props: {
    image: { type: String },
    pinItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hideCallback(e) {
      console.log('hide');
      e.target.removeEventListener('hide', this.hideCallback);
      this.$mobile.cancelCustomBackButton();
    },
    showViewer(id) {
      console.log('showViewer id', id);
      // console.log('$viewer', viewer.$viewer);
      // viewer.$viewer.show();

      const el = this.$el.querySelector(`#${id}`);
      const viewer = el.$viewer;
      // viewer.show();

      el.addEventListener('hide', this.hideCallback);

      this.$nextTick(() => {
        this.$mobile.setCustomBackButton(() => {
          viewer.hide();
        });
      })
    },
    resizedImg(url) {
      if (!url || !startsWith(url, "https")) {
        return url;
      }
      const fileFormat = url.substring(url.lastIndexOf(".") + 1, url.length);
      if (fileFormat.toLowerCase() === "gif") return url;
      const lastSlash = url.lastIndexOf("/");
      const path = url.slice(lastSlash - url.length);
      const first = url.slice(0, lastSlash);
      return `${first}/720/0${path}`;
    },
    handleClickLink(url) {
      this.$mobile.showPopup(url, null, {
        isShowTitleBar: true,
        title: '',
      });
    },
    getPinStyle: function (pinItem) {
      return {
        top: pinItem.top ? pinItem.top : "50%",
        left: pinItem.left ? pinItem.left : "50%",
      };
    },
    pinActive: function (e, id) {
      e.preventDefault();
      const that = e.currentTarget;
      const pins = that.parentElement.children;
      pins.forEach((v) => {
        if (that !== v) v.classList.remove("is_active");
      });
      that.classList.toggle("is_active");
      const mother = that.closest(".pin_img_group");
      const scrollElem = mother.querySelector(".has_scroll_x");
      const Siblings = mother.querySelectorAll(".scroll_list .scroll_item");
      const target = mother.querySelector(
        `.scroll_list .scroll_item[data-id="${id}"]`
      );
      Siblings.forEach((v1) => {
        v1.classList.remove("is_active");
      });
      target.classList.add("is_active");
      scrollElem.scrollLeft = target.offsetLeft - 20;
      this.currentItem = id;
    },

    setActivePin(id) {
      if ( id !== this.currentPin ) {
        this.currentPinToggle = false;
      }
      this.currentPinToggle = !this.currentPinToggle;
      this.currentPin = id;
    },
  },
  mounted() {
    this.scrollItemWidth = (window.innerWidth - 40) / 4 - 10;
  },
};
</script>

<style scoped>
</style>
