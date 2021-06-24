<template>
  <header :class="[{has_banner : headerBanner}, pageClass]">
    <aside v-show="headerBanner" class="banner_area">
      <p><span>Z:IN 가입하고 첫 쇼핑 15% 할인 쿠폰 받아가세요</span><i class="arw arw_right_w"/></p>
      <button @click="headerBanner = false" class="btn_close">
        <i class="ic ic_close_w"/>
      </button>
    </aside>
    <nav id="gnb">
      <div class="gnb_wrap">
        <div class="gnb_inner">
          <div class="set_inner clearFix">
            <div class="logo_area">
              <a href="#">
                <figure class="logo" alt="zin"></figure>
              </a>
            </div>
            <div class="depth1_wrap">
              <ul @mouseleave="hoverMenu = null" class="depth1_menu">
                <li @mouseover="hoverMenu = 'styling'" class="menu"
                    :class="urlData.indexOf('styling') > 0?'is_active':''">
                  <nuxt-link to="javascript:void(0)">
                    <span>{{ menu_homeStyling.title }}</span>
                  </nuxt-link>
                </li>
                <li @mouseover="hoverMenu = 'store'" class="menu" :class="urlData.indexOf('store') > 0?'is_active':''">
                  <nuxt-link to="javascript:void(0)">
                    <span>{{ menu_store.title }}</span>
                  </nuxt-link>
                </li>
                <li @mouseover="hoverMenu = 'zin'" class="menu" :class="urlData.indexOf('zin') > 0?'is_active':''">
                  <a href="javascript:void(0)">
                    <span>{{ menu_zin.title }}</span>
                  </a>
                </li>
              </ul>
            </div>
            <ul class="utility">
              <li>
                <a href="javascript:void (0)">
                  <i class="ic ic_search"></i>
                </a>
              </li>
              <li class="cart_btn">
                <a href="javascript:void (0)">
               <span class="count_area">
                <i class="ic ic_cart"></i>
                <span class="num">1</span>
              </span>
                </a>
              </li>
              <li>
                <a href="javascript:void (0)">
                  <i class="ic ic_member"></i>
                </a>
              </li>
              <li v-if="!memberLogin" class="login_btn">
                <nuxt-link to="#">
                  로그인
                </nuxt-link>
              </li>
              <li v-if="!memberLogin" class="join_btn">
                <nuxt-link to="#">
                  회원가입
                </nuxt-link>
              </li>
              <li class="full_menu_btn">
                <button class="btn_open">
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
                </button>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div @mouseleave="showDepth2 = null" class="depth2_wrap">
        <div class="depth2_menu">
          <ul @mouseover="showDepth2 = 'styling'" :class="[urlData.indexOf('styling') >= 0?'is_active':'',
          showDepth2=='styling' || hoverMenu=='styling' ? 'is_show':'']" class="menu">
            <li @mouseover="currentDepth2(item.hasLnb)"
                v-for="(item,index) in menu_homeStyling.depth2"
                :class="item.hasLnb"
                class="depth2">
              <nuxt-link :to="item.link">
                <span>{{ item.title }}</span>
              </nuxt-link>
              <ul v-if="item.depth3" class="depth3_menu">
                <li v-for="(depth3,index) in item.depth3" class="depth3">
                  <nuxt-link :to="depth3.link">
                    <span>{{ depth3.title }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="depth2">
              <nuxt-link to="/zin/consulting/">
                <span>인테리어 상담신청</span>
              </nuxt-link>
            </li>
          </ul>
          <ul @mouseover="showDepth2 = 'store'" :class="[urlData.indexOf('store') >= 0?'is_active':'',
          showDepth2=='store' || hoverMenu=='store' ? 'is_show':'']" class="menu">
            <li @mouseover="currentDepth2(item.hasLnb)" @mouseleave="currentDepth2('')"
                v-for="(item,index) in menu_store.depth2" :class="item.hasLnb" class="depth2">
              <nuxt-link :to="item.link">
                <span>{{ item.title }}</span>
              </nuxt-link>
              <ul v-if="item.depth3" class="depth3_menu">
                <li v-for="(depth3,index) in item.depth3" class="depth3">
                  <nuxt-link :to="depth3.link">
                    <span>{{ depth3.title }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="consult_btn depth2">
              <nuxt-link to="/zin/consulting/">
                <span>인테리어 상담신청</span>
              </nuxt-link>
            </li>
          </ul>
          <ul @mouseover="showDepth2 = 'zin'" :class="[urlData.indexOf('zin') >= 0 ?'is_active':'',
          showDepth2=='zin' || hoverMenu=='zin' ? 'is_show':'']" class="menu">
            <li @mouseover="currentDepth2(item.hasLnb)" @mouseleave="currentDepth2('')"
                v-for="(item,index) in menu_zin.depth2" :class="item.hasLnb" class="depth2">
              <nuxt-link :to="item.link">
                <span>{{ item.title }}</span>
              </nuxt-link>
              <ul v-if="item.depth3" class="depth3_menu">
                <li v-for="(depth3,index) in item.depth3" class="depth3">
                  <nuxt-link :to="depth3.link">
                    <span>{{ depth3.title }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="depth2">
              <nuxt-link to="/zin/consulting/">
                <span>인테리어 상담신청</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- category Lnb -->
        <nav @mouseover="[cateLnbControl.show = true,cateDepthHover()]"
             @mouseleave="[cateLnbControl.show = false,cateDepthHover()]"
             v-show="cateLnbControl.hover || cateLnbControl.show" class="lnb category_lnb">
          <div @mouseleave="cateLnbControl.depthShow = 0" class="lnb_wrap">
            <div @mouseover="cateLnbControl.depthShow = 1" class="lnb_menu_frame scroll_area" v-bar>
              <ul class="lnb_menu depth1">
                <li class="is_active">
                  <nuxt-link to="#">가구</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">가전/디지털</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">생활/건강</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">홈데코/조명</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">침구/패브릭</nuxt-link>
                </li>
              </ul>
            </div>

            <div v-show="cateLnbControl.depthShow >0" class="lnb_menu_frame scroll_area" v-bar>
              <ul @mouseover="cateLnbControl.depthShow = 2"
                  class="lnb_menu depth2">
                <li>
                  <nuxt-link to="#">거실가구</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">침실가구</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">주방가구</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-show="cateLnbControl.depthShow >1" class="lnb_menu_frame scroll_area" v-bar>
              <ul @mouseover="cateLnbControl.depthShow = 3"
                  class="lnb_menu depth3">
                <li>
                  <nuxt-link to="#">소파/의자</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">거실테이블</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">거실수납장</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-show="cateLnbControl.depthShow >2" class="lnb_menu_frame scroll_area" v-bar>
              <ul class="lnb_menu depth4">
                <li>
                  <nuxt-link to="#">1~2인용</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">3~4인용</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">소파베드</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">리클라이너</nuxt-link>
                </li>
              </ul>
            </div>
            <button @click="cateLnbControl.show = false" class="btn_close">
              <i class="ic ic_close_b"></i>
            </button>
          </div>
        </nav>
        <!-- product Lnb -->
        <nav @mouseover="[productLnbControl.show = true,productDepthHover()]"
             @mouseleave="[productLnbControl.show = false,productDepthHover()]"
             v-show="productLnbControl.hover || productLnbControl.show" class="lnb product_lnb">
          <div @mouseleave="productLnbControl.depthShow = 0" class="lnb_wrap">
            <div @mouseover="productLnbControl.depthShow = 1" class="lnb_menu_frame scroll_area" v-bar>
              <ul class="lnb_menu depth1">
                <li class="is_active">
                  <nuxt-link to="#">가구</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">벽지&벽장재</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">바닥재(주택용)</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">바닥재(상업용)</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">창호(일반)</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">창호(알루미늄)</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">유리</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">도어</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">인테리어 필름</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">인조대리석</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">기타 1</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">기타 2</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">기타 3</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-show="productLnbControl.depthShow >0" @mouseover="productLnbControl.depthShow = 2"
                 class="lnb_menu_frame scroll_area" v-bar>
              <ul class="lnb_menu depth2">
                <li>
                  <nuxt-link to="#">프리미엄벽지</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">친환경벽지</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">디자인벽지</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">기능성벽지</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">전폭벽지</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">합지벽지</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">조습벽지</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-show="productLnbControl.depthShow >1" @mouseover="productLnbControl.depthShow = 3"
                 class="lnb_menu_frame scroll_area" v-bar>
              <ul
                class="lnb_menu depth3">
                <li>
                  <nuxt-link to="#">지아 FRESH</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">지아패브릭</nuxt-link>
                </li>
              </ul>
            </div>
            <button @click="productLnbControl.show = false" class="btn_close">
              <i class="ic ic_close_b"></i>
            </button>
          </div>
        </nav>
      </div>
    </nav>
    <div v-if="detailPageTitle != null" class="sub_header">
      <div class="progress_bar">
        <span class="total"></span>
        <span class="current"></span>
      </div>
      <div class="sub_inner clearFix">
        <div class="logo_area">
          <a href="#">
            <figure class="logo" alt="zin"></figure>
          </a>
        </div>
        <div class="txt_area">
          <h3>{{ detailPageTitle }}</h3>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    detailPageTitle: {
      type: String,
      default: null,
    },
    depthNum: {
      type: String,
    },
    pageClass: {
      type: String,
    },
    headerBanner: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      memberLogin: true,
      subHeader_state: false,
      urlData: "",
      alarmShow: false,
      hoverMenu: null,
      showDepth2: null,
      categoryLnbIng: false,
      categoryLnbShow: false,
      cateLnbControl: {
        hover: false,
        show: false,
        depthShow: 0,
      },
      productLnbControl: {
        hover: false,
        show: false,
        depthShow: 0,
      },
      menu_homeStyling: {
        menu: "styling",
        title: "인테리어",
        isShow: false,
        depth2: [
          {
            title: "인테리어 홈",
            link: "/styling/home/",
          }, {
            title: "시공사례",
            link: "/styling/expert-style/",
            depth3: [
              {
                title: "전문가 시공제안",
                link: "/styling/expert-style/",
              }, {
                title: "내가 꾸민 우리집",
                link: "/styling/myhome/",
              }, {
                title: "집들이그램",
                link: "/styling/house/",
              },
            ],
          }, {
            title: "노하우",
            link: "/styling/style-trend/",
            depth3: [
              {
                title: "스타일링 트렌드",
                link: "/styling/style-trend/",
              }, {
                title: "인테리어 A to Z",
                link: "/styling/style-guide/",
              }, {
                title: "생활단편집",
                link: "/styling/life-book/",
              },
            ],
          },
        ],
      },
      menu_store: {
        menu: "store",
        title: "스토어",
        isShow: false,
        depth2: [
          {
            title: "스토어 홈",
            link: "/store/home/",
          }, {
            title: "리모델링",
            link: "/store/remodeling/",
            depth3: [{
              title: "전체 시공",
              link: "/store/remodeling/",
            }, {
              title: "부분 시공",
              link: "/store/remodeling/",
            }],
          }, {
            title: "카테고리",
            link: "/store/category/",
            hasLnb: "category",
          }, {
            title: "베스트",
            link: "/store/best/",
          }, {
            title: "기획전",
            link: "/store/promotion/",
          }, {
            title: "브랜드샵",
            link: "/store/brand-shop/",
          },
        ],
      },
      menu_zin: {
        menu: "zin",
        title: "제품 및 브랜드",
        isShow: false,
        depth2: [
          {
            title: "제품 및 브랜드 홈",
            link: "/zin/home/",
          }, {
            title: "제품보기",
            link: "/product/category",
            hasLnb: 'product',
          }, {
            title: "견적 계산기",
            link: "/zin/guide/",
            depth3: [{
              title: "간편 견적",
              link: "/store/remodeling/",
            }, {
              title: "예산 설계",
              link: "/store/remodeling/",
            }, {
              title: "창호 도면 견적",
              link: "/store/remodeling/",
            }],
          }, {
            title: "인테리어 상담신청",
            link: "/zin/estimate/",
          }, {
            title: "전시매장 찾기",
            link: "/zin/consulting/",
          }, {
            title: "브랜드 이야기",
            link: "/zin/brand/",
            depth3: [{
              title: "지인 소개",
              link: "/zin/brand/about/",
            }, {
              title: "지인 TV",
              link: "/zin/brand/tv/",
            }, {
              title: "뉴스레터",
              link: "/zin/brand/news/",
            }, {
              title: "프로슈머 지엔느",
              link: "/zin/brand/zenne/",
            }],
          }, {
            title: "이벤트",
            link: "/zin/event/",
            depth3: [{
              title: "이벤트",
              link: "/zin/event/",
            }, {
              title: "당첨자 발표",
              link: "/zin/event/",
            }, {
              title: "제휴혜택",
              link: "/zin/event/",
            }],
          },
        ],
      },
      depth2: [
        {
          title: "거실가구",
          link: "#",
          depth3: [
            {
              title: "소파/의자",
              link: "#",
              depth4: [
                {
                  title: "1~2인용",
                  link: "#",
                }, {
                  title: "3~4인용",
                  link: "#",
                }, {
                  title: "소파베드",
                  link: "#",
                }, {
                  title: "리클라이너",
                  link: "#",
                },
              ],
            },
            {
              title: "거실테이블",
              link: "#",
            }, {
              title: "거실수납장",
              link: "#",
            },
          ],
        },
        {
          title: "침실가구",
          link: "#",
        },
        {
          title: "주방가구",
          link: "#",
        },
      ],
      StoreLnb: [
        {
          depth: 1,
          depthItem: [
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
          ],
        },
        {
          depth: 2,
          depthItem: [
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
          ],
        },
        {
          depth: 3,
          depthItem: [
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
          ],
        },
        {
          depth: 4,
          depthItem: [
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
            {
              title: "가구",
              link: "#",
            },
          ],
        },
      ],
    };
  },
  methods: {
    urlMatch() {
      this.urlData = window.location.href;
      return this.urlData;
    },
    scrollSubHeader() {
      let scr_t;
      let header = document.querySelector("header");
      let subHeader = document.querySelector(".sub_header");
      document.addEventListener("scroll", function (e) {
        scr_t = document.documentElement.scrollTop;
      })
      if (subHeader) {
        document.addEventListener("scroll", function (e) {
          if (scr_t > 500) {
            subHeader.classList.add("is_on");
            header.classList.add("sub_is_on");
          } else {
            subHeader.classList.remove("is_on");
            header.classList.remove("sub_is_on");
          }
        });
      }
      let wheelControl = function () {
        document.addEventListener("wheel", function (e) {
          if (scr_t > 500) {
            if (e.wheelDelta > 0 || e.detail < 0 || e.deltaY < 0) {
              header.classList.add("is_up");
              header.classList.remove("is_down");
            } else if (e.wheelDelta < 0 || e.detail > 0 || e.deltaY > 0) {
              header.classList.add("is_down");
              header.classList.remove("is_up");
            }
          }
        });
      }
      wheelControl()
    },
    // depth2Active() { /* Dev : active 확인용 메소드, 지워도 됨 */
    //   setTimeout(function () {
    //     let depth3Active = document.querySelector(".depth3 a.is_active");
    //     let depth2Item = depth3Active.closest(".depth2");
    //     depth2Item.classList.add("is_active");
    //   }, 10);
    // },
    currentDepth2(hasLnb) {
      if (hasLnb === "category") {
        this.cateLnbControl.hover = true;
      } else if (hasLnb === "product") {
        this.productLnbControl.hover = true;
      }
      if (hasLnb === '') {
        this.cateLnbControl.hover = false;
        this.productLnbControl.hover = false;
      }
    },
    cateDepthHover() {
      let depth2Cate = document.querySelector('.depth2.category')
      if (this.cateLnbControl.show) {
        depth2Cate.classList.add('hover')
      } else {
        depth2Cate.classList.remove('hover')
      }
    },
    productDepthHover() {
      let depth2Product = document.querySelector('.depth2.product')
      if (this.productLnbControl.show) {
        depth2Product.classList.add('hover')
      } else {
        depth2Product.classList.remove('hover')
      }
    },
  },
  async mounted() {
    await this.$nextTick();
    this.urlMatch();
    this.scrollSubHeader();
    // this.depth2Active();
  },
};
</script>

<style scoped>

</style>
