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
                <h2 class="ttl">내가 꾸민 우리집</h2>
              </div>
              <div class="btn_area">
                <nuxt-link to="./editor">
                  <button class="btn w_m h_m strong c_grd2"><i class="ic ic_write"></i> 글쓰기</button>
                </nuxt-link>
              </div>
            </div>
            <section class="zin_sec best_sec">
              <SlideItemList :withTtlArw="true" :itemData="bestItemData" :itemCol="4"
                             :moveGroup="1" :maxItems="5">
                <template v-slot:title>
                  <h3 class="ttl">Weekly Best</h3>
                </template>
              </SlideItemList>
            </section>
          </div>
          <div class="page_body styling_body">
            <section class="zin_sec filter_sec">
              <StyleFilter :filtersData="filtersData" :hasSearch="false" v-on:filtering="filtering"/>
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
                <StyleList classAdd="myhome_list_wrap" :listItem="listItemData" :item-col="3" :paginationShow="false" :headFlag="true" />
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
import StyleFilter from "~/components/styling/StyleFilter";
import SlideItemList from "~/components/common/SlideItemList";
import Snb from "~/components/common/Snb";
import debounce from 'lodash/debounce';
import API from "@/fetchSheets";
import { mapGetters } from "vuex";

export default {
  layout: "default_interior",
  name: "myhome-list",
  components: {
    SlideItemList,
    StyleList,
    StyleFilter,
    Snb,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "styling_page",
    });
    this.filtersData = this.getCommonFilter();
  },
  data() {
    return {
      total: 0,
      defaultParam: { page: 1, size: 3 },
      paramForGetList: {},
      bestItemData: [
        {
          itemID: 20,
          img: "/img/store/@_thumb_01.png",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
        },
        {
          itemID: 20,
          img: "/img/store/@_thumb_01.png",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
        },
        {
          itemID: 20,
          img: "/img/store/@_thumb_01.png",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
        },
        {
          itemID: 20,
          img: "/img/store/@_thumb_01.png",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
        },
        {
          itemID: 20,
          img: "/img/store/@_thumb_01.png",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
        },
      ],
      // listItemData: [
      //   {
      //     itemID: 12,
      //     badges: ["new", "weekly"],
      //     img: "/img/styling/@_item_thumb_01.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     writer: {
      //       name: '지니지니',
      //       profile: '/img/styling/@_profile_01.png',
      //     },
      //     tags: ['미니멀', '모던', '플랜테리어'],
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
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     writer: {
      //       name: '지니지니',
      //       profile: '/img/styling/@_profile_01.png',
      //     },
      //     tags: ['미니멀', '모던', '플랜테리어'],
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
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     writer: {
      //       name: '지니지니',
      //       profile: '/img/styling/@_profile_01.png',
      //     },
      //     tags: ['미니멀', '모던', '플랜테리어'],
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
      //     writer: {
      //       name: '지니지니',
      //       profile: '/img/styling/@_profile_01.png',
      //     },
      //     tags: ['미니멀', '모던', '플랜테리어'],
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
      //     writer: {
      //       name: '지니지니',
      //       profile: '/img/styling/@_profile_01.png',
      //     },
      //     tags: ['미니멀', '모던', '플랜테리어'],
      //     itemInfo: {
      //       consulting: 30,
      //       scrap: 99,
      //       comment: 999,
      //       view: 1999,
      //     },
      //   }, {
      //     itemID: 7,
      //     badges: null,
      //     img: "/img/styling/@_item_thumb_05.png",
      //     title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
      //     link: "./detail",
      //     writer: {
      //       name: '지니지니',
      //       profile: '/img/styling/@_profile_01.png',
      //     },
      //     tags: ['미니멀', '모던', '플랜테리어'],
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
          value: 1,
        },
        {
          label: "인기순",
          value: 2,
        },
        {
          label: "댓글순",
          value: 3,
        },
        // {
        //   label: "높은 가격순",
        //   value: "max",
        // },
        // {
        //   label: "평점순",
        //   value: "point",
        // },
      ],
      currentSort: "latest",
      hasFilter: false,
      filtersData: [],
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
  computed: {
    ...mapGetters("interior", ["getCommonFilter"]),
  },
  methods: {
    filtering: function(val){
      let dd = {};
      val.forEach(function(o){
        if ( dd[o.name] === undefined ) {
          dd[o.name] = o.label;
        } else {
           dd[o.name] += ',' + o.label;
        }
      })
      this.paramForGetList = dd;
      this.getList({ ...this.defaultParam, ...this.paramForGetList }, true);
    },
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollEvt: debounce(function() {
      // console.log(window.innerHeight + window.scrollY + "aaaaaaaaaaaa")
      // console.log(document.body.offsetHeight + "dddddddddddd")
      if((window.innerHeight + window.scrollY + 300) >= document.body.offsetHeight) {
        this.defaultParam.page++;
        this.getList({ ...this.defaultParam, ...this.paramForGetList }, false );
      }
    }, 100),
    sort: function(val) {
      this.currentSort = val;
      this.getList({ ...this.defaultParam, ...this.paramForGetList }, true);
    },
    async getList(queryData, isClear) {
      //undefined를 받는게 좋을듯
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_MYHOME_LIST.path,
            method: API.INTERIOR_MYHOME_LIST.method,
            query: queryData,
          }
        });
        let newItems = res.data.items || [];
        newItems.forEach(function(item) {
          delete Object.assign(item, {["itemID"]: item["id"] })["id"];
          item.badges = ["new"];
          item.img = "/img/styling/@_item_thumb_01.png";
          item.link = "/styling/myhome/detail/" + item.itemID;
          item.cunsulting = 30;
          delete Object.assign(item, {["title"]: item["subject"] })["subject"];
          delete Object.assign(item, {["writer"]: { ["name"]: item["creUser"] }})["creUser"];
          item.writer.profile = "/img/styling/@_profile_01.png";
          delete Object.assign(item, {["tags"]: item["hashtag"] })["hashtag"];
          Object.assign(item, {["itemInfo"]: {
            ["scrap"]: item["scrapCnt"],
            ["comment"]: item["replyCnt"],
            ["view"]: item["readCnt"]
          }});
          delete item["scrapCnt"];
          delete item["replyCnt"];
          delete item["readCnt"];
        });
        if ( isClear ) {
          this.listItemData = [];
          this.defaultParam.page = 1;
        }
        // console.log("newItems");
        //  console.log(newItems);
        this.listItemData = this.listItemData.concat(newItems);
      } catch (e) {
        console.log(e)
      }
    },
    async getWeeklyBestList() {
      const res = await this.$nuxt.$fetch({
        api: {
          path: API.INTERIOR_MYHOME_WEEKLYBESTLIST.path,
          method: API.INTERIOR_MYHOME_WEEKLYBESTLIST.method,
        }
      });
      let newItems = res.data.items || [];
      newItems.forEach(function(item) {
        delete Object.assign(item, {["itemID"]: item["id"] })["id"];
        item.img = "/img/store/@_thumb_01.png";
        item.link = "/styling/myhome/detail/" + item.itemID;
        delete Object.assign(item, {["title"]: item["subject"] })["subject"];
      });
      this.bestItemData = newItems;
    },
  },
  async mounted() {
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
    // if (this.$refs.list_header.$refs.styling_filter.selChips.length > 0) this.hasFilter = true;
    window.addEventListener("scroll", this.scrollEvt);
    this.getList();
    this.getWeeklyBestList();
  },
  async updated() {
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvt);
  },
};
</script>
