<template>
  <article class="divider_cnt flR">
    <div class="page_head wallpaper_head">
      <!-- 1카테고리 제목과 설명-->
      <div class="ttl_group">
        <div class="ttl_area">
          <h2 class="ttl">{{ categoryInfo.mainTitle }}</h2>
          <p><span v-html="categoryInfo.subCopy"></span></p>
        </div>
      </div>

      <!-- 공유 버튼그룹 -->
      <div class="btn_group">
        <div class="btn_wrap clearFix">
          <!-- 공유 -->
          <div class="share_btn_area btn_area flL">
            <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
              <i class="ic ic_share"></i>
            </div>
            <ShareSns appendClass="type_arw_bottom" />
          </div>
        </div>
      </div>
    </div>

    <div class="page_body wallpaper_body">
      <!-- 2카테고리 탭 영역 -->
      <section class="zin_sec wallpaper_tab_sec">
        <div class="part">
          <div class="tabs_wrap">
            <ZinDetailTabs :tabData="categoryTabData" tabType="default" :setTab="subCategory" @setCurrentTab="setCategoryTab" />
          </div>
        </div>
      </section>

      <!-- 2카테고리 소개 및 이미지 영역 -->
      <section class="zin_sec overview_sec" v-if="subCategoryInfo">
        <div class="part">
          <div class="ttl_group">
            <div class="ttl_area">
              <h3>{{ subCategoryInfo.mainTitle }}</h3>
              <p><span v-html="subCategoryInfo.subCopy"></span></p>
            </div>
            <div class="btn_area" v-if="category === 'A04'"><!-- 창호일 경우만 노출 -->
              <button type="button" class="btn w_m h_s basic"  @click="openModal('widowInfoModal')">
                <span>Z:IN 창호 소개</span>
              </button>
            </div>
          </div>
        </div>
        <div class="part">
          <div class="video_slide_wrap">
            <div class="banner_area">TODO 이미지/동영상 조회해서 보여주는것은 BO기획이 된 후에 가능.
              <VideoSlide slideBtnName :bannerItems="bannerData" :hasPagination="true" arwType="white" />
            </div>
          </div>
        </div>
      </section>

      <!-- 1카테고리 소개 영역 -->
      <section class="zin_sec overview_sec">

        <!-- 머무는 공간... 컨텐츠 -->
        <div class="part" style="margin-top: 70px;">
          <div class="level_wrap">
            <div class="ttl_group">
              <div class="ttl_area">
                <span>머무는 공간에서 움직이는 공간까지</span>
                <h2>Z:IN으로 생활의 수준이 바뀝니다.</h2>
              </div>
            </div>
            <ul class="clearFix">
              <li v-for="(item, idx) in levelData" :key="idx">
                  <span>{{ item.num }}</span>
                  <strong>{{ item.ttl }}</strong>
                  <p>{{ item.cont }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="part">
          <div class="btn_more_area">
            <button type="button" class="btn_more"><span>MORE</span></button>
            <i class="arw arw_bottom"></i>
          </div>
        </div>
        
        <div class="part">
          <div class="intro_brand_group">
            <h2>다양한 Z:IN 브랜드를 소개합니다.</h2>
            <div class="brand_intro_list">
              <ul class="clearFix">
                <li v-for="(item, idx) in brandIntroList" class="flL" :key="idx">
                  <p><span>{{ item.name }}</span><span>{{ item.name2 }}</span></p>
                  <strong>{{ item.type }}</strong>
                </li>
              </ul>
            </div>
            <!-- <div class="btn_area">
              <button type="button" class="btn w_m h_s basic">
                <span>소재별 벽지 종류 보기</span>
              </button>
            </div> -->
          </div>
        </div>

        <!--검색하기-->
        <div class="part">
          <div class="search_wrap">
            <div class="ttl_group">
              <div class="ttl_area">
                <h3>제품 검색</h3>
                <p>Z:IN의 다양한 제품을 검색해 보세요.</p>
              </div>
            </div>
            <div class="img_wrap">
              <img src="/img/zin/@_zin_search.png" alt="검색">
            </div>
            <div class="btn_area">
              <nuxt-link :to="`/product/search?category=` + category">
              <button type="button" class="btn w_m h_s basic c_blk">
                  <span>검색하기</span>
              </button>
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- 디지탈 카탈로그 -->
        <!-- <div class="part">
          <div class="catalog">
            <div class="ttl_group">
              <div class="ttl_area">
                  <h3>DIGITAL CATALOG</h3>
              </div>
            </div>
            <ul class="grid grid_10">
              <li v-for="(item, idx) in catalogData" class="col col_6" :key="idx">
                <a href="#" class="clearFix">
                  <div class="img_wrap flL">
                    <img :src="item.img" alt="">
                  </div>
                  <div class="txt_group flL">
                    <div class="ttl_area">
                      <span>{{ item.smalltitle }}</span>
                      <strong>{{ item.title }}</strong>
                    </div>
                    <div class="txt_area">
                      <p>{{ item.content }}</p>
                    </div>
                  </div>
                  <div class="btn_area">
                    <button class="btn btn_link"></button>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div> -->

        <!-- 1카테고리 배너 -->
        <div class="part">
          <div class="interior_wrap">
            <h3>인테리어, 어떻게 할지 고민되시죠!</h3>
            <ul class="clearFix">
              <li v-for="(item, idx) in interiorData" class="flL" :key="idx">
                <a :href="item.link" target="_blank">
                  <img :src="item.img" alt="">
                  <div class="txt_group">
                    <div class="txt_area">
                      <span>{{ item.stxt }}</span>
                      <h4>{{ item.txt }}</h4>
                    </div>
                    <div class="is_arw_group">
                      <i class="arw arw_right_m"></i>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 1카테고리 컨텐츠 영역 -->
        <div class="part" v-if="categoryInfo.tab1ShowYn === 'Y'">
          <div class="detail_img_wrap">
            <span v-html="categoryInfo.tab1Content"></span>
          </div>
        </div>

        <div class="part">
          <div class="detail_img_wrap">
              <img src="/img/zin/@_detail_01.png" alt="">
          </div>
        </div>
      </section>

      <!--시공사례-->
      <section class="zin_sec example_sec">
        <!-- tabs -->
        <div class="example_tab_wrap">
          <ZinTabs :tabData="examTabData" tabType="default" :setTab="currentExamTab" @setCurrentTab="setExamCurrentTab" />
        </div>
        <!-- 시공사례 목록 -->
        <div class="exam_list_sec">
          <div class="list_sec_body">
            <ExamList classAdd="style_list_wrap" 
                :listItem="examListData" 
                :item-col="4" 
                :examInfoShow="true"
                :badgeShow="false"
                :paginationShow="false" 
                listType="trend" 
            />
          </div>
        </div>
      </section>

      <!--연관상품-->
      <section class="zin_sec relate_sec">
        <div class="relate_sec_body">
          <div class="ttl_area sec_ttl_area">
              <h2 class="ttl">연관상품</h2>
          </div>
          <PatternList classAdd="style_list_wrap" 
              :listItem="relateItemData" 
              :item-col="4" 
              :max-items="8"
              :BrandNameShow="false" />
        </div>
      </section>
    </div>
    <ZinWindowsInfo ref="widowInfoModal" />
  </article>
</template>

<script>
import ShareSns from "~/components/common/ShareSns";
import ZinTabs from "~/components/common/ZinTabs";
import ZinDetailTabs from "~/components/product/ZinDetailTabs";
import ExamList from "~/components/product/ExamList";
import PatternList from "~/components/product/PatternList";
import VideoSlide from "~/components/product/VideoSlide";
import ZinWindowsInfo from "~/components/product/ZinWindowsInfo";
import setFixElem from "~/common/js/fixElem";

import filter from "lodash/filter";
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';

import { mapState, mapGetters } from "vuex";

export default {
  layout: "productLNB",
  components: {
    ShareSns,
    ZinTabs,
    ZinDetailTabs,
    ExamList,
    PatternList,
    VideoSlide,
    ZinWindowsInfo,
  },
  data() {
    return {
      category: '',           //선택된 1카테고리 번호
      categoryInfo: {},       //선택된 1카테고리 정보
      categoryTabData: [],        //하위 2카테고리 탭 목록
      subCategory: '',            //선택된 하위 2카테고리 번호
      subCategoryInfo: null,      //선택된 하위 2카테고리 정보
      thisPostScrap: false,
      examTabData: [          //시공사례 탭 목록
        {
          name: "제품 시공사례",
          val: "productExam",
          boardId: "16",
        },
        {
          name: "PPL 시공사례",
          val: "dramaExam",
          boardId: "5",
        },
      ],
      currentExamTab: '',     //선택된 시공사례 탭 name
      brandIntroList:[
        {
          name:"뮤럴",
          type:"전폭 벽지",
        },
        {
          name:"숨타일",
          type:"조습 벽지",
        },
        {
          name:"디아망",
          type:"프리미엄 벽지",
        },
        {
          name:"지아프레쉬",
          name2:"지아페브릭",
          type:"전폭 벽지",
        },
        {
          name:"베스띠",
          name2:"테라피",
          type:"전폭 벽지",
        },
        {
          name:"휘앙세",
          name2:"휘앙세 와이드",
          type:"전폭 벽지",
        },
      ],
      levelData: [
        {
          num: 1,
          ttl: "벽지 최초 품질 인증",
          cont: "유럽섬유제품 품질인증 1등급(Baby Class)을 획득 하였습니다.",
        },
        {
          num: 2,
          ttl: "친환경 소재의 선택",
          cont: "자연으로부터 얻은 친환경 소재를 사용합니다. ",
        },
        {
          num: 3,
          ttl: "안전한 벽지",
          cont: "프탈레이트 프리 가소제를 사용하여 유해물질 방출을 최소화 합니다.",
        },
        {
          num: 4,
          ttl: "글로벌 디자인 파워",
          cont: "감각적이고, 정교한 무늬로 글로벌 수준의 디자인을 선보입니다.",
        },
        {
          num: 5,
          ttl: "철저한 품질 관리",
          cont: "공인 기관은 물론 자체실험실을 통해 철저한 품질 관리를 시행합니다.",
        },
      ],
      catalogData: [
        {
          img: "/img/zin/@_thumb_catalog01.png",
          smalltitle: "바닥재",
          title: "엑스컴포트",
          content: "철거 없이 덧시공이 가능해 시간과 비용을 줄여주는 주거용 데코타일",
        },
        {
          img: "/img/zin/@_thumb_catalog02.png",
          smalltitle: "바닥재",
          title: "지아자연애",
          content: "감각적인 스타일로 트렌드를 선도하는 벽지",
        },
        {
          img: "/img/zin/@_thumb_catalog03.png",
          smalltitle: "바닥재",
          title: "지아마루 스타일",
          content: "다양한 디자인으로 트렌디한 공간을 연출하는 시트 바닥재",
        },
        {
          img: "/img/zin/@_thumb_catalog04.png",
          smalltitle: "바닥재",
          title: "안심매트",
          content: "실내 공간 활용도를 높여주는 회상의 방법 지인 데크",
        },
        {
          img: "/img/zin/@_thumb_catalog05.png",
          smalltitle: "바닥재",
          title: "지아사랑애",
          content: "철거 없이 덧시공이 가능해 시간과 비용을 줄여주는 주거용 데코타일 ",
        },
        {
          img: "/img/zin/@_thumb_catalog06.png",
          smalltitle: "바닥재",
          title: "우젠리얼이지",
          content: "다양한 디자인과 합리적인 가격의 주거용 데코타일",
        },
        {
          img: "/img/zin/@_thumb_catalog07.png",
          smalltitle: "바닥재",
          title: "하우스",
          content: "우리집 인테리어와 잘 어울리는 친환경 바닥매트",
        },
      ],
      interiorData: [
        {
          img: "/img/zin/@_thumb_interior01.png",
          txt: "디자인 트렌드",
          link: "http://www.lgzinsquare.com/lgkiosk.php?page=trend",
        },
        {
          img: "/img/zin/@_thumb_interior02.png",
          stxt: "좋은 자재 선택을 위한",
          txt: "알찬 정보",
          link: "http://www.lghausys.co.kr/rn/product/story/list.jsp",
        },
        {
          img: "/img/zin/@_thumb_interior03.png",
          stxt: "우리 집에 딱 맞는",
          txt: "제품 찾기",
          link: "http://www.lghausys.co.kr/rn/product/guide/wallpaper.jsp",
        },
        {
          img: "/img/zin/@_thumb_interior04.png",
          stxt: "효율적이고 감각적인",
          txt: "리모델링 도움말",
          link: "http://www.lghausys.co.kr/rn/product/remodel/list.jsp",
        },
      ],
      examListData: [],   //사례 목록
      relateItemData: [],   //연관상품 목록
      bannerData: [ //TODO BO 기획 확정 후 작업
        {
          img: "/img/zin/@_video_bg.png",
          video: "/img/zin/@_video_img.png",
        }, {
          img: "/img/zin/@_video_bg.png",
          video: "/img/zin/@_video_img.png",
        }, {
          img: "/img/zin/@_video_bg.png",
          video: "/img/zin/@_video_img.png",
        }, {
          img: "/img/zin/@_video_bg.png",
          video: "/img/zin/@_video_img.png",
        },
      ],
    };
  },
  created() {
    //카테고리번호=parameter로 들어오거나, 없다면 1depth 첫번째 카테고리
    let reqCategory = this.$route.params.category;

    if (!isEmpty(reqCategory)) { //파라미터로 들어온게 있다면 존재하는 카테고리인지 확인.
      let cate = this.findCategory(reqCategory);
      this.category = cate ? reqCategory : head(this.categoryList).category;  //존재하는 카테고리가 아니면, 첫번째 카테고리 설정
    } else {
      this.category = head(this.categoryList).category;
    } 

    this.$nuxt.$emit("lnbHeader", {
      pageClass: "zin_page",
      mainClass: "zin_page wallpaper_page",
      showHeadImg: true,
      currentMenu: {
        category: {
          dep1: this.category,
          dep2: '',
          dep3: ''
        },
        state: {
          dep1: true,
          dep2: true,  
          dep3: false,
        }
      }
    });

    //하위 카테고리 탭정보 조회, default 첫번째 하위 카테고리가 선택
    this.categoryTabData = this.findCategory(this.category).subItems;
  },
  computed: {
    ...mapGetters("productCategory", ['findCategory']),
    ...mapState({
      categoryList: (state) => state.productCategory.categoryList,
    }),
  },
  async fetch() {
    //카테고리 기본정보 조회
    this.categoryInfo = await this.getCategoryInfo(this.category);

    //연관상품 조회
    this.getRelateItemData();
  },
  methods: {
    async setCategoryTab(v) {     //sub category tab을 눌렀을 때
      this.subCategory = v;
      this.subCategoryInfo = await this.getCategoryInfo(this.subCategory);
    },
    async setExamCurrentTab(v) {  //시공사례 탭 눌렀을때
      this.currentExamTab = v;
      let examObj = head(filter(this.examTabData, {'name': this.currentExamTab}));
      this.examListData = await this.getExamList(examObj.boardId);
    },
    async getCategoryInfo(category) { //카테고리 상세정보 조회
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: '/svc/productCategorySvcApi/readCategory',
            method: 'get',
          },
          query: {
            category: category,     //현재 선택된 카테고리번호
          },
        });
        if (res.data.result !== "200") {
          throw Error(res.data.resultMessage);
        }

        return this.$get(res, "data.item", {});
      } catch (e) {
        console.log(e);
      }      
    },
    async getExamList(boardId) {  //시공사례 조회
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: '/svc/productArchitectureSvcApi/productArchitectureList',
            method: 'get',
          },
          query: {
            boardId: boardId,
            category: this.category,
            maxQty: 8,
          },
        });
        if (res.data.result !== "200") {
          throw Error(res.data.resultMessage);
        }

        return this.$get(res, "data.items", []);
      } catch (e) {
        console.log(e);
      }      
    },
    async getRelateItemData() { //연관상품 조회
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: '/svc/productCategorySvcApi/relatedCategory',
            method: 'get',
          },
          query: {
            category: this.category,
          },
        });
        if (res.data.result !== "200") {
          throw Error(res.data.resultMessage);
        }

        this.relateItemData = this.$get(res, "data.items", []);
      } catch (e) {
        console.log(e);
      }  
    },
    shareBtnToggle(e) { //공유버튼 토글
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
    openModal(name) {
      this.$nuxt.$emit('htmlOverHidden')
      this.$refs[name].showModal = true;
    },
  },
  async mounted() {
    await this.$nextTick();
    window.addEventListener('scroll', function () {
      setFixElem('.wallpaper_page .lnb_wrap', '#zinfloatingBar')
    })
  },
};
</script>

<style scoped>

</style>