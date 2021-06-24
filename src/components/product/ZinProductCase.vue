<template>
  <div class="modal_wrap has_overlay" :class="{'is_show': showModal}">
    <div class="modal product">
      <div class="modal_head">
        <div class="ttl_area bar_ttl">
          <h3 class="ttl">시공사례<small>시공사례</small></h3>
        </div>
      </div>
      <div class="modal_body">
        <CaseList :listItem="listItemData" :paginationShow="true" :itemCol="3" />
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import CaseList from "~/components/product/CaseList";

export default {
  name: "Zinproduct",
  components: {
    CaseList,
  },
  data() {
    return {
      activeIndex: 0,
      listItemData: [
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_01.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_02.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_03.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_03.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_01.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_02.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_03.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_03.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_01.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_02.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_03.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
        {
          itemID: 12,
          img: "/img/styling/@_item_thumb_03.png",
          title: "Mosaic / 화이트",
          code: 'IAQ008-01',
          content: '탁 트인 거실이 한눈에 들어오는 4인 가족의 25평 주방 인테리어',
          link: "id",
        },
      ],
      myScrapData: [1],
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$nuxt.$emit("htmlOverShow");
    },
  },
};
</script>

<style scoped>

</style>