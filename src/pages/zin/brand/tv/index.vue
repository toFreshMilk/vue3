<template>
  <v-app id="container">
    <main id="contents" class="zin_page zintv_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="sub_sec divider_snb">
          <ProductSnb currentCate="브랜드 이야기" :currentMenu="currentMenu" :menuData="snb" :BannerShow="false" />
        </aside>
        <article class="divider_cnt">
          <div class="page_head zin_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h2 class="ttl">지인 TV</h2>
              </div>
            </div>
          </div>
          <div class="page_body zin_body">
            <section class="zin_sec zintv_tab_sec">
              <div class="tabs_wrap">
                <ZinTabs :tabData="tabData" tabType="default" setTab="영상 광고" @setCurrentTab="setCurrentTab" />
              </div>
            </section>
            <section class="zin_sec vid_list_sec">
              <ZinTvList v-if="currentTab === '영상 광고'" classAdd="zintv_list_wrap" :listItem="videoList"
                        :item-col="3" :showMoreBtn="false" :paginationShow="true" :selectData="TvSelect" />
              <ZinPaperList v-if="currentTab === '지면 광고'" classAdd="zinpaper_list_wrap" :listItem="paperList"
                         :item-col="4" :showMoreBtn="false" :paginationShow="true" :selectData="PaperSelect" />
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import ZinTabs from "~/components/common/ZinTabs";
import ProductSnb from "~/components/zinBrand/brandSnb";
import ZinTvList from "~/components/zinBrand/ZinTvList";
import ZinPaperList from "~/components/zinBrand/ZinPaperList";
import StoreSelectItem from "~/components/store/StoreSelectItem";
import ZinDialog from "~/components/zinBrand/ZinDialog";

export default {
  layout: "default",
  name: "zintv",
  components: {
    ProductSnb,
    ZinTabs,
    ZinTvList,
    ZinPaperList,
    StoreSelectItem,
    ZinDialog,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  data(){
    return {
      snb: [
        {
          name: "브랜드 이야기",
          link: "/zin/brand/",
          dep2: [
            {
              name: "지인 소개",
              link: "/zin/brand/about/",
            },
            {
              name: "지인 TV",
              link: "/zin/brand/tv/",
            },
            {
              name: "뉴스레터",
              link: "/zin/brand/news/",
            },
            {
              name: "프로슈머 지엔느",
              link: "/zin/brand/zenne/",
              dep3: [
                {
                  name: "지엔느 소개",
                  link: "/zin/brand/zenne/",
                },
                {
                  name: "지엔느 활동",
                  link: "/zin/brand/zenne/activity/",
                },
                {
                  name: "지엔느 모집 안내",
                  link: "/zin/brand/zenne/recruitment/",
                },
              ],
            },
          ],
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
      currentTab: "영상 광고",
      tabData: [
        {
          name: "영상 광고",
          val: "video",
        },
        {
          name: "지면 광고",
          val: "paper",
        },
      ],
      videoList:[
        {
          img:"/img/zin/@_vid_thumb01.png",
          subttl:"TV광고",
          title:"2021년 상반기 LX하우시스 지인 TV CF_벽지, 바닥재편_15초",
          writingDate:"2018년",
        },
        {
          img:"/img/zin/@_vid_thumb02.png",
          subttl:"TV광고",
          title:"2021년 상반기 LX하우시스 지인 TV CF_벽지, 바닥재편_15초",
          writingDate:"2018년",
        },
        {
          img:"/img/zin/@_vid_thumb03.png",
          subttl:"TV광고",
          title:"2021년 상반기 LX하우시스 지인 TV CF_벽지, 바닥재편_15초",
          writingDate:"2018년",
        },
        {
          img:"/img/zin/@_vid_thumb04.png",
          subttl:"TV광고",
          title:"2021년 상반기 LX하우시스 지인 TV CF_벽지, 바닥재편_15초",
          writingDate:"2018년",
        },
        {
          img:"/img/zin/@_vid_thumb05.png",
          subttl:"TV광고",
          title:"2021년 상반기 LX하우시스 지인 TV CF_벽지, 바닥재편_15초",
          writingDate:"2018년",
        },
        {
          img:"/img/zin/@_vid_thumb06.png",
          subttl:"TV광고",
          title:"2021년 상반기 LX하우시스 지인 TV CF_벽지, 바닥재편_15초",
          writingDate:"2018년",
        },
      ],
      paperList:[
        {
          img:"/img/zin/@_paper_thumb01.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2021년",
        },
        {
          img:"/img/zin/@_paper_thumb02.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2021년",
        },
        {
          img:"/img/zin/@_paper_thumb03.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2021년",
        },
        {
          img:"/img/zin/@_paper_thumb04.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2020년",
        },
        {
          img:"/img/zin/@_paper_thumb05.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2020년",
        },
        {
          img:"/img/zin/@_paper_thumb06.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2020년",
        },
        {
          img:"/img/zin/@_paper_thumb02.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2019년",
        },
        {
          img:"/img/zin/@_paper_thumb01.png",
          title:"LX하우시스 국내 기업 PR광고 LX하우시스 국내 기업 PR광고",
          writingDate:"2019년",
        },
      ],
      PaperSelect: {
        ls_open: false,
        optionCategory: "전체",
        optionItems: [
          {
            text: "전체",
            soldOut: false,
          },{
            text: "2018년",
            soldOut: false,
          }, {
            text: "2019년",
            soldOut: false,
          }, {
            text: "2020년",
            soldOut: false,
          }, {
            text: "2021년",
            soldOut: false,
          },
        ],
      },
      TvSelect: {
        ls_open: false,
        optionCategory: "전체",
        optionItems: [
          {
            text: "전체",
            soldOut: false,
          },{
            text: "2018년",
            soldOut: false,
          }, {
            text: "2019년",
            soldOut: false,
          }, {
            text: "2020년",
            soldOut: false,
          }, {
            text: "2021년",
            soldOut: false,
          },
        ],
      },
    };
  },
  methods:{
    setCurrentTab(v) {
      this.currentTab = v;
    },
  }
}
</script>

<style scoped>

</style>