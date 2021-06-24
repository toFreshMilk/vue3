<template>
  <!-- <aside class="snb_sec divider_snb flL">
          <ProductSnb
            currentCate="브랜드 이야기"
            :currentMenu="currentMenu"
            :menuData="snb"
            :BannerShow="false"
          />
        </aside> -->
  <article class="divider_cnt flR">
    <div class="page_head recruitment_detail_head">
      <div class="ttl_group">
        <div class="ttl_area">
          <h2 class="ttl">지엔느 모집 안내</h2>
        </div>
      </div>
    </div>
    <div class="page_body recruitment_detail_body type_default">
      <div class="detail_head">
        <div class="ttl_group">
          <div class="ttl_area">
            <h4 class="ttl">{{ recruitmentDetail.title }}</h4>
          </div>
          <div class="info_area">
            <span>
              접수기간
              {{ $moment(recruitmentDetail.fromDate).format("YYYY.MM.DD") }}
              ~
              {{ $moment(recruitmentDetail.toDate).format("YYYY.MM.DD") }}
            </span>
            <span v-if="status == 1">진행중</span>
          </div>
        </div>
        <div class="btn_wrap">
          <div class="print_btn_area btn_area">
            <div class="print_btn" role="button" @click="printOpen">
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
      <div id="printArea" class="detail_body">
        <div v-html="recruitmentDetail.content"></div>
      </div>
      <div class="detail_foot">
        <div class="btn_area clearFix">
          <button class="btn h_m w_m basic c_blk flL" @click="backList">
            <span>목록</span>
          </button>
          <ZinDialog
            v-show="wtin()"
            ref="draftSaveDialog"
            dialog-title="임시저장 안내"
            :topBtn="true"
            :max-w="410"
            :subTtl="false"
            class="draft_save_modal"
          >
            <template v-slot:btn>
              <button class="btn h_m w_m basic c_blk flL">
                <span>지원하기</span>
              </button>
            </template>
            <template v-slot:bodyArea>
              <div class="body_cnt_body draft_save_body">
                <p>
                  작성 중이던 게시물이 있습니다.<br />
                  이어서 작성하시겠습니까?
                </p>
                <span>* 새로쓰기를 누르면 작성중이던 게시물은 삭제됩니다</span>
              </div>
            </template>
            <template v-slot:btnGroup>
              <button class="btn h_m basic col col_6" @click="goAplication()">
                새로쓰기
              </button>
              <button
                class="btn h_m strong col col_6"
                @click="$refs.draftSaveDialog.dialog = false"
              >
                이어쓰기
              </button>
            </template>
          </ZinDialog>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import ProductSnb from "~/components/zinBrand/brandSnb";
import ZinDialog from "~/components/zinBrand/ZinDialog";
import snb from "~/assets/data/brandSnb.json";

export default {
  layout: "zinBrand",
  name: "recruitment",
  components: {
    ProductSnb,
    ZinDialog,
  },
  mounted() {
    console.log(snb);
    this.recruitDetail();
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  async fetch() {
    console.log(this.$nuxt.$route.query.page);
    this.seq = this.$nuxt.$route.query.seq;
    this.page = this.$nuxt.$route.query.page;
  },
  data() {
    return {
      seq: 0,
      page: 1,
      status: 0,
      recruitmentDetail: [],
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
    wtin() {
      const fromDate = new Date(this.recruitmentDetail.fromDate);
      const toDate = new Date(this.recruitmentDetail.toDate);
      const date = new Date();
      if (fromDate < date && date < toDate) {
        return true;
      }
      return false;
    },
    backList() {
      this.$router.push({
        path: "/zin/brand/zenne/recruitment/",
        query: {
          page: this.page,
        },
      });
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
          title: this.recruitmentDetail.title,
          description: this.recruitmentDetail.content || "지엔느 모집 안내",
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
    goAplication() {
      const router = this.$router;
      this.$refs.draftSaveDialog.dialog = false;
      let Yn = this.$dialog.confirm(
        '<div class="save_modal_cnt">\n' +
          '  <p class="h6_ttl">자성중이던 지원서는 삭제됩니다.<br> 새로 쓰시겠습니다.</p>' +
          "</div>",
        function () {
          router.push({
            path: "/zin/brand/zenne/recruitment/application/",
          });
        },
        function () {
        },
        {
          btns: {
            cancel: { label: "취소" },
            submit: {
              label: "확인" },
          },
          motion: "fade",
          overlay: true,
        },
        "small"
      );
    },
    async recruitDetail() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/zinrRecruitSvcApi/svcZinrRecruitRead",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            seq: this.seq,
          },
        });
        const listdata = this.$get(res, "data.item", {});
        const totalCnt = this.$get(res, "data.totalCount");
        this.totalCnt = totalCnt;
        this.recruitmentDetail = listdata;
        this.status = listdata.status.value;
      } catch (e) {
        alert("error");
        console.log(e);
      }
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
    printOpen: function () {
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
  },
};
</script>

<style scoped>
</style>