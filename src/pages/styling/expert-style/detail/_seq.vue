<template>
  <v-app id="container">
    <div id="contents" class="myhome_page detail_page">
      <div class="detail_head">
        <div class="visual_wrap">
          <figure style="background-image:url(/img/styling/@_expert_visual.png)" class="bg"></figure>
        </div>
        <div class="min_inner clearFix">
          <div class="ttl_area">
            <div class="ttl_inner">
              <h2 class="ttl">{{this.pageTitle}}</h2>
            </div>
          </div>
          <div class="utility_wrap">
            <div class="hash_btn_group">
              <button v-for="item in hash"><span class="hash_item gray_type">{{ item }}</span></button>
            </div>
            <div class="info_area has_elem">
              <div class="txt_area">
                <p class="name">{{ writer.name }}</p>
                <div class="info_group">
                  <div class="date">등록일 {{ writer.date }}</div>
                  <div class="scrap">스크랩 {{ writer.scrap }}</div>
                  <div class="view">조회 {{ writer.view }}</div>
                  <div class="reply">댓글 {{ writer.reply }}</div>
                </div>
              </div>
            </div>
            <div class="btn_wrap">
              <div class="modify_btn info_group">
                <div class="delete" role="button">삭제</div>
                <div class="delete" role="button">수정</div>
              </div>
              <div @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn type_w" role="button">
                <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
              </div>
              <div class="share_btn_area btn_area">
                <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
                  <i class="ic ic_share"></i>
                </div>
                <div class="share_item_wrap type_arw_bottom arrow_box">
                  <div class="share_inner">
                    <button class="copy_link">
                      <div class="ic_area">
                        <i class="ic ic_copyLink"></i>
                      </div>
                      <p>링크복사</p>
                    </button>

                    <button class="kakao_link">
                      <div class="ic_area">
                        <i class="ic ic_kakao_l"></i>
                      </div>
                      <p>카카오톡</p>
                    </button>

                    <button class="facebook_link">
                      <div class="ic_area">
                        <i class="ic ic_facebook_l"></i>
                      </div>
                      <p>페이스북</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg_box">
              <dl class="label_txt">
                <dt>주거형태</dt>
                <dd>아파트</dd>
              </dl>
              <dl class="label_txt">
                <dt>공간</dt>
                <dd>주방, 욕실, 창호, 벽지, 바닥, 도어</dd>
              </dl>
              <dl class="label_txt">
                <dt>평형</dt>
                <dd>30평대</dd>
              </dl>
              <dl class="label_txt">
                <dt>예산</dt>
                <dd>1천만원 이하</dd>
              </dl>
              <dl class="label_txt">
                <dt>누구와</dt>
                <dd>신혼부부,싱글</dd>
              </dl>
              <dl class="label_txt">
                <dt>스타일</dt>
                <dd>모던, 북유럽, 내추럴</dd>
              </dl>
              <dl class="label_txt">
                <dt>컬러</dt>
                <dd>
                  <div class="color_group">
                    <span class="color_item" v-for="item in colorPick"
                          :style="`background:${item}`"></span>
                  </div>
                </dd>
              </dl>
              <dl class="label_txt">
                <dt>분야</dt>
                <dd>부분 리모델링,홈스타일링</dd>
              </dl>
              <dl class="label_txt">
                <dt>시공범위</dt>
                <dd>부분 리모델링,홈스타일링</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="detail_body">
        <!--          api로 받아야 하는 영역인듯-->
        <section class="content_sec">
          <div class="detail_inner">
            <div class="detail_frame">
              <div class="ttl_area">
                <h3 class="ttl">도면</h3>
              </div>
              <div class="img_area">
                <img src="/img/styling/@_myhome_drawing.png" alt="">
              </div>
              <div class="txt_area">
                <p>주방, 욕실, 창호, 벽지, 바닥, 도어 </p>
              </div>
            </div>
            <div class="detail_frame">
              <div class="ttl_area">
                <h3 class="ttl">주방</h3>
              </div>
              <PinImg :pinItems="relatedPinProductData" pinImgUrl="/img/styling/@_expert_pinImg.png"/>
              <div class="txt_area">
                <p>주방 바닥재 면적을 넓게 시공하면 기존보다 쾌적한 느낌의 조리 공간을 연출할 수 있습니다.
                  하우스 베실리우스 바닥재와 그레이 톤의 인테리어 필름을 입힌 주방가구로 바탕을 깔고 조명과 골드 액세서리로 포인트를 가미하면 꿈꾸던 주방이 현실이 됩니다.
                  주방가구 손잡이를 골드로 선택했다면 주방 창 손잡이는 망설임 없이 스쿼마 라인 골드 컬러로 맞춰주세요.
                </p>
              </div>
            </div>
            <div class="detail_frame">
              <div class="ttl_area">
                <h3 class="ttl">주방 Before</h3>
              </div>
              <div class="img_area">
                <img src="/img/styling/@_expert_before.png" alt="">
              </div>
              <div class="txt_area">
                <p>기본 구조의 부엌으로, 별다른 특징없이 깔끔한 상태입니다. 입주 당시 기존 브라운톤의 마감재 그대로 유지했던 시공 전 모습입니다.</p>
              </div>
            </div>
            <div class="detail_frame">
              <div class="ttl_area">
                <h3 class="ttl">주방 after</h3>
              </div>
              <div class="slide_area">
                <client-only>
                  <div class="swiper_pagination"></div>
                  <swiper ref="swipeTxt" class="slide_item_list full_size" :options="swiperOptions">
                    <swiper-slide v-for="(item, index) in swiperSlideItems" :key="'postSwiper'+ index" class="list_item slide_list_item">
                      <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                    </swiper-slide>
                  </swiper>
                </client-only>
              </div>
              <div class="txt_area">
                <p>베란다를 확장하여 샤시 시공을 베란다를 확장하여 샤시 시공을 다시 하고, 확장 부위에 등박스를 확대 시공하여 LED 스퀘어형 조명으로 교체하였습니다.</p>
              </div>
            </div>
            <div class="detail_frame">
              <div class="ttl_area">
                <h3 class="ttl">주방 창호시공</h3>
              </div>
              <div class="video_area">
                <div class="iframe_inner">
                  <client-only>
                    <video class="video-js vjs-default-skin vjs-big-play-centered" data-setup='{"fluid": true}' playsinline=""
                           webkit-playsinline="" preload="true" controls>
                      <source src="https://player.vimeo.com/external/417499289.hd.mp4?s=84efe0c22ebaf8b65891c156d3a45246d28d76a9&profile_id=175" type="video/mp4">
                    </video>
                  </client-only>
                </div>
              </div>
              <div class="txt_area">
                <p>베란다를 확장하여 샤시 시공을 베란다를 확장하여 샤시 시공을 다시 하고, 확장 부위에 등박스를 확대 시공하여 LED 스퀘어형 조명으로 교체하였습니다.</p>
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
          <!-- 0614 하단 컴포넌트 수정 -->
          <div class="recommend_ls">
            <SlideItemList :slideLoop="false" :moveGroup="3" slideName="recommend_slide" :itemCol="3" :itemData="relateItemData" :isScrap="true" :itemInfo="true">
              <template v-slot:title>
                <h3 class="ttl">#이런 스타일은 어떠세요?</h3>
              </template>
            </SlideItemList>
          </div>
          <!-- 0614 하단 컴포넌트 수정 -->
          <div class="similar_ls">
            <SlideItemList :slideLoop="false" :moveGroup="3" slideName="similar_slide" :itemCol="3" :itemInfo="true"
                           :itemData="similarItemData" :isScrap="true">
              <template v-slot:title>
                <h3 class="ttl">유사한 집 보기</h3>
              </template>
            </SlideItemList>
          </div>
          <div class="banner_area">
            <FullBanner slideBtnName :bannerItems="bannerData" arwType=""/>
          </div>
        </div>
        <aside class="lnb_wrap">
          <FloatingBar :thisPostScrap = 'thisPostScrap' :relateItemData="relatedPinProductData" :commentData="commentData"/>
        </aside>
      </div>
    </div>
  </v-app>

</template>

<script>

import PinImg from "~/components/common/PinImg";
import Comment from "~/components/common/Comment";
import ItemList from "~/components/common/ItemList";
import FullBanner from "~/components/common/FullBanner";
import StyleList from "~/components/styling/StyleList";
import SlideItemList from "~/components/common/SlideItemList";
import FloatingBar from "~/components/common/FloatingBar";
import API from "~/fetchSheets";
export default {
  name: "expert-detail",
  layout:'default_interior',
  components: {
    FloatingBar,
    StyleList,
    FullBanner,
    PinImg,
    Comment,
    ItemList,
    SlideItemList,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "styling_page",
      detailPageTitle : this.pageTitle,
    });
  },
  data() {
    return {
      pageTitle : "골드 액세서리로 포인트를 더한 주방의 새로운 변신",
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
      myScrapData: ["01"],
      colorChip:[
        {
          colorName:'brown',
          value:'#835827',
        }, {
          colorName:'beige',
          value:'#EAE1CC',
        },{
          colorName:'black',
          value:'#212121',
        },
      ],
      swiperOptions:{
        loop: this.slideLoop,
        pagination: {
          el: ".swiper_pagination",
          clickable: true,
        },
      },
      swiperSlideItems:[{
        img : '/img/styling/@_expert_after.png'
      },{
        img : '/img/styling/@_expert_after.png'
      },{
        img : '/img/styling/@_expert_after.png'
      },{
        img : '/img/styling/@_expert_after.png'
      }],
      relateItemData: [
        {
          itemID: "01",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral01.png",
          link: "/",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "02",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral02.png",
          link: "/",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "03",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral03.png",
          link: "/",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "04",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_recomend01.png",
          link: "/",
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
          link: "/",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "06",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral02.png",
          link: "/",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "07",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_simiral03.png",
          link: "/",
          itemInfo: {
            scrap: "1,013",
            view: "387",
          },
        }, {
          itemID: "08",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          img: "/img/styling/@_myhome_recomend01.png",
          link: "/",
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
        consulting: "16",
        reply: 15,
      },
      colorPick: ["#A27855", "#C9BCB6", "#212121"],
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
          link: "/styling/myhome",
          locationY: "70",
          locationX: "35",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
        {
          itemID: 107,
          img: "/img/styling/@_door_thumb05.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/publish/pc/styling/myhome",
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
            seq: 1,
            name: "지니지니",
            content: "아주 따뜻해보이고 편안한 분위기가 느껴지네요!",
            update: "12시간 전",
            mine: true,
          },
          {
            id: 2,
            seq: 1,
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
      resData: {},
    };
  },
  methods: {
    async getMainData(_seq) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_MYHOME_ONE_BY_SEQ.path,
            method: API.INTERIOR_MYHOME_ONE_BY_SEQ.method,
            query: { seq: _seq },
          }
        });
        let item = res.data.item;
        delete Object.assign(item, {["itemID"]: item["id"] })["id"];
        item.badges = ["new"];
        item.img = "/img/styling/@_item_thumb_01.png";
        delete Object.assign(item, {["title"]: item["subject"] })["subject"];
        delete Object.assign(item, {["writer"]: { ["name"]: item["creUser"] }})["creUser"];
        item.writer.profile = "/img/styling/@_profile_01.png";
        delete Object.assign(item, {["tags"]: item["hashtag"] })["hashtag"];
        Object.assign(item, {["itemInfo"]: {
            ["scrap"]: item["scrapCnt"],
            ["comment"]: item["replyCnt"],
            ["view"]: item["readCnt"]
          }});
        delete item["scrapCnt"];
        delete item["replyCnt"];
        delete item["readCnt"];

        this.resData = item;
      } catch (e) {
        console.log(e)
      }
    },
    // async getComent(queryData = { page: 1, size: 10, decoMyHomeSeq: 1}) {
    //   try {
    //     const res = await this.$nuxt.$fetch({
    //       api: {
    //         path: API.INTERIOR_MYHOME_COMMENT.path,
    //         method: API.INTERIOR_MYHOME_COMMENT.method,
    //         query: queryData,
    //       }
    //     });
    //     let newItems = res.data.items;
    //     newItems.forEach(function(item) {
    //       delete Object.assign(item, {["name"]: item["creUser"] })["creUser"];
    //       delete Object.assign(item, {["content"]: item["reply"] })["reply"];
    //       delete Object.assign(item, {["update"]: item["creDate"] })["creDate"];
    //       delete Object.assign(item, {["mine"]: item["reportYn"] === null })["reportYn"];
    //     });
    //     // this.commentData.comments = newItems;
    //     // console.log("getComent");
    //     // console.log(this.commentData.comments);
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
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
    progressBar(){
      let currentBar = document.querySelector('.progress_bar span.current')
      let detailHeadHeight = document.querySelector('.detail_head .visual_wrap').clientHeight
      let footerHeight = document.querySelector('#footer').clientHeight
      let contents = document.querySelector('#contents')
      let contentsH = contents.clientHeight
      let winH = window.innerHeight
      let st
      let percent = 1
      let progress
      let base
      window.addEventListener('scroll',function(){
        st = window.pageYOffset;
        progress = st-detailHeadHeight
        base = contentsH-winH-100-footerHeight
        if(progress<0){
          progress=0
        }
        percent = (progress/base)*100
        currentBar.style.width = percent + '%'
      })
    }
  },
  async mounted() {
    await this.$nextTick();
    this.progressBar();
    this.getMainData(this.$route.params.seq);
    // console.log(this.$route.params);
    // this.getComent();
  },
};
</script>

<style scoped>

</style>