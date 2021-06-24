<template>
  <v-app id="container">
    <main id="contents" class="zin_page list_page zenne_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <ProductSnb
            currentCate="브랜드 이야기"
            :currentMenu="currentMenu"
            :menuData="snb"
            :BannerShow="false"
          />
        </aside>
        <article class="divider_cnt">
          <div class="page_head zin_head">
            <div class="ttl_group has_elem">
              <div class="ttl_area">
                <h2 class="ttl">지엔느 활동</h2>
              </div>
            </div>
          </div>
          <div class="page_body zin_body">
            <section class="zin_sec zin_list_sec">
              <div v-if="listItemData !== null" class="list_sec_head has_elem">
                <div class="count_area">
                  전체 <strong class="c_point3">{{ totalCnt }}</strong
                  >개
                  <!-- dev class 수정 0531 -->
                </div>
              </div>
              <div class="list_sec_body">
                <ZinList
                  classAdd="zin_list_wrap"
                  :listItem="listItemData"
                  :currentNo="currentNo"
                  :item-col="4"
                  :hasScrap="false"
                  :paginationShow="false"
                />
              </div>
              <div class="list_sec_foot">
                <Pagination
                  v-if="
                    listItemData !== null &&
                    listItemData.length > 0 &&
                    maxItems === null
                  "
                  :pageSize="8"
                  :totalCount="totalCnt"
                  :currentNo="parseFloat(currentNo)"
                  @changePage="callApi"
                />
                <div class="list_search_wrap">
                  <ListSearchInput @submit="searchSubmit" type="box" />
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import ZinList from "~/components/product/ZinList";
import ProductSnb from "~/components/zinBrand/brandSnb";
import ListSearchInput from "~/components/common/ListSearchInput";
import Pagination from "~/components/common/Pagination";
import snb from "~/assets/data/brandSnb.json";
import moment from "moment";
export default {
  layout: "default",
  name: "expert-list",
  components: {
    ZinList,
    ProductSnb,
    ListSearchInput,
    Pagination,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page zenne_page",
    });
  },
  fetch() {
    if(this.$nuxt.$route.query.page){
      this.currentNo = this.$nuxt.$route.query.page;
    }
  },
  data() {
    return {
      searchValue: "",
      searchYear: "",
      paginationSize: "",
      totalCnt: "",
      currentNo: 1,
      total: 0,
      maxItems: null,
      listItemData: [],
      resultItemData: [],
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
      snb: snb,
    };
  },
  methods: {
    searchSubmit(v) {
      this.searchValue = v;
      this.currentNo = 1;
      this.searchYear = 2021;
      this.zenneActive();
      this.errorMassege = "검색결과가 없습니다.";
      console.log(v);
    },

    async zenneActive() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/zinrSvcApi/svcList",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            searchValue: this.searchValue,
            searchYear: this.searchYear,
            page: this.currentNo,
            size: 8,
          },
        });
        const listdata = this.$get(res, "data.items", []);
        const totalCnt = this.$get(res, "data.totalCount");
        this.totalCnt = totalCnt;
        this.listItemData.splice(0);
        for (var item in listdata) {
          var data = {
            itemID: listdata[item].boardSeq,
            badges: null,
            img: listdata[item].pcImage,
            title: listdata[item].title,
            link: `./` + listdata[item].boardSeq,
            writingDate: moment(listdata[item].registDate.substr(0, 8)).format(
              "YYYY.MM.DD"
            ),
          };
          this.listItemData.push(data);
        }
        this.resultItemData = listdata;
        const page = Math.ceil(totalCnt / 8);
        this.paginationSize = page;
      } catch (e) {
        console.log(e);
      }
    },
    callApi(currentPage) {
      this.currentNo = currentPage;
      this.zenneActive();
    },
  },
  async mounted() {
    this.zenneActive();
    await this.$nextTick();
    if (this.listItemData !== null) this.total = this.listItemData.length;
    // if (this.$refs.list_header.$refs.styling_filter.selChips.length > 0) this.hasFilter = true;
    window.addEventListener("scroll", this.scrollEvt);
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