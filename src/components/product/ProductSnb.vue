<template>
  <div class="snb_wrap"><!-- zin_snb_wrap -->
    <div class="snb">
      <div class="snb_node current_cate">
        <h4 class="snb_ttl">제품보기</h4>
        
        <!-- 1depth -->
        <v-expand-transition>
          <ul v-if="menuData" class="dep_list dep2_list">
          <li v-for="(dep1, i) in menuData" :key="'snb_dep_' + i"
              class="snb_node" :class="currentMenu.category.dep1 === dep1.category ? 'current_cate':''">
            <NuxtLink :to="getLink(dep1.category)">
              <span>{{ dep1.name }}</span>
            </NuxtLink>

            <!-- 2depth -->
            <v-expand-transition>
            <ul v-if="dep1.subItems" v-show="currentMenu.category.dep1 === dep1.category" class="dep_list dep3_list">
              <li v-for="(dep2, j) in dep1.subItems" :key="'snb_dep_'+i+'_'+j" class="snb_node">
                <NuxtLink :to="getLink(dep1.category, dep2.category)">
                  <span>{{ dep2.name }}</span>
                </NuxtLink>
                <button v-if="dep2.subItems && dep2.subItems.length > 0" @click="foldMenu(dep2.category, dep2.depth)" class="fold_btn"
                        :class="{'is_active': currentMenu.category.dep2 === dep2.category && currentMenu.state.dep2}">
                  <i class="arw arw_bottom"></i>
                </button>
                
                <!-- 3depth -->
                <v-expand-transition>
                  <ul v-if="dep2.subItems" v-show="currentMenu.category.dep2 === dep2.category && currentMenu.state.dep2"
                      class="dep_list dep4_list">
                    <li v-for="(dep3, k) in dep2.subItems" :key="'snb_dep_'+i+'_'+j+'_'+k" class="snb_node">
                      <NuxtLink :to="{ path: getLink(dep1.category, dep2.category), query: {brand: dep3.category} }">
                        <span>{{ dep3.name }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </v-expand-transition>
              </li>
            </ul>
            </v-expand-transition>
          </li>
          </ul>
        </v-expand-transition>
      </div>
    </div>

    <div v-if="bannerShow" class="banner_menu_wrap">
      <div class="banner_menu catalog">
        <a href="javascript:;" class="banner_menu_item"><span>Z:IN DIGITAL CATALOG</span></a>
      </div>
      <div class="banner_menu trend">
        <nuxt-link to="#" class="banner_menu_item"><span>HAUSYS DESIGN TREND</span></nuxt-link>
      </div>
      <div class="banner_menu_group guide_group">
        <p>인테리어 <em>A to Z</em></p>
        <nuxt-link v-for="(guide, i) in guideMenu" :key="'guide_menu_' + i"
                   :to="guide.link" class="banner_menu_item"><span>{{ guide.name }}</span></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guideMenu: [
        {
          name: '벽지선택 가이드',
          link: '#',
        },
        {
          name: '바닥재선택 가이드',
          link: '#',
        },
        {
          name: '창호선택 가이드',
          link: '#',
        },
        {
          name: '리모델링 가이드',
          link: '#',
        },
      ],
      activeMenu: {
        category: {
          dep1: "",
          dep2: "",
          dep3: "",
        },
        state: {
          dep1: false,
          dep2: false,
          dep3: false,
        },
      },
    };
  },
  props: {
    currentMenu: {    //선택된 카테고리 정보
      type: Object,
      default: null,
    },
    menuData: {       //전체 카테고리 정보
      type: Array,
      default: null,
    },
    bannerShow: {   //하단 배너 버튼 표시 여부
      type: Boolean,
      default: false,
    },
  },
  async created() {
    await this.$nextTick();
  },
  methods: {
    getLink(...category) { //카테고리 링크
      return '/product/category' + category.reduce((path, cate) => {
        return path + '/' + cate;
      }, '');
    },
    foldMenu(category, dep) {
      if (this.currentMenu.category["dep" + dep] !== category) {
        this.currentMenu.category["dep" + dep] = category;
        this.currentMenu.state["dep" + dep] = true;
      } else {
        this.currentMenu.state["dep" + dep] = !this.currentMenu.state["dep" + dep];
        if (dep === 2) {
          this.currentMenu.category["dep3"] = "";
          this.currentMenu.state["dep3"] = false;
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
