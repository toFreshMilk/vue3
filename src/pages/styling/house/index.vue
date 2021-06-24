<template>
  <v-app id="container">
    <main id="contents" class="styling_page list_page has_snb noP">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <Snb currentCate="시공사례" :currentMenu="currentMenu" :menuData="snb" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head styling_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">집들이그램</h2>
              </div>
            </div>
          </div>
          <div class="page_body styling_body">
            <section class="zin_sec filter_sec">
              <style-filter :filtersData="filtersData" :hasSearch="false" v-on:filtering="filtering"/>
            </section>
            <section class="zin_sec styling_list_sec">
              <div v-if="listItemData !== null" class="list_sec_head has_elem">
                <div class="count_area">
                  전체 <strong class="c_point3">{{ total }}</strong>개
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
                <StyleList classAdd="style_list_wrap" :listItem="listItemData" :item-col="4" listType="card" :paginationShow="false" :headFlag="true" :noneScrap="false" />
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
import StyleFilter from '~/components/styling/StyleFilter'
import SlideItemList from "~/components/common/SlideItemList";
import Snb from "~/components/common/Snb";
import debounce from 'lodash/debounce';
import API from '@/fetchSheets';
import { mapGetters } from "vuex";

export default {
  layout: "default_interior",
  name: "house-list",
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
  computed: {
    ...mapGetters("interior", ["getCommonFilter"]),
  },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 4,
      listItemData: [],
      myScrapData: [1],
      sortOpt: [
        {
          label: "최신순",
          value: 1,
        },
        {
          label: "인기순(조정순)",
          value: 2,
        },
        {
          label: "댓글순",
          value: 3,
        },
        {
          label: "상담순",
          value: 4,
        },
      ],
      currentSort: 1,
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
      filters: [],
    };
  },
  async fetch() {
    await this.getHomcommingData();
    //await this.getFilter('hometype'); //주거형태
    //await this.getFilter('space'); //시공공간
    //await this.getFilter('homeSize'); //평형
    //await this.getFilter('budget'); //예산
    //await this.getFilter('familyType'); //가족형태
    //await this.getFilter('style'); //스타일
    //await this.getFilter('color'); //색상
    //await this.getFilter('range'); //시공범위
  },
  methods: {
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollEvt: debounce(function() {
      if((window.innerHeight + window.scrollY + 300) >= document.body.offsetHeight) {
        this.getHomcommingData();
      }
    }, 100),
    sort: function(val) {
      this.currentSort = val;
      this.getHomcommingData("Y");
    },
    getHomcommingData: async function(isSort) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_HOMECOMMING_LIST.path,
            method: API.INTERIOR_HOMECOMMING_LIST.method,
            query: {
              page: this.pageNo,
              size: this.pageSize,
              sort: this.currentSort,
              homeType: this.getCheckedFilter('homeType'),
              homeSize: this.getCheckedFilter('homeSize'),
              style: this.getCheckedFilter('style'),
              color: this.getCheckedFilter('color'),
            }
          }
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        let newItems = this.$get(res, "data.items", []);
        newItems.forEach(function(item) {
          delete Object.assign(item, {["itemID"]: item["id"] })["id"];
          item.badges = ["new", "free"];
          item.img = "/img/styling/@_item_thumb_01.png";
          item.link = "/styling/house/detail/" + item.itemID;
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

        if (isSort == 'Y'){
          this.listItemData = [];
        }
        this.listItemData = this.listItemData.concat(newItems);

      } catch(e) {
        console.log(e);
      }
    },
    async getFilter(cate) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.COMMON_CODE.path,
            method: API.COMMON_CODE.method,
            query: {
              codeGroup : cate,
            }
          }
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        };

        let filterData = this.$get(res, "data.items", []);
        let filterDetail = []
        filterData.forEach (item => {
          var opts = new Object();
          opts.label = item.label;
          opts.value = item.code;
          opts.group = cate;
          filterDetail.push(opts);

          this.filtersData.forEach(el => {
            if (el.name === item.codeGroup.value){
              el.opts = filterDetail;
            }
          })
        });
        
      } catch(e) {
        console.log(e);
      }
    },
    async filtering(val) {
      this.filters = val;
      await this.getHomcommingData('Y');
    },
    getCheckedFilter(group) {
      return this.filters.filter((f) => f.name === group).map((f) => f.value).join(',').toString();
      // console.log(param);
    },
  },
  async mounted() {
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
    window.addEventListener("scroll", this.scrollEvt);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvt);
  },
  async updated() {
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
  }
};
</script>

<style scoped>

</style>