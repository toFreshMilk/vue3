<template>
  <div id="wrapper">
    <Header pageClass="zin_page styling_page"/>
    <v-app id="container">
      <main id="contents" class="styling_page guide_page">
        <div class="mid_inner clearFix">
          <div class="page_head guide_head has_snb flL">
            <section class="styling_sec ttl_sec">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h4 class="ttl">노하우</h4>
                </div>
              </div>
            </section>
            <aside class="snb_sec">
              <StoreSnb :currentMenu="currentMenu" :menuData="snb" />
            </aside>
          </div>
          <div class="page_body guide_body flR">
            <section class="styling_sec ttl_sec">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h2 class="ttl">인테리어 A to Z</h2>
                  <p>제품마다 스며있는 프리미엄 하우징 브랜드 Z:IN의 긴:생각, 긴:이야기</p>
                </div>
              </div>
            </section>
            <section class="styling_sec guide_list_sec">
              <div class="part">
                <div class="tabs_wrap">
                  <ZinTabs :tabData="tabData" tabType="default" setTab="벽지선택 가이드" @setCurrentTab="setCurrentTab" />
                </div>
                <div class="list_search_wrap taC">
                  <ListSearchInput>
                    <template v-slot:select>
                      <ZinSelectItem :selectData="selectData" @selVal="selVal" setValue="전체" :inline="true" />
                    </template>
                  </ListSearchInput>
                </div>
              </div>
              <div class="part">
                <div v-if="listItemData !== null" class="list_sec_head has_elem">
                  <div class="count_area">
                    전체 <strong class="c_point3">{{ listItemData.length }}</strong>개 <!-- dev class 수정 0531 -->
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
                <div class="list_sec_body list_type_body" >
<!--                  <ListType classAdd="list_type_wrap" :listTypeItem="listItemData" :max-items="5" />-->
                  <ul>
                    <li v-for="item in listItemData" class="clearFix">
                        <div class="img_wrap flL">
                          <a href="#">
                          <img :src="item.img" alt="">
                          </a>
                        </div>
                        <div class="txt_group flL">
                          <a href="#">
                          <div class="tlt_area">
                            <h5>{{ item.title }}</h5>
                            <p>{{ item.cnt }}</p>
                          </div>
                          <div class="info_area">
                            <span class="date">{{ item.writingDate}}</span>
                            <span class="view">조회{{ item.itemInfo.view}}</span>
                          </div>
                          </a>
                        </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import StoreSnb from "~/components/store/StoreSnb";
import ZinTabs from "~/components/common/ZinTabs";
import SlideItemList from "~/components/common/SlideItemList";
//import ZinList from "~/components/zin/ZinList";
import ZinSelectItem from "~/components/common/ZinSelectItem";
import ListSearchInput from "~/components/common/ListSearchInput";
import ListType from "~/components/styling/ListType";

export default {
  name: "guide",
  components: {
    ListSearchInput,
    Header,
    Footer,
    StoreSnb,
    SlideItemList,
    // ListType,
    ZinTabs,
    // ZinList,
    ZinSelectItem,
  },
  data(){
    return {
      total: 0,
      selectData: [
        {
          text: '전체',
          value: 'all',
        },
        {
          text: '제목',
          value: 'title',
        },
        {
          text: '내용',
          value: 'content',
        },
      ],
      tabData: [
        {
          name: '벽지선택 가이드',
          val: 'wallpaper',
        },
        {
          name: '바닥재선택 가이드',
          val: 'tile',
        },
        {
          name: '창호선택 가이드',
          val: 'frame',
        },
        {
          name: '리모델링 가이드',
          val: 'remodeling',
        },
      ],
      listItemData: [
        {
          itemID: 12,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_01.png",
          title: "컬러가 돋보이는 벽면 연출법",
          cnt:"벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. 벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: '2021.05.01',
          itemInfo: {
            scrap: 100,
            comment: 20,
            view: 387,
          },

        }, {
          itemID: 111,
          badges: null,
          img: "/img/styling/@_guide_thumb_02.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          cnt:"벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. 벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: '2021.04.19',
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 3,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_03.png",
          title: "벽지 시공 일정짜기",
          cnt:"벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. 벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: '2021.04.19',
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 4,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_04.png",
          title: "벽지 셀프 시공을 위한 가이드",
          cnt:"벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. 벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          writingDate: '2021.04.19',
          link: "./detail",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        },
        {
          itemID: 5,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_05.png",
          title: "똑똑한 소비자로 거듭나기, 호갱이 되지 않는 법",
          cnt:"벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. 벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. 소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          writingDate: '2021.04.19',
          link: "./detail",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        },
      ],
      myScrapData: [1],
      sortOpt: [
        {
          label: "등록일순",
          value: "latest",
        },
        {
          label: "조회순",
          value: "view",
        },
      ],
      currentSort: "latest",
      hasFilter: false,
      filtersData: [
        {
          type: "radio",
          title: "주거형태",
          name: "type",
          opts: [
            {
              label: "원룸/오피스텔",
              value: "1room",
            },
            {
              label: "아파트",
              value: "apt",
            },
            {
              label: "빌라/연립",
              value: "villa",
            },
            {
              label: "단독주택",
              value: "house",
            },
            {
              label: "사무공간",
              value: "office",
            },
            {
              label: "상업공간",
              value: "store",
            },
            {
              label: "기타",
              value: "etc",
            },
          ],
        },
        {
          type: "checkbox",
          title: "공간",
          name: "area",
          opts: [
            {
              label: "홈인테리어",
              value: "home-interior",
            },
            {
              label: "거실",
              value: "living",
            },
            {
              label: "침실",
              value: "bed",
            },
            {
              label: "서재",
              value: "book",
            },
            {
              label: "자녀방",
              value: "kid",
            },
            {
              label: "드레스룸",
              value: "dress",
            },
            {
              label: "주방",
              value: "kitchen",
            },
            {
              label: "욕실",
              value: "bath",
            },
            {
              label: "원룸",
              value: "room",
            },
            {
              label: "기타",
              value: "etc",
            },
          ],
        },
        {
          type: "checkbox",
          title: "평형",
          name: "size",
          opts: [
            {
              label: "20평형 이하",
              value: "20under",
            },
            {
              label: "20평형",
              value: "20",
            },
            {
              label: "30평형",
              value: "30",
            },
            {
              label: "40평형",
              value: "40",
            },
            {
              label: "50평형 이상",
              value: "50over",
            },
          ],
        },
        {
          type: "checkbox",
          title: "누구와",
          name: "with",
          opts: [
            {
              label: "싱글",
              value: "single",
            },
            {
              label: "신혼부부",
              value: "couple",
            },
            {
              label: "아이와",
              value: "kids",
            },
            {
              label: "부모님과",
              value: "parents",
            },
            {
              label: "동료와",
              value: "partners",
            },
            {
              label: "반려동물과",
              value: "pets",
            },
            {
              label: "기타",
              value: "etc",
            },
          ],
        },
        {
          type: "checkbox",
          title: "스타일",
          name: "style",
          opts: [
            {
              label: "모던",
              value: "modern",
            },
            {
              label: "클래식",
              value: "classic",
            },
            {
              label: "내추럴",
              value: "natural",
            },
          ],
        },
        {
          type: "checkbox",
          title: "예산",
          name: "price",
          opts: [
            {
              label: "~100만원 이하",
              value: "10000000",
            },
            {
              label: "~300만원 이하",
              value: "3000000",
            },
            {
              label: "~500만원 이하",
              value: "5000000",
            },
            {
              label: "~1천만원 이하",
              value: "10000000",
            },
            {
              label: "~2천만원 이하",
              value: "20000000",
            },
            {
              label: "~3천만원 이하",
              value: "30000000",
            },
            {
              label: "~3천만원 이상",
              value: "30000000over",
            },
          ],
        },
        {
          type: "radio",
          title: "작업자",
          name: "worker",
          opts: [
            {
              label: "셀프 DIY",
              value: "DIY",
            },
            {
              label: "반셀프",
              value: "반셀프",
            },
            {
              label: "전문가",
              value: "pro",
            },
          ],
        },
        {
          type: "radio",
          title: "범위",
          name: "range",
          opts: [
            {
              label: "리모델링",
              value: "remodeling",
            },
            {
              label: "부분 리모델링",
              value: "partial-remodeling",
            },
            {
              label: "홈스타일링",
              value: "home-styling",
            },
            {
              label: "건축",
              value: "construct",
            },
          ],
        },
      ],
      searchType: 'all',
      currentTab: '벽지선택 가이드',
      snb: [
        {
          name: "스타일링 트렌드",
          link: "/store/category/",
        },
        {
          name: "인테리어 A to Z",
          link: "/store/category/",
        },
        {
          name: "생활단편집",
          link: "/store/category/",
        },
        {
          name: "Design Portal",
          link: "/store/category/",
        },
      ],
      currentMenu: {
        name: {
          dep1: "",
          dep2: "",
          dep3: "",
          dep4: "",
        },
        state: {
          dep1: false,
          dep2: false,
          dep3: false,
          dep4: false,
        },
      },
    };
  },
  methods: {
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    sort: function(val) {
      this.currentSort = val;
    },
    setCate() {
      let current = false;
      this.snb.forEach(v => {
        if (v.link === this.$router.currentRoute.fullPath) {
          this.currentMenu.name.dep1 = v.name;
          this.currentMenu.state.dep1 = true;
          return current = true;
        }
        if (current) return;
        if(v.dep2 !== null && v.dep2.length > 0) v.dep2.forEach(v1 => {
          if (v1.link === this.$router.currentRoute.fullPath) {
            this.currentMenu.name.dep1 = v.name;
            this.currentMenu.state.dep1 = true;
            this.currentMenu.name.dep2 = v1.name;
            this.currentMenu.state.dep2 = true;
            return current = true;
          }
          if (current) return;
          if(v1.dep3 !== null && v1.dep3.length > 0) v1.dep3.forEach(v2 => {
            if (v2.link === this.$router.currentRoute.fullPath) {
              this.currentMenu.name.dep1 = v.name;
              this.currentMenu.state.dep1 = true;
              this.currentMenu.name.dep2 = v1.name;
              this.currentMenu.state.dep2 = true;
              this.currentMenu.name.dep3 = v2.name;
              this.currentMenu.state.dep3 = true;
              return current = true;
            }
          });
        });
        if (current) return;
      });
    },
  },
}
</script>

<style scoped>

</style>