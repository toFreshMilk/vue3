<template>
  <div class="list_item pattern_list_item" v-if="item">
    <div class="list_item_head">
      <!-- 이미지 -->
      <nuxt-link :to="`/product/detail/${item.prdId}`" class="thumb_area">
        <figure class="thumb" :style="bgImageUrl(item.imagePath, item.imageLargeName)"></figure>
      </nuxt-link>
      <!-- 이미지 위 스크랩버튼 -->
      <div class="scrap_area">
        <button @click="toggleScrap(item)" :class="item.scrapYn && item.scrapYn === 'Y' ? 'is_active' : ''" class="btn scrap_btn ic_before"></button>
      </div>
    </div>
    <!-- 제품명/제품코드 -->
    <nuxt-link :to="`/product/detail/${item.prdId}`" class="list_item_body">
      <div class="ttl_area">
        <h6 class="ttl">{{ item.prdName }}</h6>
        <p class="code">{{ item.prdNo }}</p>
      </div>
      <!-- 뱃지 버튼 -->
      <div class="item_info_group">
        <div class="badge_ls">
          <img v-if="item.newProdYn === 'Y'" src="/img/common/flag_new.png" class="badge" />
          <img v-if="item.bestYn === 'Y'" src="/img/common/flag_best.png" class="badge" />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  data() {
    return {

    };
  },
  props: {
    item: {
      //제품 데이터
      type: Object,
    },
  },
  methods: {
    toggleScrap: function(item) {
      console.log("scrap 넣고 빼는걸 구현해야 함. ");
      item.scrapYn = !(item.scrapYn && item.scrapYn === "Y");
      alert(item.prdName + "스크랩!");
      //scrap 이 true이면 스크랩 추가하는 api 호출, false이면 삭제하는 api 호출
      //원래 scrapYN을 가지고 있고, 따로 변경한걸 가지고 있어야.. 정말 뺄지 말지를 결정할 수 있을 듯.
    },
    bgImageUrl(path, name) {
      if (path && name) {
        return "background-image: url('" + path + "/" + name + "')";
      }
      return "";
    }
  }
};
</script>
