<template>
    <v-app id="container">
      <main id="contents" class="store_page list_page has_snb"
            :class="bottomBannerData !== null && bottomBannerData.length > 0 ? 'has_bottom_banner':''">
        <div class="mid_inner clearFix">
          <aside class="snb_sec divider_snb">
            <StoreSnb :currentCategory="currentCategory" :noneTitle="true">
              <template v-slot:title>
                <h4 class="ttl">카테고리</h4>
              </template>
            </StoreSnb>
          </aside>
          <article class="divider_cnt">
            <div class="page_head">
              <section class="zin_sec overview_sec">
                <div class="page_ttl_area ttl_area">
                  <h4 class="ttl">{{ currentCategory.name }}</h4>
                </div>
                <div class="part banner_part">
                  <FullBanner :bannerItems="bannerItemData" arwType="white" :hasPagination="true"/>
                </div>
                <div v-if="currentCategory.depth < 3 && mdItemData.length > 0" class="part item_part md_sec">
                  <SlideStoreItemList classAdd="store_list_wrap" :withTtlArw="true" :slideLoop="false" :itemData="mdItemData" :item-col="4" :slideName="'mdItem'">
                    <template v-slot:title>
                      <h4 class="ttl">MD 추천! 이 상품은 어떠세요?</h4>
                    </template>
                  </SlideStoreItemList>
                </div>
                <div v-if="currentCategory.depth < 3 && bestItemData.length > 0" class="part item_part best_sec">
                  <SlideStoreItemList classAdd="store_list_wrap" :withTtlArw="true" :slideLoop="false" :itemData="bestItemData" :item-col="4" :slideName="'bestItem'">
                    <template v-slot:title>
                      <h4 class="ttl"><span class="color_ttl c_point3">{{ currentCategory.name }}</span> 베스트 상품</h4>
                    </template>
                  </SlideStoreItemList>
                </div>
              </section>
            </div>
            <div class="page_body store_body">
              <section class="zin_sec filter_sec">
                <StoreListFilter :filtersData="filtersData" ref="storeListFilter" @searchList="onSearchList"/>
              </section>
              <section class="zin_sec store_list_sec">
                <div v-if="listItemData !== null && listItemData.length > 0" class="list_sec_head has_elem">
                  <div class="count_area">
                    전체 <strong class="c_point3">{{ total }}</strong>개 <!-- dev class 수정 0531 -->
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
                  <StoreItemList classAdd="store_list_wrap" :listItem="listItemData" :item-col="3" :totalCount="total" :currentNo="pageNo" :pageSize="pageSize" @changePage="onChangePage"/>
                </div>
              </section>
            </div>
          </article>
        </div>
        <div class="full_width_banner_sec" :style="`background-color: #E7EAEB`">
          <div class="mid_inner">
            <FullBanner :bannerItems="bottomBannerData" arwType="" :hasPagination="false" :bannerHeight="250" />
          </div>
        </div>
      </main>
    </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import StoreItemList from "~/components/store/StoreItemList";
import StoreListFilter from "~/components/store/StoreListFilter";
import FullBanner from "~/components/common/FullBanner";
import StoreSnb from "~/components/store/StoreSnb";
import SlideStoreItemList from "~/components/store/SlideStoreItemList"
import isEmpty from 'lodash/isEmpty';

export default {
  layout: "default",
  name: "store",
  components: {
    StoreSnb,
    StoreItemList,
    StoreListFilter,
    FullBanner,
    SlideStoreItemList,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "store_page",
    });
  },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 60,
      category: '',
      currentCategory: {},
      bottomBannerData: [
        {
          img: "/img/store/@_banner_02.png",
        },
        {
          img: "/img/store/@_banner_02.png",
        },
      ],
      bannerItemData: [
        {
          img: "/img/store/@_banner_01.png",
        },
        {
          img: "/img/store/@_banner_01.png",
        },
      ],
      mdItemData: [],
      bestItemData: [],
      listItemData: [],
      /*
      listItemData: [
        {
          itemID: 13,
          badges: ["new", "free"],
          img: "/img/store/@_thumb_03.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./item-detail",
          price: {
            default: 383900,
            discount: 20,
          },
          grade: 3.8,
          reviewCount: 1820,
          soldout: {
            state: true,
            value: '일시품절',
          },
        }
      ],
      */
      myScrapData: [1],
      //정렬순서(1:신상품순, 2:판매인기순, 3:낮은 가격순, 4:높은 가격순, 5: 상품후기순, 6: 평점순)
      sortOpt: [
        {
          label: "신상품순",
          value: "1",
        },
        {
          label: "판매인기순",
          value: "2",
        },
        {
          label: "낮은 가격순",
          value: "3",
        },
        {
          label: "높은 가격순",
          value: "4",
        },
        {
          label: "상품후기순",
          value: "5",
        },
        {
          label: "평점순",
          value: "6",
        },
      ],
      currentSort: "1",
      hasFilter: false,
      filtersData: [],
      /*
      filtersData: [
        {
          type: "checkbox",
          title: "카테고리",
          name: "category",
          opts: [
            {
              label: "의자",
              value: "chair",
            },
            {
              label: "리클라이너",
              value: "recliner",
            },
          ],
        },
      ],
      */
      filters: [],    //선택된 필터들
      keyword: '',    //검색어 텍스트
    };
  },
  computed: {
    ...mapGetters("storeCategory", ["getCategory", "getCategoryPath", "getFirstCategory"]),
  },
  async fetch() {
    
    // 카테고리 정보 조회
    this.category = this.$route.params.id;
    if (isEmpty(this.category)) {
      // 디폴트는 첫번째 카테고리
      this.getDefaultCategory();
    } else {
      this.currentCategory = this.getCategory(this.category);
    }

    // 디폴트는 첫번째 카테고리
    if (isEmpty(this.currentCategory.category)) {
      this.getDefaultCategory();
    }

    await this.getFilterData(); // 필터 정보 조회
    await this.getMdData();     // MD추천
    await this.getBestData();   // 베스트
    await this.getData();       // 상품목록
  },
  methods: {

    // 디폴트는 첫번째 카테고리
    getDefaultCategory() {
      this.currentCategory = this.getFirstCategory();
      this.category = this.currentCategory.category;
    },
    
    // 상품목록
    async getData() {

      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/productSvcApi/productList",
            method: 'get',
            query: {
              page: this.pageNo,
              size: this.pageSize,
              sort: this.currentSort,
              catgryCd: this.category,
              keyword: this.keyword,  //검색어
              prdCateAtrbt:    this.getCheckedFilter([
                'color', 
                'pattern', 
                'purpose', 
                'purpose2', 
                'feature', 
                'material', 
                'openCloseType', 
                'etc', 
                'woodType'
              ]), //색상, 패턴, 용도, 용도별, 특장점, 소재별, 개폐방식별, 기타, 우드타입
              subCatgryCd: this.getCheckedFilter(['subCatgryCd']), //하위카테고리
              /*
              color:    this.getCheckedFilter('color'),    //색상
              pattern:  this.getCheckedFilter('pattern'),    //패턴
              purpose:  this.getCheckedFilter('purpose'),    //용도
              purpose2: this.getCheckedFilter('purpose2'),    //용도별
              feature:  this.getCheckedFilter('feature'),    //특장점
              material: this.getCheckedFilter('material'),    //소재별
              openCloseType: this.getCheckedFilter('openCloseType'),  //개폐방식별
              etc:      this.getCheckedFilter('etc'),       //기타
              woodType: this.getCheckedFilter('woodType'),       //우드타입
              subCatgryCd: this.getCheckedFilter('subCatgryCd'), //하위카테고리
              */
            },
          },
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        const data = this.$get(res, "data.items", []);
        this.listItemData = [...data];

        this.total = this.$get(res, "data.totalCount", 0);

      } catch (e) {
        console.log(e);
      }
    },

    // MD추천
    async getMdData() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/productSvcApi/productList",
            method: 'get',
            query: {
              page: 1,
              size: 20,
              hotYn: 'Y',
              sort: 1,
              catgryCd: this.category
            },
          },
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        const data = this.$get(res, "data.items", []);
        this.mdItemData = [...data];
      } catch (e) {
        console.log(e);
      }
    },

    // 베스트
    async getBestData() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/productSvcApi/productList",
            method: 'get',
            query: {
              page: 1,
              size: 20,
              BestYn: 'Y',
              sort: 1,
              catgryCd: this.category
            },
          },
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        const data = this.$get(res, "data.items", []);
        this.bestItemData = [...data];
      } catch (e) {
        console.log(e);
      }
    },

    //카테고리 필터 정보 조회
    async getFilterData() { 
      try {

        this.filtersData = new Array();

        // 하위카테고리 필터 설정
        const cateFilter = {
          code: 'subCatgryCd',
          name: '카테고리',
        };
        let cateFilterList = new Array();
        this.currentCategory.subItems.forEach((item) => {
          cateFilterList.push({
            codeGroup: 'subCatgryCd',
            code: item.category,
            name: item.name,
          });
        });
        if (cateFilterList.length > 0) {
          this.filtersData.push({
            filterGroup: cateFilter,
            filterList: cateFilterList,
          });
        }

        // 카테고리별 필터 조회
        const res = await this.$nuxt.$fetch({
          api: {
            path: '/svc/productCategoryAtrbtSvcApi/categoryAtrbtMng',
            method: 'get',
          },
          query: {
            category: this.category,     //현재 선택된 카테고리번호
          },
        });
        if (res.data.result !== "200") {
          throw Error(res.data.resultMessage);
        }

        const listData = this.$get(res, "data.items", []);
        this.filtersData.push(...listData);

      } catch (e) {
        console.log(e);
      }
    },

    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async sort(val) {
      this.currentSort = val;
      this.pageNo = 1;
      await this.getData();
    },

    // 페이지이동
    async onChangePage(pageNo) {
      this.pageNo = pageNo;
      await this.getData();
    },

    // 필터에 의한 검색
    async onSearchList(filters, keyword) {
      this.filters = filters;
      this.keyword = keyword;
      
      // 상품목록 조회
      await this.getData();
    },

    getCheckedFilter(groupList) {
      //return this.filters.filter((f) => f.codeGroup === group).map((f) => f.code).join(',').toString();
      return this.filters.filter((f) => groupList.includes(f.codeGroup)).map((f) => f.codeGroup+'>'+f.code).join(',').toString();
    },
  },
  async mounted() {
    await this.$nextTick();
    // if (this.$refs.list_header.$refs.styling_filter.selChips.length > 0) this.hasFilter = true;
    window.addEventListener("scroll", this.scrollEvt);
  },
  beforeDestroy() {
    //window.removeEventListener("scroll", this.scrollEvt);
  },
};
</script>

<style scoped>

</style>