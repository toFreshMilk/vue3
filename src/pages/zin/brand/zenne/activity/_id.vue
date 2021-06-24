<template>
  <v-app id="container">
    <main id="contents" class="zin_page news_detail_page has_snb">
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
          <div class="page_head news_detail_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">지엔느 활동</h2>
              </div>
            </div>
          </div>
          <div class="page_body news_detail_body type_default">
            <div class="detail_head">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h4 class="ttl">{{ detailinfo.title }}</h4>
                </div>
                <div class="info_area">
                  <span
                    >등록일
                    {{
                      $moment(detailinfo.registDate).format("YYYY.MM.DD")
                    }}</span
                  >
                </div>
              </div>
              <div class="btn_wrap">
                <div class="print_btn_area btn_area">
                  <div class="print_btn" role="button">
                    <i class="ic ic_print"></i>
                  </div>
                </div>
                <div class="share_btn_area btn_area">
                  <div
                    @click="shareBtnToggle($event)"
                    class="share_btn open_btn"
                    role="button"
                  >
                    <i class="ic ic_share"></i>
                  </div>
                  <div class="share_item_wrap type_arw_bottom arrow_box">
                    <div class="share_inner">
                      <button class="facebook_link" @click="sharebook">
                        <div class="ic_area">
                          <i class="ic ic_facebook_l"></i>
                        </div>
                        <p>페이스북</p>
                      </button>
                      <button class="kakao_link" @click="shareTalk">
                        <div class="ic_area">
                          <i class="ic ic_kakao_l"></i>
                        </div>
                        <p>카카오톡</p>
                      </button>
                      <button class="copy_link" @click="copyURL">
                        <div class="ic_area">
                          <i class="ic ic_copyLink"></i>
                        </div>
                        <p>링크복사</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="detail_body">
              <div class="img_wrap">
                <!-- <img src="/img/zin/@_detail_03.png" alt="상세이미지" /> -->
              </div>
              <div v-html="detailinfo.content"></div>
            </div>
            <div class="detail_foot">
              <div class="moveto_sec">
                <ul>
                  <li>
                    <strong>이전글</strong>
                    <a
                      v-if="detailinfo.prvTitle"
                      @click="detail(detailinfo.prvBoardSeq)"
                      ><p>{{ detailinfo.prvTitle }}</p></a
                    >
                    <a v-else class="disabled"
                      ><p>등록된 이전글이 없습니다.</p></a
                    >
                  </li>
                  <li>
                    <strong>다음글</strong>
                    <a
                      @click="detail(detailinfo.nxtBoardSeq)"
                      v-if="detailinfo.nxtTitle"
                      ><p>{{ detailinfo.nxtTitle }}</p></a
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
import ProductSnb from "~/components/zinBrand/brandSnb";
import snb from "~/assets/data/brandSnb.json";
import moment from "moment";
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
  async fetch() {
    console.log(this.$nuxt.$route.query.page);
    this.boardSeq = this.$nuxt.$route.params.id;
    this.page = this.$nuxt.$route.query.page;
  },
  mounted() {
    this.zenneActiveDetail();
  },
  data() {
    return {
      boardSeq: "",
      snb: snb,
      thisPostScrap: false,
      page: 1,
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
      detailinfo: {},
    };
  },
  methods: {
    detail(v) {
      this.$router.push({
        path: "./" + v,
        query: {
          page: this.page,
        },
      });
    },
    shareBtnToggle(e) {
      let shareBtn = document.querySelectorAll(".share_btn.open_btn");
      let shareWraps = document.querySelectorAll(".share_item_wrap");
      let shareBtnArea = e.currentTarget.closest(".share_btn_area");
      let shareWrap = shareBtnArea.querySelector(".share_item_wrap");
      shareWraps.forEach((e) => e.classList.remove("is_active"));
      if (this.currentShareItem == e.currentTarget) {
        shareWrap.classList.remove("is_active");
        this.currentShareItem = null;
      } else {
        shareWrap.classList.add("is_active");
        this.currentShareItem = e.currentTarget;
      }
    },
    backList() {
      this.$router.push({
        path: "/zin/brand/zenne/activity/",
        query: {
          page: this.page,
        },
      });
    },

    async zenneActiveDetail() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/zinrSvcApi/svcRead",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            boardSeq: this.boardSeq,
            size: 8,
          },
        });
        const data = this.$get(res, "data.item", {});
        this.detailinfo = data;
      } catch (e) {
        console.log(e);
      }
    },

    printNew() {
      const printBody = document.querySelector(".detail_body").innerHTML;
      const popupPrint = window.open(
        "",
        "_blank",
        "width=auto,height=auto,toolbar=no,location=no,menubar=no,status=no"
      );
      popupPrint.document.write(printBody);
      popupPrint.document.close();
      popupPrint.focus();
      popupPrint.print();
      popupPrint.onafterprint = function () {
        popupPrint.close();
      };
    },
    copyURL() {
      const copyUrl = window.location.href;
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = copyUrl;
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      this.$dialog.alert("링크가 복사되었습니다.", function () {}, {
        motion: "fade",
      });
    },
    sharebook() {
      const shareUrl = window.location.href;
      const shareTitle = document.title;
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(shareUrl) +
          "&t" +
          encodeURIComponent(shareTitle),
        "_blank",
        "width=600,height=500,top=200,left=200"
      );
    },
    shareTalk() {
      Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: this.detailinfo.title,
          description: this.detailinfo.content || "뉴스레터",
          imageUrl:
            "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          link: {
            mobileWebUrl: document.URL,
            webUrl: document.URL,
            androidExecutionParams: document.URL,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: document.URL,
              webUrl: document.URL,
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: document.URL,
              webUrl: document.URL,
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>