<template>
  <v-app id="container">
    <div id="contents" class="house_page detail_page">
      <div class="detail_head">
        <div class="detail_inner clearFix">
          <div class="info_wrap">
            <div class="info_group">
              <!-- <div class="house_type">{{resData.homeType.label}}</div> -->
              <div v-for="(data, i) in resData.homeSize" :key="'homeSize'+i">
                <div class="space">{{data.label}}</div>
              </div>
              <div v-for="(data, i) in resData.style" :key="'style'+i">
                <div class="style">{{data.label}}</div>
              </div>
            </div>
            <span class="date">{{$moment(resData.creDate).format("YYYY.MM.DD HH:mm")}}</span>
          </div>
          <div class="utility_wrap">
            <div class="btn_wrap">
              <div @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn type_w" role="button">
                <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
              </div>
              <!-- 스크랩 (로그인 필요) -->
              <!-- <div @click="doScrap()" class="scrap_btn type_w" role="button">
                <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
              </div> -->
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
      <!-- 내용 -->
      <div class="detail_body">
        <section class="content_sec">
          <div class="detail_inner">
            <div class="detail_frame">
              <!-- 이미지 핀 (api 필요) -->
              <PinImg :pinItems="relatedPinProductData" pinImgUrl="/img/styling/@_house_01.png"/>
              <div class="txt_area">
                <!-- 컨텐츠 내용 1번째 -->
                <p>{{resData.content}}</p>
              </div>
            </div>
            <div class="detail_frame">
              <div class="img_area">
                <img src="/img/styling/@_house_02.png" alt="">
                <!-- 이미지 -->
                <!-- <img :src="resData.photoPc" alt="photoPc"> -->
              </div>
              <div class="txt_area">
                <!-- <p>주방가구 손잡이를 골드로 선택했다면 주방 창 손잡이는 망설임 없이 스쿼마 라인 골드 컬러로 맞춰주세요.</p> -->
                <!-- 컨텐츠 내용 2번째 -->
                <p>{{resData.content}}</p>
              </div>
            </div>
            <!-- 헤쉬태그 -->
            <div class="hash_btn_group">
              <button v-for="item in hash" :key="'hashtag'+item"><span class="hash_item gray_type">{{ item }}</span></button>
            </div>
            <!-- 스크랩 (로그인 필요)-->
            <div class="scrap_area">
              <button @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn_w">
                <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
                <span class="total"> <b class="c_point3">{{resData.scrapCnt}}</b>명이 스크랩하고 있어요 </span>
              </button>

            </div>
          </div>
        </section>
        <section id="commentSec" class="comments_sec">
          <!-- <Comment :commentData="commentData" :commentParent="'house'"/> -->
          <Comment commentParent="house"/>
        </section>
      </div>
      <div class="detail_foot">
        <div class="min_inner">
          <div class="recommend_ls">
            <!-- api 필요 -->
            <SlideItemList :slideLoop="false" :moveGroup="3" slideName="recommend_slide" :itemCol="3" :itemData="relateItemData"
                           setTitle="#이런 스타일은 어떠세요?" :isScrap="true" :itemInfo="true">
              <template v-slot:title>
                <h3 class="ttl">#이런 스타일은 어떠세요?</h3>
              </template>
            </SlideItemList>
          </div>
          <div class="similar_ls">
            <!-- api 필요 -->
            <SlideItemList :slideLoop="false" :moveGroup="3" slideName="similar_slide" :itemCol="3" :itemInfo="true"
                           :itemData="similarItemData" setTitle="유사한 집 보기" :isScrap="true">
              <template v-slot:title>
                <h3 class="ttl">유사한 집 보기</h3>
              </template>
            </SlideItemList>
          </div>
          <div class="banner_area">
            <!-- api 필요 -->
            <FullBanner slideBtnName :bannerItems="bannerData" arwType=""/>
          </div>
        </div>
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
import API from '@/fetchSheets'

export default {
  name: "house-detail",
  layout:"detail_interior",
  components: {
    StyleList,
    FullBanner,
    Header,
    Footer,
    PinImg,
    Comment,
    ItemList,
    SlideItemList,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "house_page",
    });
  },
  data() {
    return {
      // 배너
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
      // 이런 스타일은 어떠세요?
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
      // 유사한 집 보기
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
      // hash: ["미니멀", "모던", "플랜테리어", "클래식", "공간스타일"],
      hash: [],
      //이미지 핀 좌표
      relatedPinProductData: [
        {
          itemID: 101,
          img: "/img/styling/@_house_thumb01.png",
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
          img: "/img/styling/@_house_thumb02.png",
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
          img: "/img/styling/@_house_thumb03.png",
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
          img: "/img/styling/@_house_thumb04.png",
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

      ],
      // 댓글
      commentData: {
        commentInput: "",
        // comments: [
        //   {
        //     id: 1,
        //     name: "지니지니",
        //     content: "아주 따뜻해보이고 편안한 분위기가 느껴지네요!",
        //     update: "12시간 전",
        //     mine: true,
        //   },
        //   {
        //     id: 2,
        //     name: "dayday",
        //     content: "집이 너무 예뻐요. 저희집도 다이닝 공간을 어떻게할지 고민이 정말 많았는데, 도움이 많이 되었네요. ^^\n" +
        //       "혹시 책상용 선반은 따로 제작하신 건지 알 수 있을까요~?",
        //     update: "19시간 전  ",
        //     mine: false,
        //   },
        //   {
        //     id: 3,
        //     name: "모죠",
        //     content: "세련 그 자체; 저 집이 내 집이었으면...",
        //     update: "2021.01.20",
        //     mine: false,
        //   },
        //   {
        //     id: 4,
        //     name: "셀프장인",
        //     content: "너무 아늑해 보여요~ 디자인 조화가 아름답네요.",
        //     update: "2021.01.14",
        //     mine: false,
        //   },
        //   {
        //     id: 5,
        //     name: "아네미네",
        //     content: "정말 모던하네요! 저희집 인테리어 할 때 참고 해야겠어요. 너무 예뻐요^^ ",
        //     update: "2021.01.14",
        //     mine: false,
        //   },
        // ],
        comments: [],
      },
      resData: {},
    };
  },
  async fetch() {
    await this.getMainData(this.$route.params.seq);
    // await this.getComment();
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
        // currentBar.style.width = percent + '%'
        // console.log(percent, contentsH + winH)
      })
    },
    getMainData: async function(_seq){
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_HOMECOMMING_LIST_ONE_BY_SEQ.path,
            method: API.INTERIOR_HOMECOMMING_LIST_ONE_BY_SEQ.method,
            query: { seq: _seq },
          }
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        this.resData = this.$get(res, "data.item", []);
        this.hash.push(this.resData.hashtag);
      } catch (e) {
        console.log(e)
      }
    },
    /*
    getComment: async function(queryData = { page: 1, size: 10, homecommingSeq: 1}) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_HOMECOMMING_COMMENT.path,
            method: API.INTERIOR_HOMECOMMING_COMMENT.method,
            query: queryData,
          }
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        let newItems = res.data.items;
        newItems.forEach(function(item) {
          delete Object.assign(item, {["name"]: item["creUser"] })["creUser"];
          delete Object.assign(item, {["content"]: item["reply"] })["reply"];
          delete Object.assign(item, {["update"]: item["creDate"] })["creDate"];
          delete Object.assign(item, {["mine"]: item["reportYn"] === null })["reportYn"];
        });

        this.commentData.comments = newItems;
      } catch (e) {
        console.log(e)
      }
    },
    */
    // 스크랩 - 미완
    async doScrap() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_HOMECOMMING_SCRAP.path,
            method: API.INTERIOR_HOMECOMMING_SCRAP.method,
            query: { seq: this.$nuxt._route.query.seq },
          }
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        // this.resData = res.data.item;
        // console.log(this.resData);
      } catch (e) {
        console.log(e)
      }
    },
  },
  async mounted() {
    await this.$nextTick();
    this.progressBar()
  },
};
</script>

<style scoped>

</style>