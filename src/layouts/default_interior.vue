<template>
  <div id="wrapper">
    <Header
      :pageClass="pageClass"
      :headerBanner="headerBanner"
      :detailPageTitle="detailPageTitle"
    />
     <Nuxt keep-alive :keep-alive-props="{ include: interiorPage }" />
    <Footer />
    <div class="snackbar_wrap"></div>
    <div class="modal_wrap"> </div>
  </div>
</template>
<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import API from "~/fetchSheets";
import { mapActions } from "vuex";
export default {
  components: {
    Header,
    Footer,
  },
  head: {
    title: "Lx Zin",
  },
  data() {
    return {
      interiorPage: ['myhome-list', 'expert-list'],
      detailPageTitle:null,
      pageClass: "",
      headerBanner: true,
      filtersData: [
        {
          type: "radio",
          title: "주거형태",
          name: "homeType",
          opts: [],
          // opts: [
          //   {
          //     label: "원룸/오피스텔",
          //     value: "1room",
          //   },
          //   {
          //     label: "아파트",
          //     value: "apt",
          //   },
          //   {
          //     label: "빌라/연립",
          //     value: "villa",
          //   },
          //   {
          //     label: "단독주택",
          //     value: "house",
          //   },
          //   {
          //     label: "사무공간",
          //     value: "office",
          //   },
          //   {
          //     label: "상업공간",
          //     value: "store",
          //   },
          //   {
          //     label: "기타",
          //     value: "etc",
          //   },
          // ],
        },
        {
          type: "checkbox",
          title: "시공공간",
          name: "space",
          opts: [],
          // opts: [
          //   {
          //     label: "홈인테리어",
          //     value: "home-interior",
          //   },
          //   {
          //     label: "거실",
          //     value: "living",
          //   },
          //   {
          //     label: "침실",
          //     value: "bed",
          //   },
          //   {
          //     label: "서재",
          //     value: "book",
          //   },
          //   {
          //     label: "자녀방",
          //     value: "kid",
          //   },
          //   {
          //     label: "드레스룸",
          //     value: "dress",
          //   },
          //   {
          //     label: "주방",
          //     value: "kitchen",
          //   },
          //   {
          //     label: "욕실",
          //     value: "bath",
          //   },
          //   {
          //     label: "원룸",
          //     value: "room",
          //   },
          //   {
          //     label: "기타",
          //     value: "etc",
          //   },
          // ],
        },
        {
          type: "checkbox",
          title: "평형",
          name: "homeSize",
          opts: [],
          // opts: [
          //   {
          //     label: "20평형 이하",
          //     value: "20under",
          //   },
          //   {
          //     label: "20평형",
          //     value: "20",
          //   },
          //   {
          //     label: "30평형",
          //     value: "30",
          //   },
          //   {
          //     label: "40평형",
          //     value: "40",
          //   },
          //   {
          //     label: "50평형 이상",
          //     value: "50over",
          //   },
          // ],
        },
        {
          type: "checkbox",
          title: "예산",
          name: "budget",
          // opts: [
          //   {
          //     label: "~100만원 이하",
          //     value: "10000000",
          //   },
          //   {
          //     label: "~300만원 이하",
          //     value: "3000000",
          //   },
          //   {
          //     label: "~500만원 이하",
          //     value: "5000000",
          //   },
          //   {
          //     label: "~1천만원 이하",
          //     value: "10000000",
          //   },
          //   {
          //     label: "~2천만원 이하",
          //     value: "20000000",
          //   },
          //   {
          //     label: "~3천만원 이하",
          //     value: "30000000",
          //   },
          //   {
          //     label: "~3천만원 이상",
          //     value: "30000000over",
          //   },
          // ],
          opts: [],
        },
        {
          type: "checkbox",
          title: "가족형태",
          name: "familyType",
          // opts: [
          //   {
          //     label: "싱글",
          //     value: "single",
          //   },
          //   {
          //     label: "신혼부부",
          //     value: "couple",
          //   },
          //   {
          //     label: "아이와",
          //     value: "kids",
          //   },
          //   {
          //     label: "부모님과",
          //     value: "parents",
          //   },
          //   {
          //     label: "동료와",
          //     value: "partners",
          //   },
          //   {
          //     label: "반려동물과",
          //     value: "pets",
          //   },
          //   {
          //     label: "기타",
          //     value: "etc",
          //   },
          // ],
          opts: [],
        },
        {
          type: "checkbox",
          title: "스타일",
          name: "style",
          // opts: [
          //   {
          //     label: "모던",
          //     value: "modern",
          //   },
          //   {
          //     label: "클래식",
          //     value: "classic",
          //   },
          //   {
          //     label: "내추럴",
          //     value: "natural",
          //   },
          // ],
          opts: [],
        },
        {
          type: "checkbox",
          title: "색상",
          name: "color",
          // opts: [
          //   {
          //     label: "흰색",
          //     value: "white",
          //   },
          //   {
          //     label: "블랙",
          //     value: "212121",
          //   },
          //   {
          //     label: "그레이",
          //     value: "DDDDDD",
          //   },
          //   {
          //     label: "레드",
          //     value: "D81D1D",
          //   },
          //   {
          //     label: "오렌지",
          //     value: "E39444",
          //   },
          //   {
          //     label: "옐로우",
          //     value: "FAEF63",
          //   },
          //   {
          //     label: "그린",
          //     value: "47862F",
          //   },
          //   {
          //     label: "스카이블루",
          //     value: "A8CBF5",
          //   },
          //   {
          //     label: "블루",
          //     value: "185DAD",
          //   },
          //   {
          //     label: "퍼플",
          //     value: "482A9B",
          //   },
          //   {
          //     label: "핑크",
          //     value: "E5589E",
          //   },
          //   {
          //     label: "버건디",
          //     value: "840808",
          //   },
          //   {
          //     label: "브라운",
          //     value: "713B14",
          //   },
          //   {
          //     label: "카키",
          //     value: "647141",
          //   },
          //   {
          //     label: "베이지",
          //     value: "E2DBCA",
          //   },
          //   {
          //     label: "골드",
          //     value: "gold",
          //   },
          //   {
          //     label: "실버",
          //     value: "silver",
          //   },
          // ],
          opts: [],
        },
        {
          type: "radio",
          title: "시공범위",
          name: "range",
          // opts: [
          //   {
          //     label: "리모델링",
          //     value: "remodeling",
          //   },
          //   {
          //     label: "부분 리모델링",
          //     value: "partial-remodeling",
          //   },
          //   {
          //     label: "홈스타일링",
          //     value: "home-styling",
          //   },
          //   {
          //     label: "건축",
          //     value: "construct",
          //   },
          // ],
          opts: [],
        },
      ],
    };
  },
  async fetch() {
    await this.getFilter('hometype'); //주거형태
    await this.getFilter('space'); //시공공간
    await this.getFilter('homeSize'); //평형
    await this.getFilter('budget'); //예산
    await this.getFilter('familyType'); //가족형태
    await this.getFilter('style'); //스타일
    await this.getFilter('color'); //색상
    await this.getFilter('range'); //시공범위
  },

  methods: {
    ...mapActions({
      SET_DEFAULT_FILTER: "interior/SET_DEFAULT_FILTER",
    }),
    async getFilter(cate) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.COMMON_CODE.path,
            method: API.COMMON_CODE.method,
            query: { codeGroup : cate }
          }
        });
        let _filterData = this.$get(res, "data.items", []);
        for ( const o of _filterData ) {
          this.filtersData.forEach(el => {
            if (el.title === o.codeGroup.label){
              el.opts.push({
                label : o.label,
                value : o.code,
                name : o.codeGroup.value,
                type : el.type
              });
            }
          })
        }
        this.SET_DEFAULT_FILTER(this.filtersData);
        // console.log("this.filtersData")
        // console.log(this.filtersData)
      } catch(e) {
        console.log(e);
      }
    },
  },
  created() {
    this.$nuxt.$on(
      "Header",
      ({
         detailPageTitle,
         pageClass,
         headerBanner,
       }) => {
        this.detailPageTitle = detailPageTitle;
        this.pageClass = pageClass || "";
        this.headerBanner = headerBanner === true;
      },
    );
  },
  async mounted() {
    await this.$nextTick();
  }
};
</script>