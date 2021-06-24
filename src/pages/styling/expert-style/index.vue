<template>
  <v-app id="container">
    <main id="contents" class="styling_page list_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <Snb currentCate="시공사례" :currentMenu="currentMenu" :menuData="snb" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head styling_head">
            <div class="ttl_group has_elem">
              <div class="ttl_area">
                <h2 class="ttl">전문가 시공제안</h2>
              </div>
              <div class="btn_area">
                <nuxt-link to="/zin/counsulting">
                  <button class="btn w_m h_m strong c_grd2">상담신청</button>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="page_body styling_body">
            <section class="zin_sec filter_sec">
              <ListFilter :filtersData="filtersData" :hasSearch="false" />
            </section>
            <section class="zin_sec styling_list_sec">
              <div v-if="listItemData !== null" class="list_sec_head has_elem">
                <div class="count_area">
                  전체 <strong class="c_point3">{{ total }}</strong>개 <!-- dev class 수정 0531 -->
                </div>
                <div class="list_setting_group">
                  <div class="sort_area">
                    <div v-for="(sortItem, i) in sortOpt" :key="'sort'+ i" class="sort_node"
                         :class="sortItem.value === currentSort ? 'is_active':''">
                      <button @click="sort(sortItem.value)">{{ sortItem.label }}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list_sec_body">
                <StyleList classAdd="expert_list_wrap" :listItem="listItemData" :headFlag="true"
                           :item-col="3" :paginationShow="false" />
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import StyleList from "~/components/styling/StyleList";
import ListFilter from "~/components/common/ListFilter";
import SlideItemList from "~/components/common/SlideItemList";
import Snb from "~/components/common/Snb";
import API from "~/fetchSheets";
import debounce from "lodash/debounce";

export default {
  layout: "default_interior",
  name: "expert-list",
  components: {
    SlideItemList,
    StyleList,
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
      // listItemData: [
      //   {
      //     itemID: 12,
      //     seq: 1,
      //     badges: ["new", "trend"],
      //     img: "/img/styling/@_item_thumb_01.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     place: "지인 인테리어",
      //     tags: ["미니멀", "모던", "플랜테리어"],
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 100,
      //       comment: 20,
      //       view: 1000,
      //     },
      //
      //   }, {
      //     itemID: 111,
      //     badges: null,
      //     img: "/img/styling/@_item_thumb_06.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어 작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     place: "지인 인테리어지인 인테리어지인 인테리어지인 인테리어지인 인테리어",
      //     tags: ["미니멀", "모던", "플랜테리어"],
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 130,
      //       comment: 24,
      //       view: 1020,
      //     },
      //   }, {
      //     itemID: 3,
      //     badges: ["new"],
      //     img: "/img/styling/@_item_thumb_02.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어 작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     place: "지인 인테리어",
      //     tags: ["미니멀", "모던", "플랜테리어"],
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 130,
      //       comment: 24,
      //       view: 1020,
      //     },
      //   }, {
      //     itemID: 4,
      //     badges: ["new"],
      //     img: "/img/styling/@_item_thumb_03.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     place: "지인 인테리어",
      //     tags: ["미니멀", "모던", "플랜테리어"],
      //     link: "./detail",
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 130,
      //       comment: 24,
      //       view: 1020,
      //     },
      //   }, {
      //     itemID: 5,
      //     badges: null,
      //     img: "/img/styling/@_item_thumb_04.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     place: "지인 인테리어",
      //     tags: ["미니멀", "모던", "플랜테리어"],
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 999,
      //       comment: 9990,
      //       view: 9299,
      //     },
      //   }, {
      //     itemID: 7,
      //     badges: null,
      //     img: "/img/styling/@_item_thumb_05.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     place: "지인 인테리어",
      //     tags: ["미니멀", "모던", "플랜테리어"],
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 130,
      //       comment: 24,
      //       view: 1020,
      //     },
      //   },
      // ],
      listItemData: [],
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
          label: "상담순",
          value: "consulting",
        },
        {
          label: "댓글순",
          value: "comment",
        },
      ],
      currentSort: "latest",
      hasFilter: false,
      filtersData: [
        {
          type: "radio",
          title: "주거형태",
          name: "type",
          opts: [
            {
              label: "원룸/오피스텔",
              value: "1room",
            },
            {
              label: "아파트",
              value: "apt",
            },
            {
              label: "빌라/연립",
              value: "villa",
            },
            {
              label: "단독주택",
              value: "house",
            },
            {
              label: "사무공간",
              value: "office",
            },
            {
              label: "상업공간",
              value: "store",
            },
            {
              label: "기타",
              value: "etc",
            },
          ],
        },
        {
          type: "checkbox",
          title: "시공공간",
          name: "area",
          opts: [
            {
              label: "홈인테리어",
              value: "home-interior",
            },
            {
              label: "거실",
              value: "living",
            },
            {
              label: "침실",
              value: "bed",
            },
            {
              label: "서재",
              value: "book",
            },
            {
              label: "자녀방",
              value: "kid",
            },
            {
              label: "드레스룸",
              value: "dress",
            },
            {
              label: "주방",
              value: "kitchen",
            },
            {
              label: "욕실",
              value: "bath",
            },
            {
              label: "원룸",
              value: "room",
            },
            {
              label: "기타",
              value: "etc",
            },
          ],
        },
        {
          type: "checkbox",
          title: "평형",
          name: "size",
          opts: [
            {
              label: "20평형 이하",
              value: "20under",
            },
            {
              label: "20평형",
              value: "20",
            },
            {
              label: "30평형",
              value: "30",
            },
            {
              label: "40평형",
              value: "40",
            },
            {
              label: "50평형 이상",
              value: "50over",
            },
          ],
        },
        {
          type: "checkbox",
          title: "예산",
          name: "price",
          opts: [
            {
              label: "~100만원 이하",
              value: "10000000",
            },
            {
              label: "~300만원 이하",
              value: "3000000",
            },
            {
              label: "~500만원 이하",
              value: "5000000",
            },
            {
              label: "~1천만원 이하",
              value: "10000000",
            },
            {
              label: "~2천만원 이하",
              value: "20000000",
            },
            {
              label: "~3천만원 이하",
              value: "30000000",
            },
            {
              label: "~3천만원 이상",
              value: "30000000over",
            },
          ],
        },
        {
          type: "checkbox",
          title: "가족형태",
          name: "with",
          opts: [
            {
              label: "싱글",
              value: "single",
            },
            {
              label: "신혼부부",
              value: "couple",
            },
            {
              label: "아이와",
              value: "kids",
            },
            {
              label: "부모님과",
              value: "parents",
            },
            {
              label: "동료와",
              value: "partners",
            },
            {
              label: "반려동물과",
              value: "pets",
            },
            {
              label: "기타",
              value: "etc",
            },
          ],
        },
        {
          type: "checkbox",
          title: "스타일",
          name: "style",
          opts: [
            {
              label: "모던",
              value: "modern",
            },
            {
              label: "클래식",
              value: "classic",
            },
            {
              label: "내추럴",
              value: "natural",
            },
          ],
        },
        {
          type: "checkbox",
          title: "색상",
          name: "color",
          opts: [
            {
              label: "흰색",
              value: "white",
            },
            {
              label: "블랙",
              value: "212121",
            },
            {
              label: "그레이",
              value: "DDDDDD",
            },
            {
              label: "레드",
              value: "D81D1D",
            },
            {
              label: "오렌지",
              value: "E39444",
            },
            {
              label: "옐로우",
              value: "FAEF63",
            },
            {
              label: "그린",
              value: "47862F",
            },
            {
              label: "스카이블루",
              value: "A8CBF5",
            },
            {
              label: "블루",
              value: "185DAD",
            },
            {
              label: "퍼플",
              value: "482A9B",
            },
            {
              label: "핑크",
              value: "E5589E",
            },
            {
              label: "버건디",
              value: "840808",
            },
            {
              label: "브라운",
              value: "713B14",
            },
            {
              label: "카키",
              value: "647141",
            },
            {
              label: "베이지",
              value: "E2DBCA",
            },
            {
              label: "골드",
              value: "gold",
            },
            {
              label: "실버",
              value: "silver",
            },
          ],
        },
        {
          type: "radio",
          title: "시공범위",
          name: "range",
          opts: [
            {
              label: "리모델링",
              value: "remodeling",
            },
            {
              label: "부분 리모델링",
              value: "partial-remodeling",
            },
            {
              label: "홈스타일링",
              value: "home-styling",
            },
            {
              label: "건축",
              value: "construct",
            },
          ],
        },
      ],
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
          name: "시공사례",
          link: "/styling/expert-style/",
          dep2: [
            {
              name: "전문가 시공제안",
              link: "/styling/expert-style/",
            },
            {
              name: "내가 꾸민 우리집",
              link: "/styling/myhome/",
            },
            {
              name: "집들이그램",
              link: "/styling/house/",
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
    scrollEvt: debounce(function() {
      // console.log(window.innerHeight + window.scrollY + "aaaaaaaaaaaa")
      // console.log(document.body.offsetHeight + "dddddddddddd")
      if((window.innerHeight + window.scrollY + 300) >= document.body.offsetHeight) {
        this.getList();
      }
    }, 100),
    sort: function(val) {
      this.currentSort = val;
    },
    async getList(queryData = { page: 1, size: 3 }) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_EXPERT_LIST.path,
            method: API.INTERIOR_EXPERT_LIST.method,
            query: queryData,
          }
        });
        let newItems = res.data.items || [];
        // console.log(newItems);

        newItems.forEach(function(item) {
          Object.assign(item, {["itemID"]: item["seq"] });
          item.badges = ["new"];
          item.img = "/img/styling/@_item_thumb_05.png";
          item.link = "/styling/expert-style/detail/" + item.itemID;
          delete Object.assign(item, {["title"]: item["subject"] })["subject"];
          delete Object.assign(item, {["tags"]: item["hashtag"] })["hashtag"];
          Object.assign(item, {["itemInfo"]: {
              ["consulting"]: 30,
              ["scrap"]: item["scrapCnt"],
              ["comment"]: item["replyCnt"],
              ["view"]: item["readCnt"]
            }});
          delete item["scrapCnt"];
          delete item["replyCnt"];
          delete item["readCnt"];
        });
        this.listItemData = this.listItemData.concat(newItems);
      } catch (e) {
        console.log(e)
      }
    },
  },
  async mounted() {
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
    // if (this.$refs.list_header.$refs.styling_filter.selChips.length > 0) this.hasFilter = true;
    window.addEventListener("scroll", this.scrollEvt);
    this.getList();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvt);
  },
};
</script>

<style scoped>
.page_head + .page_body {
  padding-top: 0;
}
</style>