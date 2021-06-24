<template>
  <v-app id="container">
    <div id="contents" class="lifebook_page detail_page">
      <div class="detail_head">
        <div class="visual_wrap">
          <div class="min_inner clearFix">
            <div class="txt_wrap">
              <div class="ttl_area">
                <h1 class="ttl">아크릴 물감으로
                  구름 그림 그리기</h1>
              </div>
              <div class="summary_area">
                <p>그림과 차가 있는 드로잉 카페</p>
              </div>
              <div class="date_area">
                <p>2021.03.01</p>
              </div>
            </div>
            <div class="utility_wrap">
              <div class="hash_btn_group">
                <button v-for="item in hash"><span class="hash_item gray_type">{{ item }}</span></button>
              </div>
              <div class="btn_wrap">
                <div @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn type_w" role="button">
                  <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap_w'" class="ic"/>
                </div>
                <div class="share_btn_area type_arw_bottom btn_area">
                  <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
                    <i class="ic ic_share_w"></i>
                  </div>
                  <div class="share_item_wrap arrow_box">
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
      </div>
      <div class="detail_body">
        <section class="content_sec">
          <div class="detail_inner">
            <div class="detail_frame">
              <div class="ttl_area">
                <small>BTS 정국도 방문한 그 곳</small>
                <h2 class="ttl">페인팅룸</h2>
              </div>
              <div class="txt_area">
                <p>영화관이나 테마파크 방문이 부담스러운 요즘, 시간 보내기 좋은 공간으로 드로잉 카페가 주목받고 있다. BTS 정국도 방문하길 즐긴다는 드로잉 카페는 화실처럼 그림을 그리거나 카페처럼
                  커피를 마실 수 있는 복합 문화 공간이다. 이색 데이트 장소로도, 혼자만의 시간을 갖기에도 제격인 드로잉 카페에서 그림 그리기가 주는 힐링 효과를 느껴보자.
                  익선동 골목길의 어느 한옥을 개조한 ‘블란서미술관’은 동서양 예술이 공존하는 레트로 문화 공간을 지향한다. 그래서인지 문을 열고 들어서면 눈이 휘둥그레지는 레트로 인테리어가 시선을
                  붙잡는다. 동양풍 패턴과 서양식 소품이 어우러진 공간은 영화나 드라마 촬영지 같기도 하다. 준비된 드로잉 시안 중 하나를 선택해 이젤 앞 좌석이나 테이블 중 편한 곳에 앉아 그림을
                  그리면 된다.
                </p>
              </div>
              <div class="img_area">
                <img src="/img/styling/@_myhome_drawing.png" alt="">
                <img src="/img/styling/@_myhome_drawing.png" alt="">
              </div>
            </div>
            <div class="detail_frame">
              <PinImg :pinItems="relatedPinProductData" pinImgUrl="/img/styling/@_lifeboook_img01.png"/>
              <div class="txt_area">
                <p>익선동 골목길의 어느 한옥을 개조한 ‘블란서미술관’은 동서양 예술이 공존하는 레트로 문화 공간을 지향한다. 그래서인지 문을 열고 들어서면 눈이 휘둥그레지는 레트로 인테리어가 시선을
                  붙잡는다. 동양풍 패턴과 서양식 소품이 어우러진 공간은 영화나 드라마 촬영지 같기도 하다. 준비된 드로잉 시안 중 하나를 선택해 이젤 앞 좌석이나 테이블 중 편한 곳에 앉아 그림을
                  그리면 된다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="commentSec" class="comments_sec">
          <Comment :commentData="commentData"/>
        </section>
      </div>
      <div class="detail_foot">
        <div class="min_inner">
          <div class="recommend_ls">
            <!-- 0614 : 하단 컴포넌트 수정 -->
            <SlideItemList :slideLoop="false" :moveGroup="3" slideName="recommend_slide" :itemCol="3"
                           :itemData="relateItemData"
                           :isScrap="true" :itemInfo="true">
              <template v-slot:title>
                <h3 class="ttl">#이런 콘텐츠는 어떠세요?</h3>
              </template>
            </SlideItemList>
          </div>
          <div class="banner_area">
            <FullBanner slideBtnName :bannerItems="bannerData" arwType=""/>
          </div>
        </div>
        <aside class="lnb_wrap">
          <FloatingBar :thisPostScrap='thisPostScrap' :relateItemData="relatedPinProductData"
                       :commentData="commentData"/>
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
  layout:"detail",
  components: {
    StyleList,
    FullBanner,
    Header,
    Footer,
    PinImg,
    Comment,
    ItemList,
    FloatingBar,
    SlideItemList,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "lifebook_page",
      detailPageTitle: this.pageTitle,
    });
  },
  data() {
    return {
      pageTitle: '아크릴 물감으로 구름 그림 그리기',
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
      shareTopOpen: false,
      shareOpen: false,
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
      relatedPinProductData: [
        {
          itemID: 101,
          img: "/img/styling/@_door_thumb01.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/styling/myhome",
          locationY: "60",
          locationX: "70",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
        {
          itemID: 102,
          img: "/img/styling/@_door_thumb02.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/styling/myhome",
          locationY: "30",
          locationX: "10",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
        {
          itemID: 103,
          img: "/img/styling/@_door_thumb03.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/styling/myhome",
          locationY: "20",
          locationX: "85",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
        {
          itemID: 104,
          img: "/img/styling/@_door_thumb04.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/styling/myhome",
          locationY: "95",
          locationX: "60",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
        {
          itemID: 105,
          img: "/img/styling/@_door_thumb05.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/styling/myhome",
          locationY: "35",
          locationX: "60",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        }, {
          itemID: 106,
          img: "/img/styling/@_door_thumb05.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/pc/styling/myhome",
          locationY: "70",
          locationX: "35",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
      ],
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
  },
  async mounted() {
    await this.$nextTick();

  },
};
</script>

<style scoped>

</style>