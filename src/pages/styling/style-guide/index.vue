<template>
  <v-app id="container">
    <main id="contents" class="styling_page guide_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <Snb currentCate="노하우" :currentMenu="currentMenu" :menuData="snb" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head styling_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">인테리어 A to Z</h2>
              </div>
            </div>
          </div>
          <div class="page_body guide_body flR">
            <section class="styling_sec guide_list_sec">
              <div class="part">
                <div class="tabs_wrap">
                  <ZinTabs :tabData="tabData" tabType="default" setTab="벽지선택 가이드" @setCurrentTab="setCurrentTab" />
                </div>
                <div class="list_search_wrap taC">
                  <ListSearchInput>
                    <template v-slot:select>
                      <ZinSelectItem :selectData="selectData" selectName="" @selVal="selVal" setValue="전체"
                                     :inline="true" />
                    </template>
                  </ListSearchInput>
                </div>
              </div>
              <div class="part">
                <div v-if="itemData !== null" class="list_sec_head has_elem">
                  <div class="count_area">
                    전체 <strong class="c_point3">{{ itemData.length }}</strong>개 <!-- dev class 수정 0531 -->
                  </div>
                  <div class="list_setting_group">
                    <div class="sort_area">
                      <div v-for="(sortItem, i) in sortOpt" :key="'sort'+ i" class="sort_node"
                           :class="sortItem.value === currentSort ? 'is_active':''">
                        <button @click="sort(sortItem.value)">{{ sortItem.label }}</button>
                      </div>
                    </div>
                    <div class="list_type_area">
                      <button @click="toggleType" class="btn btn_ic list_type ic_before" :class="listType"></button>
                    </div>
                  </div>
                </div>
                <div class="list_sec_body">
                  <TileType v-if="listType === 'tile'" classAdd="fame_style_wrap" :listItem="itemData"
                            :item-col="5" :showMoreBtn="true" :paginationShow="false" />
                  <ListType v-if="listType === 'list'" classAdd="fame_style_wrap" :listItem="itemData"
                            :showMoreBtn="true" :paginationShow="false" />
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import Snb from "~/components/common/Snb";
import ZinTabs from "~/components/common/ZinTabs";
import SlideItemList from "~/components/common/SlideItemList";
import ZinSelectItem from "~/components/common/ZinSelectItem";
import ListSearchInput from "~/components/common/ListSearchInput";
import TileType from "~/components/styling/TileType";
import ListType from "~/components/styling/ListType";

export default {
  layout: "default_interior",
  name: "guide",
  components: {
    ListSearchInput,
    Snb,
    SlideItemList,
    // ZinList,
    ZinTabs,
    ZinSelectItem,
    TileType,
    ListType,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "styling_page",
    });
  },
  data() {
    return {
      isStatusOn: false,
      total: 0,
      selectData: [
        {
          text: "전체",
          value: "all",
        },
        {
          text: "제목",
          value: "title",
        },
        {
          text: "내용",
          value: "content",
        },
      ],
      listType: "tile",
      currentTab: "벽지선택 가이드",
      tabData: [
        {
          name: "벽지선택 가이드",
          val: "wallpaper",
        },
        {
          name: "바닥재선택 가이드",
          val: "tile",
        },
        {
          name: "창호선택 가이드",
          val: "frame",
        },
        {
          name: "리모델링 가이드",
          val: "remodeling",
        },
      ],
      itemData: [
        {
          itemID: 12,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_01.png",
          title: "컬러가 돋보이는 벽면 연출법",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: "2021.05.01",
          itemInfo: {
            scrap: 100,
            comment: 20,
            view: 387,
          },

        }, {
          itemID: 111,
          badges: null,
          img: "/img/styling/@_guide_thumb_02.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류 한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: "2021.04.19",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 3,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_03.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: "2021.04.19",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 4,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_04.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          writingDate: "2021.04.19",
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
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          writingDate: "2021.04.19",
          link: "./detail",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 172,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_06.png",
          title: "컬러가 돋보이는 벽면 연출법",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: "2021.05.01",
          itemInfo: {
            scrap: 100,
            comment: 20,
            view: 387,
          },

        }, {
          itemID: 1181,
          badges: null,
          img: "/img/styling/@_guide_thumb_07.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류 한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: "2021.04.19",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 39,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_08.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          link: "./detail",
          writingDate: "2021.04.19",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 44,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_09.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          writingDate: "2021.04.19",
          link: "./detail",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        },
        {
          itemID: 55,
          badges: ["new"],
          img: "/img/styling/@_guide_thumb_10.png",
          title: "한 눈에 확인하는 소재 별 벽지 종류",
          content: "벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가 있기 때문. 우리집에 딱 맞는 벽지를 고르기 위해서는 벽지의 종류부터 따져봐야 한다. " +
            "벽지는 보통 종이 위에 다른 소재를 한 번 더 벽지이야기 한 눈에 확인하는 소재별 벽지 종류 도배를 계획하고 있다면 디자인을 정하기 전에 미리 벽지의 종류부터 생각해 보는 것이 좋다. " +
            "소재별로 특징이 각기 다른데다 종류에 따라 가격도 차이가...",
          writingDate: "2021.04.19",
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
          title: "시공범위",
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
      searchType: "all",
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
      snb: [
        {
          name: "노하우",
          link: "/styling/style-trend/",
          dep2: [
            {
              name: "스타일링 트렌드",
              link: "/styling/style-trend/",
            },
            {
              name: "인테리어 A to Z",
              link: "/styling/style-guide/",
            },
            {
              name: "생활단편집",
              link: "/styling/life-book/",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    sort: function(val) {
      this.currentSort = val;
    },
    // toggleOnOff:function (){
    //   this.isStatusOn = !this.isStatusOn;
    // }
    toggleType: function() {
      if (this.listType !== "tile") this.listType = "tile";
      else this.listType = "list";
    },
    selVal(v) {
      this.searchType = v;
    },
    setCurrentTab(v) {
      this.currentTab = v;
    },
    // setCate() {
    //   let current = false;
    //   this.snb.forEach(v => {
    //     if (v.link === this.$router.currentRoute.fullPath) {
    //       this.currentMenu.name.dep1 = v.name;
    //       this.currentMenu.state.dep1 = true;
    //       return current = true;
    //     }
    //     if (current) return;
    //     if (v.dep2 !== null && v.dep2.length > 0) v.dep2.forEach(v1 => {
    //       if (v1.link === this.$router.currentRoute.fullPath) {
    //         this.currentMenu.name.dep1 = v.name;
    //         this.currentMenu.state.dep1 = true;
    //         this.currentMenu.name.dep2 = v1.name;
    //         this.currentMenu.state.dep2 = true;
    //         return current = true;
    //       }
    //       if (current) return;
    //       if (v1.dep3 !== null && v1.dep3.length > 0) v1.dep3.forEach(v2 => {
    //         if (v2.link === this.$router.currentRoute.fullPath) {
    //           this.currentMenu.name.dep1 = v.name;
    //           this.currentMenu.state.dep1 = true;
    //           this.currentMenu.name.dep2 = v1.name;
    //           this.currentMenu.state.dep2 = true;
    //           this.currentMenu.name.dep3 = v2.name;
    //           this.currentMenu.state.dep3 = true;
    //           return current = true;
    //         }
    //       });
    //     });
    //     if (current) return;
    //   });
    // },
  },
};
</script>

<style scoped>

</style>