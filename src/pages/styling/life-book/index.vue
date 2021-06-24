<template>
  <v-app id="container">
    <main id="contents" class="styling_page list_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <Snb currentCate="노하우" :currentMenu="currentMenu" :menuData="snb" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head styling_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">생활단편집</h2>
              </div>
            </div>
          </div>
          <div class="page_body styling_body">
            <section class="zin_sec styling_list_sec book_list_sec">
              <div class="list_sec_body">
                <BookList classAdd="style_list_wrap" :listItem="filterItems" :item-col="3" />
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import ListFilter from "~/components/common/ListFilter";
import SlideItemList from "~/components/common/SlideItemList";
import BookList from "~/components/styling/BookList";
import Snb from "~/components/common/Snb";
import cloneDeep from "lodash";

export default {
  layout: "default_interior",
  name: "book-list",
  components: {
    SlideItemList,
    BookList,
    ListFilter,
    Snb,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "styling_page",
    });
  },
  data() {
    return {
      total: 0,
      listCate: [
        "All", "Lifestyle", "Interior", "Place", "Tech", "ECT",
      ],
      currentCate: "All",
      filterItems: Array,
      listItemData: [
        {
          itemID: 12,
          category: "Lifestyle",
          img: "/img/styling/@_book_thumb_01.png",
          title: "일상을 빛내는 기분 좋은 부스터",
          content: "경쾌하고 위트있는 인테리어와 함께하는 집콕 생활",
          link: "./detail",

        }, {
          itemID: 111,
          category: "Interior",
          img: "/img/styling/@_book_thumb_06.png",
          title: "아크릴 물감으로 구름 그림 그리기",
          content: "그림과 차가 있는 드로잉 카페",
          link: "./detail",
        }, {
          itemID: 3,
          category: "Place",
          img: "/img/styling/@_book_thumb_09.png",
          title: "집꾸미기 덕후를 위한 지인 인테리어 전시장 랜선",
          content: "내 취향에 맞는 인테리어 발견하기",
          link: "./detail",
        }, {
          itemID: 4,
          category: "Interior",
          img: "/img/styling/@_book_thumb_03.png",
          title: "일상을 빛내는 기분 좋은 부스터",
          content: "경쾌하고 위트있는 인테리어와 함께하는 집콕 생활",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          link: "./detail",
        }, {
          itemID: 5,
          category: "Tech",
          img: "/img/styling/@_book_thumb_07.png",
          title: "집에서 휴식과 재충전을 즐기는 홈바디",
          content: "그림과 차가 있는 드로잉 카페",
          link: "./detail",
        }, {
          itemID: 7,
          category: "ECT",
          img: "/img/styling/@_book_thumb_02.png",
          title: "Z세대의 성향을 반영한 오프라인 공간",
          content: "시크한 도회적 분위기와 임팩트 있는 컬러",
          link: "./detail",
        },
      ],
      myScrapData: [1],
      sortOpt: [
        {
          label: "최신순",
          value: "latest",
        },
        {
          label: "인기순",
          value: "fame",
        },
        {
          label: "댓글순",
          value: "comment",
        },
      ],
      currentSort: "latest",
      hasFilter: false,
      currentMenu: {
        name: {
          dep1: "",
          dep2: "",
          dep3: "",
          dep4: "",
        },
        state: {
          dep1: false,
          dep2: false,
          dep3: false,
          dep4: false,
        },
      },
      snb: [
        {
          name: "노하우",
          link: "/styling/style-trend/",
          dep2: [
            {
              name: "스타일링 트렌드",
              link: "/styling/style-trend/",
            },
            {
              name: "인테리어 A to Z",
              link: "/styling/style-guide/",
            },
            {
              name: "생활단편집",
              link: "/styling/life-book/",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    sort: function(val) {
      this.currentSort = val;
    },
    countCate(cate) {
      if (cate === "All") return this.listItemData.length;
      let copyItems = _.cloneDeep(this.listItemData);
      return copyItems.filter(v => v.category === cate).length;
    },
    filterCate(cate) {
      this.currentCate = cate;
      if (cate === "All") return this.filterItems = this.listItemData;
      let copyItems = _.cloneDeep(this.listItemData);
      this.filterItems = copyItems.filter(v => v.category === cate);
    },
  },
  async mounted() {
    await this.$nextTick();
    this.filterItems = this.listItemData;
    if (this.listItemData !== null) this.total = this.listItemData.length;
    // if (this.$refs.list_header.$refs.styling_filter.selChips.length > 0) this.hasFilter = true;
  },
  beforeDestroy() {
  },
};
</script>

<style scoped>

</style>