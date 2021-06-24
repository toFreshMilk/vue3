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
      <section class="zin_sec wallpaper_tab_sec" v-if="brandTabData && brandTabData.length > 0">
        <div class="part">
          <div class="tabs_wrap">
            <ZinDetailTabs :tabData="brandTabData" tabType="default" :setTab="brand" @setCurrentTab="setBrandTab" />
          </div>
        </div>
      </section>

      <!-- 2카테고리 소개 및 이미지 영역 -->
      <section class="zin_sec overview_sec" v-if="brandTabData && brandTabData.length > 0 && brandInfo">
        <div class="part product_info_part">
          <div class="ttl_group">
            <div class="ttl_area">
              <h3>{{ brandInfo.mainTitle }}</h3>
              <p><span v-html="brandInfo.subCopy"></span></p>
            </div>
          </div>
          <div class="info_group product_info_group">
            <div class="features_list">
              <span v-for="(features, i) in featuresData" :key="'features' + i" class="c_green">{{ features }}</span>
            </div>
            <div class="open_btn_list">
              <button class="btn open_modal" @click="openModal('productDetail')">제품소개 <i class="ic ic_plus_color"></i></button>
              <button class="btn open_modal" @click="openModal('productCase')">시공사례 <i class="ic ic_plus_color"></i></button>
            </div>
          </div>
        </div>
        <div class="part video_slist_part">
          <div class="video_slide_wrap">
            <div class="banner_area">
              <VideoSlide :bannerItems="bannerData" :hasPagination="true" arwType="white" />
              <!-- Dev : 슬라이드가 겹쳐서 그런지 다른 옵션이 적용되어 있는데 아래의 스와이프 기준으로 페이지네이션이 적용되고 있습니다. 확인부탁드립니다.  -->
            </div>
          </div>
        </div>
      </section>

      <!-- 1카테고리 배너 -->
      <section class="zin_sec overview_sec">
        <div class="part interior_part">
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
      </section>

      <!-- 검색 영역 -->
      <section class="zin_sec filter_sec">
        <ZinListFilter :filtersData="filtersData" :hasSearch="true" :hasBack="false" />
      </section>

      <!-- 검색 결과 영역 -->
      <section class="zin_sec zin_list_sec">
        <div v-if="listItemData !== null" class="list_sec_head has_elem">
          <div class="count_area">
            전체 <strong class="c_point3">{{ total }}</strong>개
          </div>
          <div class="list_setting_group">
            <div class="sort_area">
              <div v-for="(sortItem, i) in sortOpt" :key="'sort'+ i" class="sort_node"
                    :class="sortItem.value === currentSort ? 'is_active':''">
                <button @click="sort(sortItem.value)">{{ sortItem.label }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="list_sec_body">
          <SinglePatternList classAdd="single_item_wrap" :listItem="listItemData" :item-col="4" :showCompare="true" />
        </div>
      </section>
    </div>

    <div class="page_foot">
      <!-- 2카테고리 배너 -->
      <section class="zin_sec guide_banner_sec">
        <div class="grid grid_15">
          <div class="col col_4">
            <a href="http://www.lghausys.co.kr/rn/product/story/view.jsp?board_seq=30049" target="_blank" class="banner_item schedule">
              <span>벽지 시공 일정 가이드</span>
            </a>
          </div>
          <div class="col col_4">
            <a href="http://www.lghausys.co.kr/rn/product/story/view.jsp?board_seq=30105" target="_blank" class="banner_item compare">
              <span>셀프시공 vs 도배업체 시공</span>
            </a>
          </div>
          <div class="col col_4">
            <button class="banner_item awards" @click="openModal('awardsModal')">
              <span>수상 또는 인증</span>
            </button>
          </div>
        </div>
      </section>
      <section class="zin_sec full_banner_sec">
        <FullBanner slideName="product_bottom_banner" :bannerItems="promotionBannerData" :autoplay-delay="{delay:3000}" :bannerHeight="250" arwType="black" :hasPagination="false" />
      </section>
    </div>
    <ZinProductCompare v-if="myCompare.length > 1" :showModal="compareModal" :compareData="myCompare" @close="hideCompareModal" /> <!--  제품 비교  -->
    <ZinProduct ref="productDetail" />  <!--  제품 소개  -->
    <ZinProductCase ref="productCase" /> <!--  시공사례 : 목록  -->
    <ZinProductCaseDetail ref="productCaseDetail" />  <!--  시공사례 : 상세  -->
    <ZinAwards ref="awardsModal" />  <!--  수상  -->
  </article>
</template>

<script>
import ShareSns from "~/components/common/ShareSns";
import ZinTabs from "~/components/common/ZinTabs";
import FullBanner from "~/components/common/FullBanner";
import ZinDetailTabs from "~/components/product/ZinDetailTabs";
import VideoSlide from "~/components/product/VideoSlide";
import ZinListFilter from "~/components/product/ZinListFilter";
import SinglePatternList from "~/components/product/SinglePatternList";
import ZinProductCompare from "~/components/product/ZinProductCompare";
import ZinProduct from "~/components/product/ZinProduct";
import ZinProductCase from "~/components/product/ZinProductCase";
import ZinProductCaseDetail from "~/components/product/ZinProductCaseDetail";
import ZinAwards from "~/components/product/ZinAwards";
import setFixElem from "~/common/js/fixElem";

import filter from "lodash/filter";
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';
import has from 'lodash/has';

import { mapGetters } from "vuex";

export default {
  layout: "productLNB",
  components: {
    ShareSns,
    ZinTabs,
    FullBanner,
    ZinDetailTabs,
    VideoSlide,
    ZinListFilter,
    SinglePatternList,
    ZinProductCompare,
    ZinProduct,
    ZinProductCase,
    ZinProductCaseDetail,
    ZinAwards,
  },
  data() {
    return {
      superCategory: '',      //1카테고리
      category: '',           //2카테고리
      categoryInfo: {},       //2카테고리 정보
      brand: '',              //브랜드(3카테고리)
      brandInfo: {},          //브랜드 정보
      brandTabData: [],       //브랜드 탭 목록
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
      featuresData: [
        "리얼 패브릭 스타일", "리얼 패브릭 질감", "안정성",
      ],
      promotionBannerData:[
        {
          bannerLink: '#',
          img: '/img/store/@_banner_02.png',
        }, {
          bannerLink: '#',
          img: '/img/store/@_banner_02.png',
        },
      ],
      sortOpt: [
        {
          label: "제품코드순",
          value: "proCode",
        },
        {
          label: "베스트순",
          value: "best",
        },
        {
          label: "신제품순",
          value: "new",
        },
      ],
      currentSort: "proCode",
      filtersData: [],  //필터영역에 표시할 데이터
      listItemData: null,   //검색 결과
      myCompare: [],    //비교제품 목록

    };
  },
  created() {
    //1카테고리가 없거나 2카테고리가 없으면, 오류 발생
    this.superCategory = this.$route.params.category;
    this.category = this.$route.params.subCategory;

    if (!this.superCategory || !this.category) { //파라미터가 없는 경우
      this.$nuxt.error({ statusCode: 404, message: "잘못된 경로로 유입된 요청입니다." });
    }

    if (!isEmpty(this.superCategory)) {
      let dep1Category = this.findCategory(this.superCategory);
      if (!dep1Category || !has(dep1Category, 'subItems')) {      //1카테고리 또는 하위 카테고리가 존재하지 않으면
        this.$nuxt.error({ statusCode: 404, message: "잘못된 경로로 유입된 요청입니다." });
      }

      let dep2Category = head(filter(dep1Category.subItems, {'category': this.category}));
      if (!dep2Category) {  //2카테고리가 존재하지 않는다면
        this.$nuxt.error({ statusCode: 404, message: "잘못된 경로로 유입된 요청입니다." });
      }

      //하위 카테고리(브랜드) 탭정보 설정
      if (has(dep2Category, 'subItems')) {
        this.brandTabData = dep2Category.subItems;
      }
    }

    this.$nuxt.$emit("lnbHeader", {
      pageClass: "zin_page",
      mainClass: "zin_page wallpaper_page",
      showHeadImg: false,
      currentMenu: {
        category: {
          dep1: this.superCategory,
          dep2: this.category,
          dep3: '',
        },
        state: {
          dep1: true,
          dep2: true,  
          dep3: false,
        }
      }
    });

  },
  computed: {
    ...mapGetters("productCategory", ['findCategory']),
  },
  async fetch() {
    //2카테고리 기본정보 조회
    this.categoryInfo = await this.getCategoryInfo(this.category);
  },
  methods: {
    async setBrandTab(v) {     //sub category tab을 눌렀을 때
      //console.log("setBrandTab fn.", v);
      if (!v) { return; }
      this.brand = v;
      this.brandInfo = await this.getCategoryInfo(this.brand);
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
    showCompareModal(v) {
      this.compareModal = v;
    },
    hideCompareModal(v) {
      this.compareModal = v
    },
  },
  async mounted() {
    await this.$nextTick();
    window.addEventListener("scroll", function() {
      setFixElem(".wallpaper_page .lnb_wrap", "#zinfloatingBar");
    });
  },
}
</script>

<style scoped>

</style>