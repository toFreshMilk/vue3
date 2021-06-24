<template>
  <v-app id="container">
    <div id="contents" class="trend_page detail_page">
      <div class="detail_head">
        <div class="visual_wrap">
          <figure style="background-image:url(/img/styling/@_trend_visual.png)" class="bg"></figure>

        </div>
        <div class="head_inner">
          <div class="ttl_area">
            <div class="ttl_inner">
              <h1 class="ttl">
                {{this.pageTitle}}
              </h1>
            </div>
          </div>
          <div class="cnt_area">
            <p>명료한 그래픽 디자인으로 공간에 직관성을 부여하며, 산업적인 요소와 레트로한 감성의 컬러 블로킹이 믹스되어<br>
              규정되지 않는 유스 세대의 자유로운 감각이 더해진 공간 연출이 돋보이는 트렌드를 소개합니다.</p>
          </div>
          <div class="info_wrap clearFix">
            <div class="info_area">
              <span class="date">2021. 03. 01</span>
            </div>
            <div class="btn_wrap">
              <div @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn type_w" role="button">
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
          </div>
        </div>
      </div>

      <div class="detail_body">
        <section class="content_sec">
          <div class="detail_inner">
            <img src="/img/styling/@_trend_cntImg.png">
          </div>
        </section>
        <section id="commentSec" class="comments_sec">
          <Comment :commentData="commentData"/>
        </section>
      </div>
      <div class="detail_foot">
        <div class="min_inner">
          <div class="similar_ls">
            <!-- 0614 : 하단 컴포넌트 수정 -->
            <SlideItemList :slideLoop="false" :moveGroup="3" slideName="similar_slide" :itemCol="3" :itemInfo="false"
                           :itemData="similarItemData" :isScrap="false">
              <template v-slot:title>
                <h3 class="ttl">연관 콘텐츠</h3>
              </template>
            </SlideItemList>
          </div>
          <div class="banner_area">
            <FullBanner slideBtnName :bannerItems="bannerData" arwType=""/>
          </div>
        </div>
        <aside class="lnb_wrap">
          <FloatingBar :thisPostScrap = 'thisPostScrap' :relateItemData="relateItem" :commentData="commentData"/>
        </aside>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import PinImg from "~/components/common/PinImg";
import Comment from "~/components/common/Comment";
import ItemList from "~/components/common/ItemList";
import FullBanner from "~/components/common/FullBanner";
import StyleList from "~/components/styling/StyleList";
import SlideItemList from "~/components/common/SlideItemList";
import FloatingBar from "~/components/common/FloatingBar";
import setFixElem from "~/common/js/fixElem";


export default {
  name: "myhome-detail",
  layout:'detail',
  components: {
    StyleList,
    FullBanner,
    Header,
    Footer,
    PinImg,
    Comment,
    ItemList,
    SlideItemList,
    FloatingBar
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "trend_page",
      detailPageTitle : this.pageTitle,
    });
  },
  data() {
    return {
      pageTitle:'2020 Design Trend ③ THEME 3 : Dream fiction',
      relateItem : [],
      bannerData: [
        {
          img: "/img/styling/@_banner_evt01.png",
        }, {
          img: "/img/styling/@_banner_evt01.png",
        }, {
          img: "/img/styling/@_banner_evt01.png",
        },
      ],
      currentShareItem: null,
      thisPostScrap: false,
      collectOpen: false,
      myScrapData: ["01"],
      relateItemData: [
        {
          itemID: "01",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral01.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "02",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral02.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "03",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral03.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "04",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_recomend01.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        },
      ],
      similarItemData: [
        {
          itemID: "05",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral01.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "06",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral02.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "07",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral03.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "08",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_recomend01.png",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        },
      ],
      hash: ["미니멀", "모던", "플랜테리어", "클래식", "공간스타일"],
      writer: {
        picUrl: "/img/styling/@_myhome_profile.png",
        name: "지니지니",
        date: "2021. 03. 01",
        scrap: "1,253",
        view: "3,054",
        reply: 15,
      },
      viewerOpt: {
        "inline": false,
        "button": true,
        "navbar": false,
        "title": false,
        "toolbar": false,
        "tooltip": false,
        "movable": true,
        "zoomable": true,
        "rotatable": false,
        "scalable": false,
      },
      commentData: {
        commentInput: "",
        comments: [
          {
            id: 1,
            name: "지니지니",
            content: "아주 따뜻해보이고 편안한 분위기가 느껴지네요!",
            update: "12시간 전",
            mine: true,
          },
          {
            id: 2,
            name: "dayday",
            content: "집이 너무 예뻐요. 저희집도 다이닝 공간을 어떻게할지 고민이 정말 많았는데, 도움이 많이 되었네요. ^^\n" +
              "혹시 책상용 선반은 따로 제작하신 건지 알 수 있을까요~?",
            update: "19시간 전  ",
            mine: false,
          },
          {
            id: 3,
            name: "모죠",
            content: "세련 그 자체; 저 집이 내 집이었으면...",
            update: "2021.01.20",
            mine: false,
          },
          {
            id: 4,
            name: "셀프장인",
            content: "너무 아늑해 보여요~ 디자인 조화가 아름답네요.",
            update: "2021.01.14",
            mine: false,
          },
          {
            id: 5,
            name: "아네미네",
            content: "정말 모던하네요! 저희집 인테리어 할 때 참고 해야겠어요. 너무 예뻐요^^ ",
            update: "2021.01.14",
            mine: false,
          },
        ],
      },
    };
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
    progressBar() {
      let currentBar = document.querySelector('.progress_bar span.current')
      let detailHeadHeight
      let footerHeight = document.querySelector('#footer').clientHeight
      let contents = document.querySelector('#contents')
      let contentsH = contents.clientHeight
      let winH = window.innerHeight
      let st
      let percent = 1
      let progress
      let base
      window.addEventListener('scroll', function () {
        st = window.pageYOffset;
        progress = st - detailHeadHeight
        base = contentsH - winH - 100 - footerHeight
        if (progress < 0) {
          progress = 0
        }
        percent = (progress / base) * 100
        currentBar.style.width = percent + '%'
        console.log(percent, contentsH + winH)
      })
    },
  },
  async mounted() {
    await this.$nextTick();
    this.progressBar()
    window.addEventListener('scroll', function () {
      setFixElem('.detail_page .lnb_wrap', '#floatingBar')
    })
  },
};
</script>

<style scoped>

</style>