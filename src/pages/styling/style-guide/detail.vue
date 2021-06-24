<template>
  <v-app id="container">
    <main id="contents" class="styling_page guide_detail_page">
      <div class="page_head guide_head">
        <section class="styling_sec ttl_sec">
          <div class="min_inner">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">인테리어 A to Z</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="page_body guide_body">
        <div class="guide_overview">
          <div class="min_inner">
            <section class="txt_sec">
              <div class="ttl_group" v-for="item in detailInfo">
                <div class="ttl_area">
                  <h4 class="ttl">{{ item.ttl }}</h4>
                </div>
                <div class="info_area">
                  <span>등록일 {{ item.write.date }}</span>
                  <span>조회수 {{ item.write.view }}</span>
                </div>
              </div>
              <div class="btn_wrap">
                <div @click="thisPostScrap = !thisPostScrap" class="scrap_btn type_w"
                     role="button">
                  <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
                </div>
                <div class="share_btn_area btn_area">
                  <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
                    <i class="ic ic_share"></i>
                  </div>
                  <div class="share_item_wrap type_arw_bottom arrow_box">
                    <div class="share_inner">

                      <button class="facebook_link">
                        <div class="ic_area">
                          <i class="ic ic_facebook_l"></i>
                        </div>
                        <p>페이스북</p>
                      </button>
                      <button class="kakao_link">
                        <div class="ic_area">
                          <i class="ic ic_kakao_l"></i>
                        </div>
                        <p>카카오톡</p>
                      </button>
                      <button class="copy_link">
                        <div class="ic_area">
                          <i class="ic ic_copyLink"></i>
                        </div>
                        <p>링크복사</p>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="cnt_img_sec">
              <div class="img_wrap"><img src="/img/styling/@_guide_cntimg.png" alt="상세이미지"></div>
            </section>
            <section class="moveto_sec">
              <ul>
                <li>
                  <strong>이전글</strong>
                  <a href="#"><p>등록된 이전글이 없습니다.</p></a>
                </li>
                <li>
                  <strong>다음글</strong>
                  <a href="#"><p>벽지 시공 일정짜기</p></a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div class="btn_area">
          <button class="btn h_m w_m basic c_blk">
            <span>목록</span>
          </button>
        </div>
      </div>
    </main>
  </v-app>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import ItemList from "~/components/common/ItemList";

export default {
  name: "detail",
  components: {
    Header,
    Footer,
    ItemList,
  },
  data() {
    return {
      total: 0,
      thisPostScrap: false,
      detailInfo: [
        {
          ttl: "한 눈에 확인하는 소재 별 벽지 종류",
          write: {
            date: "2021.05.0",
            view: 254,
          },
        },
      ],
    }
  },
  methods: {
    shareBtnToggle(e) {
      let shareBtn = document.querySelectorAll('.share_btn.open_btn')
      let shareWraps = document.querySelectorAll('.share_item_wrap')
      let shareBtnArea = e.currentTarget.closest('.share_btn_area')
      let shareWrap = shareBtnArea.querySelector('.share_item_wrap')
      shareWraps.forEach((e) => e.classList.remove('is_active'))
      if (this.currentShareItem == e.currentTarget) {
        shareWrap.classList.remove('is_active')
        this.currentShareItem = null
      } else {
        shareWrap.classList.add('is_active')
        this.currentShareItem = e.currentTarget
      }
    },
  },
}
</script>

<style scoped>

</style>