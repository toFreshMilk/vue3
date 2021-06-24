<template>
  <v-app id="container">
    <main id="contents" class="store_page best_page">
      <div class="mid_inner clearFix">
        <div class="page_head best_head">
          <section class="best_head_sec">
            <h1>베스트</h1>
          </section>
        </div>
        <div class="page_body store_body">
          <section class="cate_tabs_sec">
            <div class="cate_tabs_wrap">
              <zin-detail-tabs :tabData="cateTabData" tabType="default" setTab="category" @setCurrentTab="currentCateEvt" />
            </div>
          </section>
          <section class="zin_sec filter_sec best_cate_tab_wrap">
            <store-tabs :tabData="cataTabList" tabType="default" setTab="전체" @setCurrentTab="currentCategoryTabEvt"/>
            <div class="txt_area">
              <span>{{$moment(currentTime).format("YYYY.MM.DD HH:mm")}} 기준</span>
            </div>
          </section>
          <section class="list_body_sec">
            <div class="list_sec_body">
              <store-item-list lassAdd="store_list_wrap" :listItem="itemData" :item-col="5" :showPaging="isPaging"/>
            </div>
          </section>
        </div>
      </div>
    </main>
  </v-app>
</template>

<script>
import API from "@/fetchSheets";
import StoreItemList from "~/components/store/StoreItemList";
import ZinDetailTabs from "~/components/product/ZinDetailTabs";
import StoreTabs from '~/components/store/StoreTabs.vue';

export default {
  layout: "default",
  name: "best",
  components: {
    ZinDetailTabs,
    StoreTabs,
    StoreItemList,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "store_page",
    });
  },
  data() {
    return {
      total: 0,
      currentTime: "",
      isPaging: false,
      currentCate: '카테고리',
      currentCategoryTab: '전체',
      currentRemodelTab: '전체',
      //리스트 데이터
      itemData: [],
      //베스트 cate 목록
      cateTabData: [
        {
          name: "카테고리",
          category: "category",
        },
        // {
        //   name: "리모델링",
        //   category: "remo",
        // },
      ],
      //서브 tab 목록
      cataTabList: [],
      //"전체" 탭 정보
      cateTabAll: {
        category: "",
        name: "전체",
        sort: 1,
       },
      //스크랩 목록
      myScrapData: [1],
    };
  },
  async fetch() {
    //todo 카테고리별 코드값으로 추후 수정
    await this.getCategorys('category'); 
    await this.getListData('category');
  },
  methods: {
    currentCateEvt(v) {
      this.currentCate = v;
      this.getCategorys(this.currentCate);
      this.getListData(this.currentCate)
    },
    currentCategoryTabEvt(v) {
      this.currentCategoryTab = v;
      //todo 서브 탭을 바꿀 경우 데이터 리로드
      //this.getListData(this.currentCate, this.currentCategoryTab)
    },
    
    //get list data  (탭을 바꿀때 이벤트)
    async getListData(cate) {
      console.log("getListData Called [CATE = "+cate+" ]");
      try {
        let res;
        if (cate == 'category') { //카테고리 탭일 경우
          res = await this.$nuxt.$fetch({
            api: {
              path: API.STORE_BEST_LIST.path,
              method: API.STORE_BEST_LIST.method,
              query: {
                // page: 1,
                // size: 100,
                // bestYn: 'Y', // 베스트
                // sort: 2, //소팅 기준 변경 예정 (현재 판매인기순)
              },
            },
          });
        } else { //리모델링 탭일 경우
          res = await this.$nuxt.$fetch({
            api: {
              path: API.STORE_CATEGORY_LIST.path,
              method: API.STORE_CATEGORY_LIST.method,
              query: {
                // page: 1,
                // size: 100,
                // bestYn: 'Y', //베스트
                // sort: 2, //소팅 기준 변경 예정 (현재 판매인기순)
              },
            },
          });
        }

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        const data = this.$get(res, "data.items", []);
        this.itemData = [...data]; 
        this.currentTime = this.itemData.time;
      } catch (e) {
        console.log(e);
      }
    },

    //get 서브 tab (탭을 바꿀때 이벤트)
    async getCategorys(cate){
      console.log("getCategory Called [CATE = "+cate+" ]");
      try{
        let res;
        if (cate == 'category') {
          res = await this.$nuxt.$fetch({
            api: {
              path: API.STORE_CATEGORY_DEPTHS.path,
              method: API.STORE_CATEGORY_DEPTHS.method,
              query: {
                depth: '1',
              }
            }
          });
        } else {
          res = await this.$nuxt.$fetch({
            api: {
              //리모델링
              path: API.STORE_CATEGORY_DEPTHS.path,
              method: API.STORE_CATEGORY_DEPTHS.method,
              query: {
                depth: '1',
              }
            }
          });
        }

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        const data = this.$get(res, "data.items", []);
        this.cataTabList = [...data];
        this.cateTabAll.category = data[0].category; //전체 tab에도 category 값 부여 (불필요할 가능성 있음)
        this.cataTabList.unshift(this.cateTabAll);

      } catch(e) {
        console.log(e);
      }
    },

    //맨 위로
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  async mounted() {
    await this.$nextTick();
    window.addEventListener("scroll", this.scrollEvt);
  },
  beforeDestroy() {
    //window.removeEventListener("scroll", this.scrollEvt);
  },
};
</script>

<style scoped>

</style>