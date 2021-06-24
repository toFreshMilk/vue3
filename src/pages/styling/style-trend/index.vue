<template>
  <v-app id="container">
    <main id="contents" class="styling_page list_page trend_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <Snb currentCate="노하우" :currentMenu="currentMenu" :menuData="snb" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head styling_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">스타일링 트렌트</h2>
              </div>
            </div>
          </div>
          <div class="page_body styling_body">
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
                <StyleList classAdd="style_list_wrap" :listItem="listItemData" :item-col="4" :listfootShow="false"
                           listType="trend" :showMoreBtn="true" :paginationShow="false" />
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import StyleList from "~/components/styling/StyleList";
import ListFilter from "~/components/common/ListFilter";
import SlideItemList from "~/components/common/SlideItemList";
import Snb from "~/components/common/Snb";


// import sortBy from 'lodash/sortBy'
// import slice from 'lodash/slice'
// import pull from 'lodash/pull'
// import remove from 'lodash/remove'
import { mapState, mapActions, mapGetters } from "vuex";
import _ from 'lodash'

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
      listItemData: [
        {
          itemID: 12,
          badges: ["new", "trend"],
          img: "/img/styling/@_item_thumb_01.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 100,
            comment: 20,
            view: 1000,
          },

        }, {
          itemID: 111,
          badges: null,
          img: "/img/styling/@_item_thumb_06.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어 작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 3,
          badges: ["new"],
          img: "/img/styling/@_item_thumb_02.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 4,
          badges: ["new"],
          img: "/img/styling/@_item_thumb_03.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          link: "./detail",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 5,
          badges: null,
          img: "/img/styling/@_item_thumb_04.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: "999+",
            comment: "999+",
            view: "999+",
          },
        }, {
          itemID: 7,
          badges: null,
          img: "/img/styling/@_item_thumb_05.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        },
      ],
      // listItemDataTotal: [],
      myScrapData: [1],
      sortOpt: [
        {
          label: "최신순",
          value: "latest",
        },
        {
          label: "인기순",
          value: "itemInfo[view]",
        },
        {
          label: "댓글순",
          value: "itemInfo[comment]",
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
  computed: {
    ...mapGetters("interior", ["getIRData"]),
  },
  methods: {
    ...mapActions({
      setData: "interior/SET_DATA",
    }),
    listMoreView : () => {

    },
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    sort: function(val) {
      this.currentSort = val;
      // this.listItemData = sortBy(this.listItemData, val);
      // console.log(this.getIRData())

      // let total = [
      //   "a", "a", "a",
      //   "b", "b", "b",
      //   "c", "c", "c",
      // ];
      // let showData = [];
      // let range = 3;
      // let slicedData = _.slice(total, 0, range)
      // while( range > 0 && total.shift() ) { range--; }
      // showData.concat(slicedData)


      //1. css 처리 아마 이게 좋을듯..
      //2. 데이터 처리
    },

  },
  async getData() {

    // let getUrl = API.SESSION.path;

    // //set data
    // this.listItemDataTotal = [];
    //// this.listItemData = await this.$get("")

  },
  async mounted() {
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
    // if (this.$refs.list_header.$refs.styling_filter.selChips.length > 0) this.hasFilter = true;
    window.addEventListener("scroll", this.scrollEvt);

    this.setData("bb")
    // 퍼블넘어오면서 삭제됨
    // await this.getData();

  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvt);
  },
};
</script>

<style scoped>

</style>