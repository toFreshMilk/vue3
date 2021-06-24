<template>
  <v-app id="container">
    <div id="contents" class="myhome_page detail_page">
      <div class="detail_head">
        <div class="visual_wrap">
          <figure style="background-image:url(/img/styling/@_myhome_visual.png)" class="bg"></figure>
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
              <div class="img_area">
                <figure :style="`background-image:url(${writer.picUrl})`"></figure>
              </div>
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
                <div @click="deletePost" class="delete" role="button">삭제</div>
                <div class="delete" role="button">
                  <nuxt-link to="/styling/myhome/editor">수정</nuxt-link>
                </div>
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
                <dd>{{ this.houseType }}</dd>
              </dl>
              <dl class="label_txt">
                <dt>공간</dt>
                <dd>{{ this.space }}</dd>
              </dl>
              <dl class="label_txt">
                <dt>평형</dt>
                <dd>{{ this.homeSize }}</dd>
              </dl>
              <dl class="label_txt">
                <dt>예산</dt>
                <dd>{{ this.budget }}</dd>
              </dl>
              <dl class="label_txt">
                <dt>누구와</dt>
                <dd>{{ this.who }}</dd>
              </dl>
              <dl class="label_txt">
                <dt>스타일</dt>
                <dd>{{ this.style }}</dd>
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
                <dt>시공범위</dt>
                <dd>{{ this.range }}</dd>
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
                <h3 class="ttl">현관</h3>
              </div>
              <PinImg :pinItems="relatedPinProductData" pinImgUrl="/img/styling/@_myhome_door.png"/>
              <div class="txt_area">
                <p>
                  주방 바닥재 면적을 넓게 시공하면 기존보다 쾌적한 느낌의 조리 공간을 연출할 수 있습니다. 하우스 베실리우스 바닥재와 그레이 톤의 인테리어 필름을 입힌 주방가구로
                  바탕을 깔고 조명과 골드 액세서리로 포인트를 가미하면 꿈꾸던 주방이 현실이 됩니다.
                  주방가구 손잡이를 골드로 선택했다면 주방 창 손잡이는 망설임 없이 스쿼마 라인 골드 컬러로 맞춰주세요.
                </p>
              </div>
            </div>
            <div class="link_area">
              <a href="#" class="link_insta">
                <i class="ic ic_insta_c"></i> 인스타그램 바로가기
              </a>
              <a href="#" class="link_blog">
                <i class="ic ic_blog_c"></i> 블로그 바로가기
              </a>
            </div>
          </div>
        </section>
        <!--          api로 받아야 하는 영역인듯-->
        <section id="commentSec" class="comments_sec">
          <Comment commentParent="myhome" @setCommentArrayLength="setCommentArrayLength"/>
        </section>
      </div>

      <div class="detail_foot">
        <div class="min_inner">
          <div class="recommend_ls">
            <!-- 0614 : 하단 컴포넌트 수정 -->
           <SlideItemList :slideLoop="false" :moveGroup="3" slideName="recommend_slide" :itemCol="3" :itemData="relateItemData"
                          :isScrap="true" :itemInfo="true">
             <template v-slot:title>
               <h3 class="ttl">#이런 스타일은 어떠세요?</h3>
             </template>
           </SlideItemList>
          </div>
          <div class="similar_ls">
            <!-- 0614 : 하단 컴포넌트 수정 -->
           <SlideItemList :slideLoop="false" :moveGroup="3" slideName="similar_slide" :itemCol="3" :itemInfo="true"
                          :itemData="similarItemData" setTitle="" :isScrap="true">
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
          <FloatingBar :thisPostScrap = 'thisPostScrap' :relateItemData="relatedPinProductData" :commentDataLength="commentDataLength">
            <div slot-scope="{ ress }">
              <p>name : {{ ress }}</p>
            </div>
          </FloatingBar>
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
  name: "myhome-detail",
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
      pageTitle:'브라운 컬러의 오픈형 주방으로 더욱 넓고 화사해진 인테리어',
      hash: ["미니멀", "모던", "플랜테리어", "클래식", "공간스타일"],
      writer: {
        picUrl: "/img/styling/@_myhome_profile.png",
        name: "지니지니",
        date: "2021. 03. 01",
        scrap: "1,253",
        view: "3,054",
        reply: 15,
      },
      houseType: "",
      space: "",
      homeSize: "",
      budget: "",
      who: "",
      style: "",
      colorPick: ["#A27855", "#C9BCB6", "#212121"],
      range: "",

      thisPostScrap: false,
      currentShareItem : null,
      shareOpen: false,
      shareTopOpen: false,
      collectOpen: false,
      myScrapData: ["01"],

      commentDataLength: 0,

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
      relatedPinProductData: [
        {
          itemID: 101,
          img: "/img/styling/@_door_thumb01.png",
          itemLink: "#",
          type: "세타플러스",
          title: "FW 화이트 원형테이블 700x1000",
          link: "/publish/pc/styling/myhome",
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
          link: "/publish/pc/styling/myhome",
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
          link: "/publish/pc/styling/myhome",
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
          link: "/publish/pc/styling/myhome",
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
          link: "/publish/pc/styling/myhome",
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
          link: "/publish/pc/styling/myhome",
          locationY: "70",
          locationX: "35",
          priceBefore: "100,000",
          discount: "15",
          price: "94,800",
        },
      ],
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
      bannerData: [
        {
          img: "/img/styling/@_banner_evt01.png",
        }, {
          img: "/img/styling/@_banner_evt01.png",
        }, {
          img: "/img/styling/@_banner_evt01.png",
        },
      ],

      //없음;
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
        this.pageTitle = item.subject;
        this.hash = item.hashtag;
        this.writer.picUrl = "";
        this.writer.name = item.creUser;
        this.writer.date = item.creDate.split(' ')[0];
        this.writer.scrap = item.scrapCnt;
        this.writer.view = item.readCnt;
        this.writer.reply = item.replyCnt;
        this.houseType = item.homeType.label;
        this.space = item.space.map(o => o.label).join(', ');
        this.homeSize = item.homeSize.label;
        this.budget = item.budget;
        this.who = item.who.map(o => o.label).join(', ');
        this.style = item.style.map(o => o.label).join(', ');
        // this.colorPick = item.colorPick.map(o => o.value);
        this.range = item.range.label;

        // console.log("this.resData")
        // console.log(item)
      } catch (e) {
        console.log(e)
      }
    },
    async deletePost() {
      try {
        await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_MYHOME_REMOVE_MY_POST.path,
            method: API.INTERIOR_MYHOME_REMOVE_MY_POST.method,
            query: { seq: this.$route.params.seq },
          }
        });
      } catch (e) {
        console.log(e)
      }
    },
    shareBtnToggle(e) {
      let shareBtn = document.querySelectorAll('.share_btn.open_btn')
      let shareWraps = document.querySelectorAll('.share_item_wrap')
      let shareBtnArea = e.currentTarget.closest('.share_btn_area')
      let shareWrap = shareBtnArea.querySelector('.share_item_wrap')
      shareWraps.forEach((e) => e.classList.remove('is_active'))
      if(this.currentShareItem == e.currentTarget){
        shareWrap.classList.remove('is_active')
        this.currentShareItem = null
      }else{
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
    },
    setCommentArrayLength(_length = 0){
      this.commentDataLength = _length;
    },
  },
  async mounted() {
    await this.$nextTick();
    this.progressBar();
    this.getMainData(this.$route.params.seq);
  },
};
</script>

<style scoped>

</style>