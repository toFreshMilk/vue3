<template>
  <article class="divider_cnt">
    <div class="page_head zin_head">
      <div class="ttl_group">
        <div class="ttl_area">
          <h2 class="ttl">제품검색</h2>
          <p>Z:IN에 구성된 제품들을 검색하실 수 있습니다.</p>
        </div>
      </div>
    </div>
    <div class="page_body zin_body">
      <!-- 카테고리 표시 영역 -->
      <div class="zin_sec category_sec">
        <ZinSearchCate :category="currentCategory" :is_cateMode="is_cateMode" @switchCateMode="switchCateMode" @reloadFilter="reloadFilter" />
      </div>
      <!-- 필터 표시 영역 및 검색버튼 -->
      <section v-if="!is_cateMode" class="zin_sec filter_sec">
        <ZinListFilter :filtersData="filtersData" ref="zinListFilter" @searchList="searchList">
          <template v-slot:keywordField><!-- 키워드를 메인 페이지로 뺀 이유는 as-is에서 카테고리를 바꿔도 검색어가 유지 되었기 때문 -->
            <div class="input_area text hrz">
              <label for="keyword">검색어</label>
              <div class="input_box">
                <input v-model="keyword" type="search" id="keyword" placeholder="제품명/코드명 입력">
                <button v-if="keyword" @click.prevent="clearKeyword" type="button" class="reset_btn"><i class="ic ic_close_s"></i></button>
              </div>
            </div>
            <div class="btn_area taR">
              <button @click="reset" type="button" class="btn h_s w_s basic reset_btn" :disabled="filters.length < 1 && keyword.length < 1">초기화</button>
              <button @click="search" type="button" class="btn h_s w_s strong">검색</button>
            </div>
          </template>
        </ZinListFilter>
      </section>
      <section class="zin_sec styling_list_sec">
        <!-- 전체 건수 표시 및 정렬 -->
        <div v-if="listItemData" class="list_sec_head has_elem">
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
        <!-- 카테고리별 목록 -->
        <div class="list_sec_body">
          <SearchPatternList classAdd="style_list_wrap" :listItem="listItemData" :item-col="5" :total="total" />
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import ZinSearchCate from "~/components/product/ZinSearchCate";
import ZinListFilter from "~/components/product/ZinListFilter";
import SearchPatternList from "~/components/product/SearchPatternList";
import debounce from "lodash/debounce";

export default {
  layout: "productLNB",
  components: {
    ZinSearchCate,
    ZinListFilter,
    SearchPatternList,
  },
  data() {
    return {
      total: 0,
      currentCategory: '',
      is_cateMode: false, //카테고리 선택 창이 뜨는지 여부
      listItemData: [],
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
      hasFilter: false,
      filters: [],    //선택된 필터들
      keyword: '',      //검색어 텍스트
      filtersData: [],  //필터영역에 표시할 데이터
    };
  },
  created() {
    if (this.$route.query.category) {
      this.currentCategory = this.$route.query.category;
    }
    this.$nuxt.$emit("lnbHeader", {
      pageClass: "zin_page",
      mainClass: "zin_page list_page has_snb",
      showHeadImg: false,
    });
  },
  async fetch() {
    //필터 정보 조회
    if (this.currentCategory)
      await this.getFilterData();

    //제품검색결과 목록조회
    this.getProductList();
  },
  methods: {
    sort: function(val) {   //정렬
      this.currentSort = val;
      this.getProductList();
    },
    clearKeyword() {  //검색어 초기화
      this.keyword = "";
    },
    switchCateMode(flag){ //카테고리 선택창을 열것인지 닫을것인지
      this.is_cateMode = flag;
    },
    getProductList: debounce(async function () {   //제품목록 조회
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: '/svc/productSearchSvcApi/productSearchList',
            method: 'get',
          },
          query: {
            color:    this.getCheckedFilter('color'),    //색상
            pattern:  this.getCheckedFilter('pattern'),    //패턴
            purpose:  this.getCheckedFilter('purpose'),    //용도
            purpose2: this.getCheckedFilter('purpose2'),    //용도별
            feature:  this.getCheckedFilter('feature'),    //특장점
            material: this.getCheckedFilter('material'),    //소재별
            openCloseType: this.getCheckedFilter('openCloseType'),  //개폐방식별
            etc:      this.getCheckedFilter('etc'),       //기타
            woodType: this.getCheckedFilter('woodType'),       //우드타입
            searchKeyword: this.keyword,  //검색어
            category: this.currentCategory,     //카테고리
            sort: this.currentSort,       //정렬
          },
        });
        if (res.data.result !== "200") {
          throw Error(res.data.resultMessage);
        }

        const listData = this.$get(res, "data.items", []);
        this.listItemData = listData;

        //전체 갯수 합계
        this.total = this.listItemData.reduce((acc, category) => { 
          return acc + (category.groupCateItems ? category.groupCateItems.length : 0); 
        }, 0);

      } catch (e) {
        console.log(e);
      }
    }, 300),
    async getFilterData() {   //카테고리 필터 정보 조회
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: '/svc/productCategoryAtrbtSvcApi/categoryAtrbtMng',
            method: 'get',
          },
          query: {
            category: this.currentCategory,     //현재 선택된 카테고리번호
          },
        });
        if (res.data.result !== "200") {
          throw Error(res.data.resultMessage);
        }

        const listData = this.$get(res, "data.items", []);
        this.filtersData = listData;
      } catch (e) {
        console.log(e);
      }      
    },
    getCheckedFilter(group) {
      return this.filters.filter((f) => f.codeGroup === group).map((f) => f.code).join(',').toString();
    },
    reset() { //초기화
      this.clearKeyword();
      this.$refs.zinListFilter.resetFilter();
    },
    search() {  //검색. 필터 조건을 가져와야 하므로 component에 있는 fn호출
      this.$refs.zinListFilter.pushFilters();
    },
    reloadFilter(category) {//카테고리 선택시 해당 필터 정보 조회
      this.currentCategory = category;
      this.getFilterData();
      this.getProductList();
    },
    searchList(filters) { //선택된 필터를 받아 제품목록 조회
      this.filters = filters;
      this.getProductList();
    },
  },
  beforeDestroy() {

  },
};
</script>

<style scoped>

</style>