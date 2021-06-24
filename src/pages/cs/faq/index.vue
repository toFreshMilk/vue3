<template>
  <v-app id="container">
    <main id="contents" class="cs_page faq_page has_snb">
      <div class="min_inner clearFix">
        <aside class="snb_sec divider_snb">
          <ProductSnb currentCate="고객센터" :currentMenu="currentMenu" :menuData="snb" :BannerShow="false"/>
        </aside>
        <article class="divider_cnt">
          <div class="page_head notice_head">
            <div class="ttl_group">
              <div class="ttl_area">
                <h3 class="ttl">FAQ</h3>
              </div>
            </div>
          </div>
          <div class="page_body notice_body">
            <section class="search_sec">
                <div class="list_search_wrap taC">
                  <ListSearchInput type="none">
                    <template v-slot:select>
                      <ZinSelectItem :selectData="selectData" selectName="" @selVal="selVal" setValue="전체"
                                     :inline="true" />
                    </template>
                  </ListSearchInput>
                </div>
            </section>
            <section class="tabs_sec">
              <div class="tabs_wrap">
                <ZinTabs :tabData="tabData" tabType="default" setTab="전체" @setCurrentTab="setCurrentTab"/>
              </div>
            </section>
            <section class="list_sec">
              <div class="faq_list_wrap">
                <ul v-if="faqData && faqData.length > 0">
                  <li v-for="(faq, i) in faqData" :key="'faq_'+ i" class="faq_list_item">
                    <div class="q_area" @click="faqToggle($event, i)">
                      <strong>{{ faq.category }}</strong>
                      <p>{{ faq.q }}</p>
                      <i class="arw arw_bottom"></i>
                    </div>
                    <div class="a_area">
                      <div class="txt">{{ faq.a }}</div>
                    </div>
                  </li>
                </ul>
                <div v-else class="no_result has_ic">
                  <i class="ic_no_result"></i>
                  <p>검색 결과가 존재하지 않습니다.</p>
                </div>
              </div>
              <Pagination v-if="faqData && faqData.length > 0" />
            </section>

          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>

import ProductSnb from "~/components/product/ProductSnb";
import ZinSearchInput from "~/components/zin/ZinSearchInput";
import ZinTabs from "~/components/common/ZinTabs";
import Pagination from "~/components/common/Pagination";
import ListSearchInput from "~/components/common/ListSearchInput";
import ZinSelectItem from "~/components/common/ZinSelectItem";

export default {
  layout: "default",
  name: "index",
  components: {
    ProductSnb,
    ZinSearchInput,
    ZinTabs,
    Pagination,
    ListSearchInput,
    ZinSelectItem,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "cs_page",
    });
  },
  data() {
    return {
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
          name: "고객센터",
          link: "/publish/pc/zin/brand/",
          dep2: [
            {
              name: "1:1문의",
              link: "/publish/pc/cs/contact/",
            },
            {
              name: "공지사항",
              link: "/publish/pc/cs/notice/",
            },
            {
              name: "FAQ",
              link: "/publish/pc/cs/faq/",
            },
            {
              name: "이벤트",
              link: "/publish/pc/zin/brand/zenne/",
            },
          ],
        },
      ],
      currentTab: "전체",
      tabData: [
        {
          name: "전체",
          val: "all",
        },
        {
          name: "취소/반품/교환",
          val: "cancel",
        },
        {
          name: "주문/결제",
          val: "order",
        },
        {
          name: "매장",
          val: "shop",
        },
        {
          name: "상담/견적",
          val: "counseling",
        },
        {
          name: "제품",
          val: "product",
        },
        {
          name: "배송",
          val: "shipment",
        },
        {
          name: "기타",
          val: "etc",
        },
        {
          name: "회원정보 관리",
          val: "user",
        },
        {
          name: "시공/AS",
          val: "as",
        },
        {
          name: "멤버십",
          val: "membership",
        },
        {
          name: "",
          val: "membership",
        },
      ],
      faqData: [
        {
          category: '배송',
          q: '정기배송 상품의 묶음배송이 가능한가요?',
          a: '자세한 상담을 원하실 경우 라이브채팅의 전문가 상담 기능을 이용하실 수 있습니다. 또한 일반상담사와 상담 후 보다 전문적 상담을 원하실 경우 O2O전문점에 연계하여\n' +
            '  상담을 진행 할 수 있습니다.',
        },
        {
          category: '주문/결제',
          q: '정기배송 상품의 어떤 결제 수단을 사용할 수 있나요?',
          a: '자세한 상담을 원하실 경우 라이브채팅의 전문가 상담 기능을 이용하실 수 있습니다. 또한 일반상담사와 상담 후 보다 전문적 상담을 원하실 경우 O2O전문점에 연계하여\n' +
            '  상담을 진행 할 수 있습니다.',
        },
        {
          category: '제품',
          q: 'PVC 자체가 아토피 유발물질이라고 하는데 지아소리잠과 휴앤미 둘 다 PVC가 바닥에 구성되어 있는데 인체에 해가 없다는 것이 맞나요?',
          a: '자세한 상담을 원하실 경우 라이브채팅의 전문가 상담 기능을 이용하실 수 있습니다. 또한 일반상담사와 상담 후 보다 전문적 상담을 원하실 경우 O2O전문점에 연계하여\n' +
            '  상담을 진행 할 수 있습니다.',
        },
        {
          category: '취소/반품/교환',
          q: '카드결제를 취소할 경우 언제 한도가 복원이 되나요? ',
          a: '자세한 상담을 원하실 경우 라이브채팅의 전문가 상담 기능을 이용하실 수 있습니다. 또한 일반상담사와 상담 후 보다 전문적 상담을 원하실 경우 O2O전문점에 연계하여\n' +
            '  상담을 진행 할 수 있습니다.',
        },
      ],
    }
  },
  methods: {
    setCurrentTab(v) {
      this.currentTab = v;
    },
    faqToggle(e, i) {
      const items = document.querySelectorAll('.faq_list_item')
      const item = e.currentTarget.closest('.faq_list_item')
      const contentH = item.querySelector('.a_area>div').clientHeight
      items.forEach((v, k) => {
        if(i !== k) {
          v.classList.remove('on');
          v.querySelector('.a_area').style.height = 0
        }
      })
      item.classList.add('on');
      item.querySelector('.a_area').style.height = contentH + 60 + 'px'
    },
    selVal(v) {
      this.searchType = v;
    },
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>