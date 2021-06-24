<template>
  <v-app id="container">
    <main id="contents" class="zin_page zenne_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <ProductSnb currentCate="브랜드 이야기" :currentMenu="currentMenu" :menuData="snb" :BannerShow="false" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">지엔느 소개</h2>
              </div>
            </div>
          </div>
          <div class="page_body zenne_about">
            <section class="zin_sec overview_sec">
              <div class="img_area">
                <img src="/img/zin/@_zenne_head.png" alt="Z:ENNE">
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <div class="ttl_area">
                    <h3 class="ttl">Z:ENNE</h3>
                  </div>
                </div>
                <div class="content_wrap">
                  <p>지엔느는 공간에 대한 긴:생각을 실천하는 대표 인테리어 Community입니다. ‘지엔느’는 친환경적이고 믿을 수 있는 건강한 생활공간의 중요성을
                    전문적으로&nbsp;알고 이를 전파합니다. 자연과의 조화를 추구하는 가치관을 통해 인간에 대한 배려와 사랑을 실천하는 것을 목표로 합니다. <br>
                    앞선 생활, 풍요로운 생활에 대한 가치를 맡고 자부심을 갖습니다.</p>
                </div>
              </div>
            </section>
            <section class="zin_sec role_sec">
              <div class="ttl_area noM">
                <h4 class="ttl">Main Role</h4>
              </div>
              <div class="label_content cent">
                <div class="label_wrap vaM">
                  <div class="ttl_area noM">
                    <h2 class="ttl">‘지엔느’는</h2>
                  </div>
                </div>
                <div class="content_wrap vaM">
                  <div class="img_area">
                    <img src="/img/zin/img_main_role.png" alt="">
                  </div>
                </div>
              </div>
            </section>
            <section class="zin_sec activity_sec">
              <div class="label_content cent">
                <div class="label_wrap">
                  <div class="ttl_area noM">
                    <h4 class="ttl">Activity</h4>
                  </div>
                </div>
                <div class="content_wrap">
                  <p>지엔느는 매년 새로운 기수를 모집 선발하여 활동임기는 1년입니다. 지엔느는 미션으로 주어지는 역할을 수행하며 Z:IN이 주최하는
                    인테리어/리빙 클래스(에코스쿨)과 해외 인테리어 탐방 등 다양한 활동에 참여하게 됩니다.</p>
                </div>
              </div>
              <div class="part mission_part">
                <div class="label_content cent">
                  <div class="label_wrap">
                    <div class="ttl_area noM">
                      <h4 class="ttl">Mission</h4>
                    </div>
                  </div>
                  <div class="content_wrap">
                    <div class="grid grid_17">
                      <div class="col col_4">
                        <div class="mission_item mission_item_01">
                          <div class="ttl_area">
                            <h3 class="ttl">프로슈머</h3>
                            <p>고객의 시선에서 제품에 대한 <br>품평 및 아이디어 제안!</p>
                          </div>
                          <div class="txt_area">
                            <p>제품설명회, 품평회, 설문조사 참여</p>
                          </div>
                        </div>
                      </div>
                      <div class="col col_4">
                        <div class="mission_item mission_item_02">
                          <div class="ttl_area">
                            <h3 class="ttl">브랜드 홍보대사</h3>
                            <p>공식 홍보대사로서, <br>Z:IN의 브랜드 가치 전파!</p>
                          </div>
                          <div class="txt_area">
                            <p>다양한 신제품 및 마케팅 소식 <br>온라인 / SNS 홍보</p>
                          </div>
                        </div>
                      </div>
                      <div class="col col_4">
                        <div class="mission_item mission_item_03">
                          <div class="ttl_area">
                            <h3 class="ttl">컨텐츠 크리에이터</h3>
                            <p>Z:IN 블로그의 필진으로서 <br>인테리어에 대한 긴 : 생각 공유</p>
                          </div>
                          <div class="txt_area">
                            <p>인테리어 / DIY / 시공후기 등 <br>리빙 관련 컨텐츠 기고</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="part benefits_part">
                <div class="label_content cent">
                  <div class="label_wrap">
                    <div class="ttl_area noM">
                      <h4 class="ttl">Benefits</h4>
                    </div>
                  </div>
                  <div class="content_wrap">
                    <p>Z:IN의 공식 홍보대사로서, 당사에서 주관하는 다양한 행사에 참가하실 수 있습니다.</p>
                    <div class="benefits_ls">
                      <div class="benefits_node">
                        <div class="benefits_item benefits_item_01">
                          <div class="ttl_area">
                            <h3 class="ttl">정기 인테리어 & 리빙클래스</h3>
                            <p>Z:IN에서 정기적으로 개최하는 <br>인테리어 &amp; 리빙 클래스에 참여하실 수 있습니다.</p>
                          </div>
                        </div>
                      </div>
                      <div class="benefits_node">
                        <div class="benefits_item benefits_item_02">
                          <div class="ttl_area">
                            <h3 class="ttl">Z:IN의 인테리어 자재 체험기회!</h3>
                            <p>Z:IN의 신제품을 직접 <br>체험하실 수 있는 기회를 드립니다.</p>
                          </div>
                          <span class="star_txt">자재체험 기회는 내부 사정에 의해 조건이 상이할 수 있습니다</span>
                        </div>
                      </div>
                      <div class="benefits_node">
                        <div class="benefits_item benefits_item_03">
                          <div class="ttl_area">
                            <h3 class="ttl">임기 후 희망자는 <br>‘명예지엔느’로 활동 가능!</h3>
                            <p>임기 후 희망자의 경우 ‘명예지엔느’로서 <br>활동을 지속하실 수 있습니다.</p>
                          </div>
                        </div>
                      </div>
                      <div class="benefits_node">
                        <div class="benefits_item benefits_item_04">
                          <div class="ttl_area">
                            <h3 class="ttl">연간 미션완료 시, <br>해외 인테리어 탐방 기회!</h3>
                            <p>활동기간동안 주어진 주요 미션(Mission)을 <br>성실히 완료하신 분들께는 <br>연말 ‘해외 인테리어 탐방’ 기회를 드립니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="part notice_part">
                <div class="label_content cent">
                  <div class="label_wrap">
                    <div class="ttl_area noM">
                      <h4 class="ttl">Notice</h4>
                    </div>
                  </div>
                  <div class="content_wrap">
                    <ul class="dot_list">
                      <li>해외 인테리어탐방 대상국은 현지 사정 등에 따라 추후 변경될 수 있습니다.</li>
                      <li>해외 인테리어 탐방 경비에 대한 제세공과금은 LX하우시스가 부담합니다.
                        <small>단, 소요 경비는 지엔느의 개인 소득으로 국세청에 신고되며, 이로 인해 발생되는 추가 사항은 본인 부담입니다.</small>
                      </li>
                      <li>에코스쿨 및 해외 인테리어 탐방에 개인일정으로 인한 불참 시 별도의 보상은 주어지지 않으니 이 점 양해바랍니다.</li>
                      <li>가입 시 작성하는 활동동의서에 명시된 활동 기준에 미달하는 분은 사전 안내 후 탈퇴될 수 있습니다.</li>
                      <li>Z:IN 제품 체험은 일부 품목으로 제한됩니다.</li>
                    </ul>
                  </div>
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
import ZinTabs from "~/components/common/ZinTabs";
import ItemList from "~/components/common/ItemList";
import ExamList from "~/components/product/ExamList";
import ZinDetailTabs from "~/components/product/ZinDetailTabs";
import PatternList from "~/components/product/PatternList";
import VideoSlide from "~/components/product/VideoSlide";
import setFixElem from "~/common/js/fixElem";
import ZinFloatingBar from "~/components/product/ZinFloatingBar";
import SlideItemList from "~/components/common/SlideItemList";
import ZinSlide from "~/components/product/ZinSlide";
import snb from "~/assets/data/brandSnb.json";

export default {
  layout: "default",
  name: "index",
  components: {
    ProductSnb,
    ZinTabs,
    ZinDetailTabs,
    ItemList,
    ExamList,
    PatternList,
    VideoSlide,
    ZinFloatingBar,
    SlideItemList,
    ZinSlide,
    snb
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page zenne_page",
    });
  },
  data() {
    return {
      benefitsIdx: 0,
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
    setCurrentTab(v) {
      this.currentTab = v;
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
    benefitsEl() {
      const benefitsEl = document.querySelector('.benefits_ls');
      if(!benefitsEl) return;
      const benefitsW = benefitsEl.clientWidth
      const benefitsNode = benefitsEl.querySelectorAll('.benefits_node');
      for (let i=0; i<benefitsNode.length; i++) {
        benefitsNode[i].style.zIndex = benefitsNode.length - i;
        benefitsNode[i].style.top = 40 * i + 'px';
        benefitsNode[i].style.left = (benefitsW - 580) / (benefitsNode.length - 1) * i + 'px';
      }
    },
  //  이벤트 제거 0616
  },
  async mounted() {
    await this.$nextTick();
    this.benefitsEl();
    window.addEventListener('scroll', setFixElem('#contents', '#zinfloatingBar'))
  },
  beforeDestroy() {
    window.removeEventListener('scroll', setFixElem)
  },
};
</script>

<style scoped>

</style>