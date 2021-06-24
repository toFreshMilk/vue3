<template>
  <v-app id="container">
    <main id="contents" class="zin_page news_page has_snb">
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
          <div class="page_head news_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">뉴스레터</h2>
              </div>
            </div>
          </div>
          <div class="page_body news_body">
            <section class="zin_sec news_list_sec">
              <div
                v-if="newsListItems !== null && newsListItems.length > 0"
                class="list_sec_head has_elem"
              >
                <div v-if="maxItems === null || maxItems > i">
                  <div class="count_area flL">
                    전체
                    <strong class="c_point3">{{ this.totalCnt }}</strong
                    >개
                    <!-- dev class 수정 0531 -->
                  </div>
                </div>
              </div>
              <div class="list_sec_body">
                <div class="news_list_wrap">
                  <div class="tbl_list">
                    <table>
                      <caption></caption>
                      <colgroup>
                        <col />
                        <col width="190" />
                      </colgroup>
                      <thead>
                        <tr class="news_list_ttl">
                          <th>제목</th>
                          <th>등록일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in newsListItems" :key="index">
                          <td class="ttl">
                            <a
                              @click="detail(item.boardSeq)"
                              v-if="item.title.length > 30"
                              >{{ item.title.substr(0, 30) + "..." }}</a
                            >
                            <a @click="detail(item.boardSeq)" v-else>{{
                              item.title
                            }}</a>
                          </td>
                          <td class="date">
                            {{
                              $moment(item.registDate.substr(0, 8)).format(
                                "YYYY.MM.DD"
                              )
                            }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="newsListItems.length < 1">
                        <tr>
                          <td style="text-align: center">
                            {{ errorMassege }}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="list_sec_foot">
                <Pagination
                  v-if="
                    newsListItems !== null &&
                    newsListItems.length > 0 &&
                    maxItems === null
                  "
                  :pageSize="10"
                  :currentNo="parseFloat(currentNo)"
                  :totalCount="totalCnt"
                  @changePage="callApi"
                />
                <div class="list_search_wrap">
                  <ListSearchInput
                    :maxlength="parseFloat(30)"
                    @submit="searchSubmit"
                    type="box"
                  />
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
import ProductSnb from "~/components/zinBrand/brandSnb";
import ListSearchInput from "~/components/common/ListSearchInput";
import Pagination from "~/components/common/Pagination";
import moment from "moment";
import snb from "~/assets/data/brandSnb.json";
export default {
  layout: "default",
  name: "index",
  components: {
    ProductSnb,
    Pagination,
    ListSearchInput,
  },
  asyncData({ route, error }) {
    if (route.query.page != null) {
      console.log("route.query.currentNo" + route.query.page);
      return { currentNo: route.query.page };
    }
  },
  fetch() {
    if (this.$nuxt.$route.query.page) {
      this.currentNo = this.$nuxt.$route.query.page;
    }
  },
  mounted() {
    this.newsletter();
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  data() {
    return {
      maxItems: null,
      totalCnt: "",
      currentNo: 1,
      snb: snb,
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
      newsListItems: [],
      searchValue: "",
      searchYear: "",
      paginationSize: "",
      errorMassege: "",
    };
  },
  methods: {
    detail(v) {
      this.$router.push({
        path: "/zin/brand/news/detail/" + v,
        query: { page: this.currentNo },
      });
    },
    async newsletter() {
      try {
        this.errorMassege = "등록된 게시물이 없습니다.";
        console.log(this.currentNo);
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/newsletterSvcApi/svcList",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            searchValue: this.searchValue,
            searchYear: this.searchYear,
            page: this.currentNo,
            size: 10,
          },
        });
        console.log("뉴스 레터");
        const listdata = this.$get(res, "data.items", []);
        console.log(listdata);
        const totalCnt = this.$get(res, "data.totalCount");
        this.totalCnt = totalCnt;
        this.newsListItems = listdata;
        const page = Math.ceil(totalCnt / 10);
        this.paginationSize = page;
      } catch (e) {
        alert("error");
        console.log(e);
      }
    },
    callApi(currentPage) {
      this.currentNo = currentPage;
      this.newsletter();
    },
    searchSubmit(v) {
      this.searchValue = v;
      this.currentNo = 1;
      this.searchYear = 2021;
      this.newsletter();
      this.errorMassege = "검색결과가 없습니다.";
      console.log(v);
    },
  },
};
</script>

<style scoped>
</style>
