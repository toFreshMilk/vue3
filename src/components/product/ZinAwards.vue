<template>
  <div class="modal_wrap has_overlay" :class="{'is_show': showModal}">
    <div class="modal awards">
      <div class="modal_head">
        <div class="ttl_area bar_ttl">
          <h3 class="ttl">수상 또는 인증</h3>
          <p>국내는 물론 세계적으로 인정받은 친환경 제품입니다.</p>
        </div>
      </div>
      <div class="modal_body">
        <section class="awards_sec">
          <div class="awards_ls">
            <div class="award_item">
              <div class="img_area">
                <img src="/img/zin/img_award_01.png" alt="M등급">
              </div>
              <div class="txt_area">
                <div class="ttl_area">
                  <h4 class="ttl">M등급이란</h4>
                </div>
                <p>핀란드 실내환경 기준을 만족하기 위해 건축자재관련 유해물질 방산관계를 M등급으로 분류하였는데, 유럽에서 시행되고 있는 친환경 인증제도 중 가장 권위있는 제도입니다.</p>
                <span class="star_txt">베스티 기준</span>
              </div>
            </div>
            <div class="award_item">
              <div class="img_area">
                <img src="/img/zin/img_award_01.png" alt="환경표지인증">
              </div>
              <div class="txt_area">
                <div class="ttl_area">
                  <h4 class="ttl">환경표지인증이란</h4>
                </div>
                <p>제품의 생산과정 각 단계에 걸쳐 지원 및 에너지와 오염배출이 덜 소비되는 제품을 선별해 친환경 상품임을 공인하는 국가공인 인증제도입니다.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="awards_info_sec">
          <div class="bg_box">
            <div class="txt_area">
              <h4 class="ttl">Z:IN WALLCOVERING 친환경 인증서 살펴보기</h4>
              <h6 class="ttl">환경표지인증이란</h6>
            </div>
            <p>제품의 생산과정 각 단계에 걸쳐 자원 및 에너지를 덜 소비하고 오염물질을 덜 배출하는 제품을 선별해 <br>친환경 상품임을 공인하는 국가공인 인증제도로 환경부와 한국환경산업기술원에서 주관합니다.</p>
          </div>
        </section>
        <div class="btn_area">
          <button class="btn basic c_blk w_m h_m download_btn" @click="openModal('awardsDownload')">인증서 다운로드 <i class="ic ic_download"></i></button>
        </div>
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
    <ZinAwardsDownload ref="awardsDownload" />
  </div>
</template>

<script>

import ZinAwardsDownload from "~/components/product/ZinAwardsDownload";

export default {
  name: "ZinAwards",
  components: {
    ZinAwardsDownload,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$nuxt.$emit("htmlOverShow");
    },
    openModal(name) {
      this.$refs[name].showModal = true;
    },
  },
};
</script>

<style scoped>

</style>