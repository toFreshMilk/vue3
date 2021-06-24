<template>
  <v-app id="container">
    <main id="contents" class="cs_page notice_page has_snb">
      <div class="min_inner clearFix">
        <aside class="snb_sec divider_snb">
          <Snb
            currentCate="고객센터"
            :currentMenu="currentMenu"
            :menuData="snb"
            :BannerShow="false"
          />
        </aside>
        <article class="divider_cnt">
          <div class="page_head notice_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h3 class="ttl">공지사항</h3>
              </div>
            </div>
          </div>
          <div class="page_body notice_body">
            <section class="zin_sec notice_list_sec">
              <div class="list_search_wrap taC">
                <!-- 전체 토탈 갯수 -->
                <div v-if="maxItems === null || maxItems > i">
                  <div class="count_area flL">
                    전체
                    <strong class="c_point3">{{ this.totalCnt }}</strong
                    >개
                  </div>
                </div>
              </div>
              <div class="list_sec_body">
                <div class="notice_list_wrap">
                  <div class="tbl_list">
                    <table>
                      <caption></caption>
                      <colgroup>
                        <col />
                        <col width="190" />
                      </colgroup>
                      <thead>
                        <tr
                          class="notice_list_ttl"
                          style="background-color: white"
                        >
                          <th>제목</th>
                          <th>등록일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in noticeListItems"
                          :key="index"
                        >
                          <td class="ttl">
                            <a @click="detail(item.seq)">{{ item.subject }}</a>
                          </td>
                          <td class="date">
                            {{ item.creDate }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="noticeListItems.length < 1">
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
            </section>
          </div>

          <div class="list_sec_foot">
            <Pagination
              v-if="
                noticeListItems !== null &&
                noticeListItems.length > 0 &&
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
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import Snb from "~/components/common/Snb";
import ListSearchInput from "~/components/common/ListSearchInput";
import Pagination from "~/components/common/Pagination";
import ZinSelectItem from "~/components/common/ZinSelectItem";
import moment from "moment";

export default {
  layout: "default",
  name: "index",
  components: {
    Snb,
    Pagination,
    ListSearchInput,
    ZinSelectItem,
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
    this.notice();
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "cs_page",
    });
  },
  data() {
    return {
      maxItems: null,
      totalCnt: "",
      currentNo: 1,
      keyword: "",
      // snb: snb,

      // selectData: [
      //   {
      //     text: "전체",
      //     value: "all",
      //   },
      //   {
      //     text: "제목",
      //     value: "title",
      //   },
      //   {
      //     text: "내용",
      //     value: "content",
      //   },
      // ],
      searchType: "all",
      maxItems: null,
      totalCnt: "",
      currentNo: 1,
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
      noticeListItems: [],
      searchType: "",
      paginationSize: "",
      errorMassege: "",
      snb: [
        {
          name: "고객센터",
          link: "/zin/brand/",
          dep2: [
            {
              name: "공지사항",
              link: "/cs/notice/",
            },
            {
              name: "FAQ",
              link: "/cs/faq/",
            },
            {
              name: "1:1문의",
              link: "/publish/pc/cs/contact/",
            },
          ],
        },
      ],
    };
  },
  methods: {
    detail(v) {
      this.$router.push({
        path: "/cs/notice/detail/" + v,
        query: { page: this.currentNo },
      });
    },
    async notice() {
      try {
        this.errorMassege = "등록된 게시물이 없습니다.";
        console.log(this.currentNo);
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/noticeSvcApi/svcList",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            searchType: this.searchType,
            page: this.currentNo,
            size: 10,
            keyword: this.keyword,
          },
        });
        console.log("공지 사항");
        const noticelistdata = this.$get(res, "data.items", []);
        console.log(noticelistdata);
        const totalCnt = this.$get(res, "data.totalCount");
        this.totalCnt = totalCnt;
        this.noticeListItems = noticelistdata;
        const page = Math.ceil(totalCnt / 10);
        this.paginationSize = page;
      } catch (e) {
        alert("error");
        console.log(e);
      }
    },
    callApi(currentPage) {
      this.currentNo = currentPage;
      this.notice();
    },

    searchSubmit(v) {
      this.keyword = v;
      this.searchType = 1;
      this.currentNo = 1;
      this.notice();
      this.errorMassage = "검색결과가 없습니다.";
      this.searchType = "";
    },
  },
};
</script>

<style scoped>
</style>