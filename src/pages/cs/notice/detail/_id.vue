<template>
  <v-app id="container">
    <main id="contents" class="zin_page notice_page has_snb">
      <div class="min_inner clearFix">
        <aside class="snb_sec divider_snb">
          <ProductSnb
            currentCate="고객센터"
            :currentMenu="currentMenu"
            :menuData="snb"
            :BannerShow="false"
          />
        </aside>
        <article class="divider_cnt">
          <div class="page_head news_detail_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h3 class="ttl">공지사항</h3>
              </div>
            </div>
          </div>
          <div
            class="page_body news_detail_body notice_detail_body type_default"
          >
            <div class="detail_head">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h4 class="ttl">{{ detailinfo.subject }}</h4>
                </div>
                <div class="info_area">
                  <span>{{ detailinfo.creDate }}</span>
                  <!-- 등록시간 : SB, API 없음! -->
                  <!-- <span>{{ detailinfo.time }}</span> -->
                </div>
              </div>
            </div>
               <div class="detail_body">
                <!-- ********첨부파일 API 필요********* -->
              <!-- <div class="attachment_wrap">
                <table>
                  <thead>
                    <th><span class="ic_file">첨부파일 1개</span></th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#">첨부파일명.jpg (10MB)</a>
                        <i class="ic ic_download"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
              <div class="detail_cnt_wrap">
                <div v-html="detailinfo.content"></div>
              </div>
            </div>
            <div class="detail_foot">
              <div class="moveto_sec">
                <ul>
                  <li>
                    <strong>이전글</strong>
                    <a
                      v-if="detailinfo.prevSubject"
                      @click="detail(detailinfo.prevNoticeSeq)"
                      ><p>{{ detailinfo.prevSubject }}</p></a
                    >
                    <a v-else class="disabled"
                      ><p>등록된 이전글이 없습니다.</p></a
                    >
                  </li>
                  <li>
                    <strong>다음글</strong>
                    <a
                      @click="detail(detailinfo.nextNoticeSeq)"
                      v-if="detailinfo.nextSubject"
                      ><p>{{ detailinfo.nextSubject }}</p></a
                    >
                    <a v-else class="disabled"
                      ><p>등록된 다음글이 없습니다.</p></a
                    >
                  </li>
                </ul>
              </div>
              <div class="btn_area" @click="backList">
                <button class="btn h_m w_m basic c_blk">
                  <span>목록</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import ProductSnb from "~/components/zin/ProductSnb";
import moment from "moment";
// import Pagination from "~/components/common/ProductSnb";

export default {
  layout: "default",
  name: "index",
  components: {
    ProductSnb,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  mounted() {
    this.noticedetail();
  },
  data() {
    return {
      noticeSeq: "",
      id: "",
      thisPostScrap: false,
      mypage: 1,
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
      detailinfo: {},
    };
  },
  asyncData({ route, error }) {
    if (!route.params.id) {
      error({ statusCode: 404, message: "page not found" });
    }
    if (route.query.page) {
      return { mypage: route.query.page };
    }
  },
  async fetch() {
    this.noticeSeq = this.$nuxt.$route.params.id;
  },
  methods: {
     async noticedetail() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/noticeSvcApi/svcRead",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            noticeSeq: this.noticeSeq,
          },
        });
        const noticelistdata = this.$get(res, "data.item", {});
        this.detailinfo = noticelistdata;
      } catch (e) {
        alert("error");
        console.log(e);
      }
    },
    detail(v) {
      this.$router.push({
        path: "/cs/notice/detail/" + v,
        query: {
          page: this.mypage,
        }
      });
    },
    backList() {
      this.$router.push({
        path: "/cs/notice",
        query: {
          page: this.mypage,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>